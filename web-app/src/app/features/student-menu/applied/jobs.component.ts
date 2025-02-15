import { ChangeDetectorRef, Component, inject, ViewChild } from "@angular/core";
import { Router, withDebugTracing } from "@angular/router";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { MatTableDataSource } from "@angular/material/table";
import { CommonModule, Location } from "@angular/common";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { MatDialog } from "@angular/material/dialog";
import { map, Observable, of, startWith } from "rxjs";
import { FormControl } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatPaginatorModule } from "@angular/material/paginator";
import { companyTableList } from "../../company-configuration/company-config/companies/companies-model";
import { CompanyDetailDialogModalComponent } from "../../company-configuration/company-config/companies/company-detail-dialog-modal/company-detail-dialog-modal.component";
import { Industry } from "../../company-configuration/company-config/industry/industry.module";
import { ImportCompanyDialogComponent } from "../../company-configuration/company-config/companies/import-company-dialog/import-company-dialog.component";
import { CompanyAPIService } from "../../company-configuration/company-config/companies/api.companies";
import { IndustryAPIService } from "../../company-configuration/company-config/industry/api.industry";
import { TemplateCategory } from "src/app/services/types/TemplateCategory";
import { Template } from "src/app/services/types/Template";
import { MatStepperModule } from "@angular/material/stepper";
import { jsPDF } from "jspdf";

export interface ODataResponse<T> {
  value: T[];
}

export interface JobsList {
  id: number;
  Name: string;
}

