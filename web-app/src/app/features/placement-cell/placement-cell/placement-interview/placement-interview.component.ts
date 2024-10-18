import { CommonModule, Location } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Observable, of, startWith, map } from "rxjs";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { CompanyAPIService } from "src/app/features/company-configuration/company-config/companies/api.companies";
import {
  companyTableList,
  Industry,
} from "src/app/features/company-configuration/company-config/companies/companies-model";
import { CompanyDetailDialogModalComponent } from "src/app/features/company-configuration/company-config/companies/company-detail-dialog-modal/company-detail-dialog-modal.component";
import { ImportCompanyDialogComponent } from "src/app/features/company-configuration/company-config/companies/import-company-dialog/import-company-dialog.component";
import { IndustryAPIService } from "src/app/features/company-configuration/company-config/industry/api.industry";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { PlacementInterviewAdditionalFilterComponent } from "./placement-interview-additional-filter/placement-interview-additional-filter.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { provideNativeDateAdapter } from "@angular/material/core";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";

export interface ODataResponse<T> {
  value: T[];
}

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: "app-placement-interview",
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules, MatDatepickerModule],
  templateUrl: "./placement-interview.component.html",
  styleUrl: "./placement-interview.component.css",
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlacementInterviewComponent {
  readonly campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  companies: companyTableList[] = [];

  industries: Industry[] = [];

  companySizes: string[] = [
    "1-10 Employees",
    "11-50 Employees",
    "51-200 Employees",
    "201-500 Employees",
    "501-1000 Employees",
    "1001-5000 Employees",
    "5001-10000 Employees",
    "10001+ Employees",
  ];

  experienceLevel: string[] = ["Lateral", "Intern", "Fresher", "Contract"];

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

  CityControl = new FormControl();
  industryControl = new FormControl();
  companySizeControl = new FormControl();
  experienceLevelControl = new FormControl();
  companyControl = new FormControl();

  CityFilterControl = new FormControl();
  industryFilterControl = new FormControl();
  companySizeFilterControl = new FormControl();

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
  }
  displayedColumns: string[] = [
    // "Url",
    // "Name",
    // "ContactPerson",
    // "City",
    // "ZipCode",
    // "Actions",
    "Name",
    "Industries",
    "OpenPosition",
    "ContactPerson",
    "City",
    "Email",
    "PhoneNumber",
    "Url",
    "JD",
    "Actions",
  ];
  columns = [
    { key: "Name", label: "Name" },
    { key: "Industries", label: "Industries" },
    { key: "OpenPosition", label: "Open Position" },
    { key: "ContactPerson", label: "Contact Person" },
    { key: "City", label: "City" },
    { key: "Email", label: "Email" },
    { key: "PhoneNumber", label: "Phone Number" },
    { key: "Url", label: "URL" },
    { key: "JD", label: "JD" },
    { key: "Actions", label: "Actions" },
  ];
  dataSource = new MatTableDataSource<companyTableList>([]);

  companiesCard = [
    {
      Id: 1,
      logo: "../../../../assets/images/Softserve-logo1.png",
      name: "Haier Appliances",
      rating: 4.1,
      reviews: "1.3K+ reviews",
      type: "Foreign MNC",
      numberOfJobs: 4,
      registeredStudents: 120,
      placedStudents: 80,
    },
    {
      Id: 2,
      logo: "company-logo-2.png",
      name: "Sony Electronics",
      rating: 4.5,
      reviews: "2K+ reviews",
      type: "Foreign MNC",
      numberOfJobs: 5,
      registeredStudents: 100,
      placedStudents: 60,
    },
    {
      Id: 3,
      logo: "company-logo-3.png",
      name: "Samsung Tech",
      rating: 4.2,
      reviews: "1.5K+ reviews",
      type: "Foreign MNC",
      numberOfJobs: 3,
      registeredStudents: 200,
      placedStudents: 150,
    },
    {
      Id: 4,
      logo: "company-logo-4.png",
      name: "LG Electronics",
      rating: 4.3,
      reviews: "1.8K+ reviews",
      type: "Foreign MNC",
      numberOfJobs: 6,
      registeredStudents: 140,
      placedStudents: 110,
    },
    {
      Id: 5,
      logo: "company-logo-5.png",
      name: "Apple Inc.",
      rating: 4.8,
      reviews: "3K+ reviews",
      type: "Foreign MNC",
      numberOfJobs: 7,
      registeredStudents: 250,
      placedStudents: 200,
    },
    {
      Id: 6,
      logo: "company-logo-6.png",
      name: "Microsoft Corp.",
      rating: 4.7,
      reviews: "2.7K+ reviews",
      type: "Foreign MNC",
      numberOfJobs: 5,
      registeredStudents: 180,
      placedStudents: 160,
    },
    {
      Id: 7,
      logo: "company-logo-7.png",
      name: "Google LLC",
      rating: 4.9,
      reviews: "5K+ reviews",
      type: "Foreign MNC",
      numberOfJobs: 8,
      registeredStudents: 300,
      placedStudents: 250,
    },
    {
      Id: 8,
      logo: "company-logo-8.png",
      name: "Facebook Inc.",
      rating: 4.6,
      reviews: "2.2K+ reviews",
      type: "Foreign MNC",
      numberOfJobs: 4,
      registeredStudents: 170,
      placedStudents: 130,
    },
    {
      Id: 9,
      logo: "company-logo-9.png",
      name: "Amazon Web Services",
      rating: 4.4,
      reviews: "2.5K+ reviews",
      type: "Foreign MNC",
      numberOfJobs: 6,
      registeredStudents: 220,
      placedStudents: 180,
    },
    {
      Id: 10,
      logo: "company-logo-10.png",
      name: "Tesla Inc.",
      rating: 4.7,
      reviews: "2.8K+ reviews",
      type: "Foreign MNC",
      numberOfJobs: 5,
      registeredStudents: 160,
      placedStudents: 140,
    },
  ];

  ngOnInit() {
    this.loadCompanies();
    this.loadIndustries();

    this.dataSource.paginator = this.paginator;

    this.CityControl.valueChanges.subscribe(() => {
      this.filterCities(this.searchCity);
    });

    this.industryControl.valueChanges.subscribe(() => {
      this.filterIndustries(this.searchIndustry);
    });

    this.filteredCities = this.CityFilterControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filterCities(value))
    );
    this.filteredIndutry = this.industryFilterControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filterIndustries(value))
    );

    this.filteredCompany = this.companyControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filterCompanies(value))
    );
  }

  onCompanySelected(event: MatAutocompleteSelectedEvent) {
    const selectedCompanyName = event.option.value;
    const selectedCompany = this.companies.find(
      (company) => company.Name === selectedCompanyName
    );
    if (selectedCompany) {
      this.apiCompanyService
        .getCompanyDataById(selectedCompany.Id)
        .subscribe((response) => {
          const companyData = response.value[0];
          this.openCompanyModalPopup(companyData);
        });
    }
  }

  openCompanyModalPopup(company: any): void {
    this.dialog.open(CompanyDetailDialogModalComponent, {
      width: "500px",
      height: "600px",
      data: company,
    });
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

  loadCompanies() {
    this.apiCompanyService.loadCompanyData().subscribe({
      next: (response: ODataResponse<companyTableList>) => {
        console.log("API Response:", response);
        this.dataSource.data = response.value;
        this.companies = response.value;
        this.industries = this.extractIndustriesFromCompanies(this.companies);
        this.filteredIndustries = this.industries;
      },
      error: (error) => {
        console.error("Error loading companies", error);
      },
    });
  }

  loadIndustries() {
    this.apiIndustryService.loadIndustryData().subscribe({
      next: (response: ODataResponse<any>) => {
        console.log("API Response:", response);
        this.industries = response.value;
      },
      error: (error) => {
        console.error("Error loading Industries", error);
      },
    });
  }
  openAddEditCompanyForm(id?: number) {
    if (id !== null && id !== undefined) {
      this.router.navigate(["/company-configuration/company", id]);
    } else {
      this.router.navigate(["/company-configuration/company", 0]);
    }
  }

  async deleteCompany(id: number) {
    const confirmed = await this.sweetAlertService.confirmDelete(
      "Do you really want to delete this Company?"
    );

    if (confirmed) {
      this.apiCompanyService.deleteCompany(id).subscribe({
        next: (response: { success: boolean; message: string }) => {
          if (response.success) {
            this.sweetAlertService.success(response.message);
            this.loadCompanies();
          } else {
            this.sweetAlertService.error(response.message);
          }
        },
        error: (error) => {
          this.sweetAlertService.error(
            "An unexpected error occurred while deleting the Company."
          );
          console.error("Error deleting Company:", error);
        },
      });
    }
  }

  openJdDetails(id: number) {}

  goBack(): void {
    this.location.back();
  }

  openPlacementinterviewAdditionalFilter() {
    this.dialog.open(PlacementInterviewAdditionalFilterComponent, {
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

  goToInterviewStudentsDetails(id: number) {
    if (this.UserRoleId === 1 || this.UserRoleId === 2) {
      this.router.navigate([
        "placement-interview/placement-interview-students/",
        id,
      ]);
    }
  }

  scheduledInterviews = [
    {
      id: 1,
      jobTitle: "Software Engineer",
      company: "Google",
      postedDate: "2024-07-01",
      applicationDeadline: new Date("2024-08-01"),
      status: "Upcoming",
      jobDescription:
        "We are seeking an experienced project manager to oversee our projects.",

      roundName: "Test Assesment 1",
      studentsCleared: 12,
      studentsRejected: 15,
      logo: "../../../../assets/images/Softserve-logo1.png",
    },
    {
      id: 2,
      jobTitle: "Data Scientist",
      company: "Facebook",
      date: "2024-09-28",
      status: "Upcoming",
      postedDate: "2024-07-01",
      applicationDeadline: new Date("2024-08-01"),
      jobDescription:
        "This is the first assessment to test the candidate's programming and problem-solving skills.",
      roundName: "Test Assesment 2",
      studentsCleared: 12,
      studentsRejected: 15,
      logo: "../../../../assets/images/Softserve-logo1.png",
    },
    {
      id: 3,
      jobTitle: "Product Manager",
      company: "Amazon",
      date: "2024-09-27",
      status: "Completed",
      postedDate: "2024-07-01",
      applicationDeadline: new Date("2024-08-01"),
      jobDescription:
        "The second assessment focuses on data science challenges and machine learning algorithms.",

      roundName: "Test Assesment 3",
      studentsCleared: 12,
      studentsRejected: 15,
      logo: "../../../../assets/images/Softserve-logo1.png",
    },
    {
      id: 4,
      jobTitle: "Web Developer",
      company: "Microsoft",
      date: "2024-09-29",
      status: "Ongoing",
      postedDate: "2024-07-01",
      applicationDeadline: new Date("2024-08-01"),
      jobDescription:
        "This assessment evaluates the candidate's ability to manage products and handle business cases.",

      roundName: "Technical Interview",
      studentsCleared: 12,
      studentsRejected: 15,
      logo: "../../../../assets/images/Softserve-logo1.png",
    },
    {
      id: 5,
      jobTitle: "UI/UX Designer",
      company: "Apple",
      date: "2024-09-26",
      status: "Ongoing",
      postedDate: "2024-07-01",
      applicationDeadline: new Date("2024-08-01"),
      jobDescription:
        "A technical interview to assess coding skills, system design, and problem-solving ability.",

      roundName: "HR Interview",
      studentsCleared: 12,
      studentsRejected: 15,
      logo: "../../../../assets/images/Softserve-logo1.png",
    },
    {
      id: 6,
      jobTitle: "DevOps Engineer",
      company: "ABB",
      date: "2024-09-26",
      status: "Completed",
      postedDate: "2024-07-01",
      applicationDeadline: new Date("2024-08-01"),
      jobDescription: "Use of Agile Technology to streamline operations",

      roundName: "Aptitude Test",
      studentsCleared: 45,
      studentsRejected: 5,
      logo: "company.logo",
    },
  ];

  jobSummary = [
    { jobTitle: "Software Engineer", studentsCount: 1 },
    { jobTitle: "Data Scientist", studentsCount: 1 },
    { jobTitle: "Product Manager", studentsCount: 1 },
    { jobTitle: "Web Developer", studentsCount: 1 },
    { jobTitle: "UI/UX Designer", studentsCount: 1 },
  ];

  viewInterviewDetails(id: number) {
    // Navigate to interview details page (to be implemented)
    console.log("View details for interview ID:", id);
  }
}