@Component({
  selector: "app-companies",
  standalone: true,
  imports: [
    AMGModules,
    CommonModule,
    SharedModule,
    MatPaginatorModule,
    MatStepperModule,
  ],
  templateUrl: "./jobs.component.html",
  styleUrl: "./jobs.component.css",
})
export class JobsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  companies: companyTableList[] = [];
  companiesCard: any[] = [];
  roundDetails: any[] = [];
  RoundsData: any[] = [];
  selectedCompanyRounds: any[] = [];
  selectedCompany: any;
  industries: Industry[] = [];

  filteredCompanies: companyTableList[] = [];
  filteredCompany: Observable<any[]> = of([]);
  filteredCities: Observable<any[]> = of([]);
  filteredCompanySize: Observable<string[]> = of([]);
  filteredIndustries: Industry[] = [];
  filteredIndutry: Observable<any[]> = of([]);

  searchCompany: string = "";
  searchCity: string = "";
  searchIndustry: string = "";
  UserRoleId: number;
  StudentId: number;
  CityControl = new FormControl();
  industryControl = new FormControl();
  companySizeControl = new FormControl();
  experienceLevelControl = new FormControl();
  companyControl = new FormControl();

  templateCategories: TemplateCategory[] = [];
  templates: Template[] = [];
  selectedTemplate: { Subject: string; Body: string } | null = null;
  templateSubject: string = "";
  templateBody: string = "";
  isPopupOpen: boolean = false;
  readonly dialog = inject(MatDialog);
  constructor(
    private router: Router,
    private sweetAlertService: SweetAlertService,
    private location: Location,
    private apiCompanyService: CompanyAPIService,
    private apiIndustryService: IndustryAPIService
  ) {
    const storedUserRoleId = sessionStorage.getItem("userRoleId");
    this.UserRoleId = storedUserRoleId ? parseInt(storedUserRoleId) : 0;
    const storedStudentId = sessionStorage.getItem("StudentId");
    this.StudentId = storedStudentId ? parseInt(storedStudentId) : 0;
  }

  dataSource = new MatTableDataSource<companyTableList>([]);

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    this.getTemplate();
    if (this.StudentId > 0) {
      this.getCompaniesData(this.StudentId);
    }
    if (this.StudentId > 0) {
      this.getJobPostingRounds(this.StudentId);
    }
  }

  _filterCompanies(value: string): companyTableList[] {
    const filterValue = value.toLowerCase();
    if (filterValue.length < 2) {
      return [];
    }
    return this.companies.filter((company) =>
      company.Name.toLowerCase().includes(filterValue)
    );
  }

  public getCompaniesData(StudentId: number): void {
    this.apiCompanyService.GetCompaniesData(this.StudentId).subscribe({
      next: (response: ODataResponse<any>) => {
        console.log("Companies", response.value);
        this.companiesCard = response.value.map((item: any) => {
          const allRoundsPassed = item.Student.JobpostStudentrounds.every(
            (round: any) => round.HasPassed === 1
          );
          const StudentName = item.Student.FirstName;
          return {
            companyId: item.JobPosting.CompanyId,
            jobPostingId: item.JobPostingId,
            logo: item.JobPosting.Company.LogoPath,
            name: item.JobPosting.Company.Name,
            job_role: item.JobPosting.JobRole,
            status: "Active",
            progress: "In Progress",
            PostedDate: item.JobPosting.PostedDate,
            Salary: item.JobPosting.Salary,
            Location: item.JobPosting.Location,
            studentName: StudentName,
            isOfferLetterEnabled: allRoundsPassed,
          };
        });
      },
      error: (err) => {
        console.error("Error fetching job postings:", err);
      },
    });
  }

  getTemplate = () => {
    this.apiCompanyService.GetTemplate().subscribe({
      next: (response) => {
        this.templateCategories = response.value;
        this.templates = response.value.flatMap(
          (category) => category.Templates
        );
        this.selectedTemplate = this.templates[0] || null;
        if (this.selectedTemplate) {
          this.templateSubject = this.selectedTemplate.Subject;
          this.templateBody = this.selectedTemplate.Body;
        }
        console.log("Templates:", this.templates);
      },
      error: (error) => {
        console.error("Error fetching templates", error);
      },
    });
  };
  public getJobPostingRounds(StudentId: number): void {
    this.apiCompanyService.GetJobPostingRounds(this.StudentId).subscribe({
      next: (response: ODataResponse<any>) => {
        console.log("job rounds", response.value);
        this.RoundsData = response.value
          .map((item: any) =>
            item.Student.JobpostStudentrounds.map((round: any) => ({
              JobPostingId: item.JobPostingId,
              roundName: round.JobPostingRound.Name,
              Score: round.Score,
              Feedback: round.Feedback,
              Status: round.HasPassed === 1 ? "✅" : "🔄",
            }))
          )
          .flat();
      },
      error: (err) => {
        console.error("Error fetching job posting rounds:", err);
      },
    });
  }

  onCompanySelected(company: any): void {
    this.selectedCompany = company;
    this.selectedCompanyRounds = this.RoundsData.filter(
      (round: any) => round.JobPostingId === company.jobPostingId
    );
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }
  openJdDetails(id: number) {}

  goBack(): void {
    this.location.back();
  }

  openImportCompanyDialog() {
    this.dialog.open(ImportCompanyDialogComponent, {
      width: "500px",
      height: "600px",
    });
  }

  filterCities(search: string) {
    const filterValue = search.toLowerCase();

    const filteredList = this.companies.filter((company) =>
      company.City.toLowerCase().includes(filterValue)
    );

    const selectedCompanies = this.CityControl.value || [];
    this.filteredCompanies = [
      ...selectedCompanies
        .map((name: any) =>
          this.companies.find((company) => company.City === name)
        )
        .filter(Boolean),
      ...filteredList.filter(
        (company) => !selectedCompanies.includes(company.City)
      ),
    ];
  }

  filterIndustries(search: string) {
    const filterValue = search.toLowerCase();

    const filteredList = this.industries.filter((industry) =>
      industry.Type.toLowerCase().includes(filterValue)
    );

    const selectedIndustries = this.industryControl.value || [];
    this.filteredIndustries = [
      ...selectedIndustries
        .map((name: any) =>
          this.industries.find((industry) => industry.Type === name)
        )
        .filter(Boolean),
      ...filteredList.filter(
        (industry) => !selectedIndustries.includes(industry.Type)
      ),
    ];
  }

  get selectedCompanyCities(): string {
    const selected = this.CityControl.value;
    return selected ? selected.join(", ") : "";
  }

  get selectedIndustries(): string {
    const selected = this.industryControl.value;
    return selected ? selected.join(", ") : "";
  }
  get selectedCompanySize(): string {
    const selected = this.companySizeControl.value;
    return selected ? selected.join(", ") : "";
  }

  onCityDropdownOpen() {
    this.filterCities(this.searchCity);
  }

  onStatusDropdownOpen() {
    // this.filterStatuses(this.status);
  }

  onIndustryDropdownOpen() {
    this.filterIndustries(this.searchIndustry);
  }

  _filterCities(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.companies.filter((option) =>
      option.City.toLowerCase().includes(filterValue)
    );
  }

  _filterIndustries(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.industries.filter((option) =>
      option.Type.toLowerCase().includes(filterValue)
    );
  }

  resetIndustrySelection() {
    this.industryControl.reset();
    this.searchIndustry = "";
    this.filteredCompanies = this.companies;
    this.dataSource.data = this.filteredCompanies;
  }

  resetLocationSelection() {
    this.CityControl.reset();
    this.searchCity = "";
    this.filteredCompanies = this.companies;
    this.dataSource.data = this.filteredCompanies;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  showIndustryResults() {
    const selectedIndustries = this.industryControl.value;
    if (selectedIndustries && selectedIndustries.length > 0) {
      this.filteredCompanies = this.companies.filter((company) =>
        company.Companyindustries.some((ci: any) =>
          selectedIndustries.includes(ci.Industry.Type)
        )
      );
    } else {
      this.filteredCompanies = this.companies;
    }
    this.dataSource.data = this.filteredCompanies;
  }

  showLocationResults() {
    const selectedCities = this.CityControl.value;
    if (selectedCities && selectedCities.length > 0) {
      this.filteredCompanies = this.companies.filter((company) =>
        selectedCities.includes(company.City)
      );
    } else {
      this.filteredCompanies = this.companies;
    }

    this.dataSource.data = this.filteredCompanies;
  }

  extractIndustriesFromCompanies(companies: any[]): Industry[] {
    const industriesSet = new Set();
    companies.forEach((company) => {
      company.Companyindustries.forEach((ci: any) => {
        industriesSet.add(ci.Industry);
      });
    });
    return Array.from(industriesSet) as Industry[];
  }

  goToCompanyJobDetails(companyId: number) {
    this.router.navigate(["/company-job-details"]);
  }

  // downloadOfferLetter(event: MouseEvent): void {
  //   event.stopPropagation();
  //   console.log("Downloading offer letter...");
  //   window.alert("Downloaded successfully");
  // }
  downloadOfferLetter(event: MouseEvent, companyId: number): void {
    event.stopPropagation();
    console.log("Downloading offer letter...");
    const company = this.companiesCard.find((c) => c.companyId === companyId);
    if (!company) {
      console.error("Company details not found");
      return;
    }
    if (!this.selectedTemplate) {
      console.error("No template selected for the Offer Letter");
      return;
    }
    const doc = new jsPDF("p", "mm", "a4");
    doc.setFont("Arial", "normal");
    doc.setFontSize(16);
    const logoUrl = company.logo;
    const logoWidth = 100;
    const logoHeight = 50;
    doc.addImage(logoUrl, "JPEG", 10, 10, logoWidth, logoHeight);
    const mainHeading = `${company.name}`;
    const titleHeight = 20;
    doc.text(mainHeading, 100, titleHeight);
    const subject = this.selectedTemplate.Subject || "Offer Letter";
    doc.setFontSize(14);
    doc.text(`Subject: ${subject}`, 10, titleHeight + 10);
    const name = company.studentName;
    const namePositionY = titleHeight + 20;
    doc.setFontSize(12);
    doc.text(`Dear, ${name}`, 10, namePositionY);

    doc.setFontSize(11);
    const bodyContent = this.selectedTemplate.Body || "Content not available";
    const plainTextBody = this.stripHtmlTags(bodyContent);
    const paragraphs = plainTextBody.split("\n");
    let currentY = namePositionY + 10;
    paragraphs.forEach((paragraph) => {
      const pageWidth = 180;
      const marginLeft = 10;
      const wrappedText = doc.splitTextToSize(paragraph, pageWidth);
      doc.text(wrappedText, marginLeft, currentY);
      currentY += wrappedText.length * 5;
      if (currentY > 280) {
        doc.addPage();
        currentY = 10;
      }
    });
    currentY += 10;
    doc.text(`Position: ${company.job_role || "N/A"}`, 10, currentY);
    currentY += 10;
    doc.text(
      `Start Date: ${
        new Date(company.PostedDate).toLocaleDateString() || "N/A"
      }`,
      10,
      currentY
    );
    currentY += 10;
    doc.text(`Location: ${company.Location || "N/A"}`, 10, currentY);
    currentY += 10;
    doc.text(
      `Salary: ₹${company.Salary?.toLocaleString() || "N/A"}`,
      10,
      currentY
    );
    const fileName = `OfferLetter_${company.name || "Company"}.pdf`;
    doc.save(fileName);
    console.log("Offer Letter downloaded successfully");

    window.alert("Downloaded successfully");
  }

  stripHtmlTags(input: string): string {
    const doc = new DOMParser().parseFromString(input, "text/html");
    return doc.body.textContent || "";
  }
}
