import { CommonModule, Location } from "@angular/common";
import { Component, inject, signal, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { map, Observable, of, startWith } from "rxjs";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { CompanyAPIService } from "src/app/features/company-configuration/company-config/companies/api.companies";
import {
  companyTableList,
  Industry,
} from "src/app/features/company-configuration/company-config/companies/companies-model";
import { CompanyDetailDialogModalComponent } from "src/app/features/company-configuration/company-config/companies/company-detail-dialog-modal/company-detail-dialog-modal.component";
import { IndustryAPIService } from "src/app/features/company-configuration/company-config/industry/api.industry";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { ODataResponse } from "../eligible-students-list/eligible-students-list.component";
import { PlacementInterviewAdditionalFilterComponent } from "../placement-interview/placement-interview-additional-filter/placement-interview-additional-filter.component";
import { MatTableDataSource } from "@angular/material/table";
import { JobpostingSelectedstudent } from "src/app/services/types/JobpostingSelectedstudent";
import { PlacementOfferRecievedApiService } from "./api.placement-offer-recieved";
import { PlacementUploadFileComponent } from "../company-list-details/placement-upload-file/placement-upload-file.component";
import { PlacementOfferRecievedUploadFileComponent } from "./placement-offer-recieved-upload-file/placement-offer-recieved-upload-file.component";
import { Companyindustry } from "src/app/services/types/Companyindustry";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import * as XLSX from "xlsx";

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: "app-placement-offer-recieved",
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules, MatProgressSpinnerModule],
  templateUrl: "./placement-offer-recieved.component.html",
  styleUrl: "./placement-offer-recieved.component.css",
})
export class PlacementOfferRecievedComponent {
  constructor(
    private router: Router,
    private sweetAlertService: SweetAlertService,
    private location: Location,
    private apiCompanyService: CompanyAPIService,
    private apiIndustryService: IndustryAPIService,
    private placementOfferRecievedApiService: PlacementOfferRecievedApiService
  ) {
    const storedUserRoleId = sessionStorage.getItem("userRoleId");
    this.UserRoleId = storedUserRoleId ? parseInt(storedUserRoleId) : 0;
  }
  readonly campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });
  isLoading = true; // Start with loading state

  JobpostingSelectedstudentData = signal<JobpostingSelectedstudent[]>([]);
  filteredStudents = signal<JobpostingSelectedstudent[]>([]);
  getAllSelectedStudents = () => {
    this.placementOfferRecievedApiService.GetAllOffersRecieved().subscribe({
      next: (response) => {
        const data: JobpostingSelectedstudent[] = response.value;
        const newData = data.flatMap((d) => {
          var skills: string = "";
          d.Student?.StudentSkills?.flatMap((s) => {
            skills += s.Skill ? `${s.Skill.Name}, ` : "";
          });

          return {
            ...d,
            Student: {
              ...d.Student,
              skills: skills,
            },
          };
        });

        console.log(newData);
        this.JobpostingSelectedstudentData.set(newData);
        this.applyFilters();
      },
      error: (error) => {
        console.log("Error fetching rounds: ", error);
      },
    });
  };
  getAllIndustries = () => {
    this.placementOfferRecievedApiService.GetAllIndustries().subscribe({
      next: (response) => {
        const data: Industry[] = response.value.map((industry: any) => ({
          ...industry,
          Type: industry.Type ?? "Unknown",
        }));
        console.log("All Industries", data);
        this.industries = data;
      },
      error: (error) => {
        console.log("Error fetching industries: ", error);
      },
    });
  };
  getIndustryTypes(job: any): string {
    if (!job?.JobPosting?.Company?.Companyindustries) {
      return "";
    }

    const industries = job.JobPosting.Company.Companyindustries.filter(
      (x: Companyindustry) => x.Industry?.Type
    ).map((x: Companyindustry) => x.Industry?.Type);

    let result = industries.join(", ");

    const maxLength = 100;
    if (result.length > maxLength) {
      result = result.slice(0, maxLength) + "...";
    }

    return result;
  }

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
  dataSource = new MatTableDataSource<companyTableList>([]);

  // ngOnInit() {
  //   // this.loadCompanies();
  //   // this.loadIndustries();

  //   this.getAllSelectedStudents();

  //   this.dataSource.paginator = this.paginator;

  //   this.CityControl.valueChanges.subscribe(() => {
  //     this.filterCities(this.searchCity);
  //   });

  //   this.industryControl.valueChanges.subscribe(() => {
  //     this.filterIndustries(this.searchIndustry);
  //   });

  //   this.filteredCities = this.CityFilterControl.valueChanges.pipe(
  //     startWith(""),
  //     map((value) => this._filterCities(value))
  //   );
  //   this.filteredIndutry = this.industryFilterControl.valueChanges.pipe(
  //     startWith(""),
  //     map((value) => this._filterIndustries(value))
  //   );

  //   this.filteredCompany = this.companyControl.valueChanges.pipe(
  //     startWith(""),
  //     map((value) => this._filterCompanies(value))
  //   );
  // }
  searchControl = new FormControl("");
  searchName = new FormControl("");
  // searchBranch = new FormControl("");
  // searchBatch = new FormControl("");
  searchSalary = new FormControl("");

  // searchBranchValue: string = "";
  // searchBatchValue: string = "";

  // filteredBranches: string[] = [];
  // filteredBatches: string[] = [];
  branches: string[] = [];
  batches: number[] = [];
  branchControl = new FormControl<string[] | null>(null);
  batchControl = new FormControl<any[] | null>(null);
  salaryOptions: string[] = [
    "₹0 - 3 LPA",
    "₹3 - 5 LPA",
    "₹6 - 8 LPA",
    "₹9 - 12 LPA",
    "₹12 - 15 LPA",
    "₹15 LPA and above",
  ];
  salaryRanges = [
    { label: "₹0 - 3 LPA", min: 0, max: 300000 },
    { label: "₹3 - 5 LPA", min: 300000, max: 500000 },
    { label: "₹6 - 8 LPA", min: 600000, max: 800000 },
    { label: "₹9 - 12 LPA", min: 900000, max: 1200000 },
    { label: "₹12 - 15 LPA", min: 1200000, max: 1500000 },
    { label: "₹15 LPA and above", min: 1500000, max: Infinity },
  ];
  salaryControl = new FormControl<string[]>([]);

  ngOnInit() {
    this.getAllSelectedStudents();
    this.getAllIndustries();
    this.getBranches();
    this.getBatches();

    // Listen to changes in search fields and filter data accordingly
    this.searchName.valueChanges.subscribe(() => this.applyFilters());
    this.branchControl.valueChanges.subscribe(() => this.applyFilters());
    this.batchControl.valueChanges.subscribe(() => this.applyFilters());
    this.searchSalary.valueChanges.subscribe(() => this.applyFilters());
    this.industryControl.valueChanges.subscribe(() => this.applyFilters());
    this.salaryControl.valueChanges.subscribe(() => this.filterBySalaryRange());
  }
  // filterBranches(search: string): void {
  //   const filterValue = search.toLowerCase();

  //   this.filteredBranches = Array.from(
  //     new Set(
  //       this.JobpostingSelectedstudentData()
  //         .map(
  //           (student) =>
  //             student.Student?.Studentacademics?.[0]?.Course?.FullForm
  //         )
  //         .filter((branch): branch is string => branch !== undefined)
  //     )
  //   ).filter((branch) => branch.toLowerCase().includes(filterValue));
  // }
  // filterBatches(search: string): void {
  //   const filterValue = search.toLowerCase();

  //   this.filteredBatches = Array.from(
  //     new Set(
  //       this.JobpostingSelectedstudentData()
  //         .map((student) => student.Student?.Batch?.Name)
  //         .filter((batch): batch is string => batch !== undefined)
  //     )
  //   ).filter((batch) => batch.toLowerCase().includes(filterValue));
  // }
  // get selectedBranches(): string {
  //   return this.searchBranch.value || "";
  // }
  // get selectedBatches(): string {
  //   return this.searchBatch.value || "";
  // }
  filterBySalaryRange() {
    const selectedRanges = this.salaryControl.value || [];
    if (!selectedRanges.length) {
      this.filteredStudents.set(this.JobpostingSelectedstudentData());
      this.isLoading = false;
      return;
    }
    const filteredData = this.JobpostingSelectedstudentData().filter(
      (student) => {
        const salary = student.JobPosting?.Salary || 0;
        return selectedRanges.some((rangeLabel) => {
          const range = this.salaryRanges.find((r) => r.label === rangeLabel);
          return range && salary >= range.min && salary <= range.max;
        });
      }
    );
    this.filteredStudents.set(filteredData);
    this.isLoading = false;
  }
  filterIndustries(searchTerm: string) {
    const lowerSearchTerm = searchTerm.toLowerCase();
    this.filteredIndustries = this.industries.filter((industry) =>
      industry.Type?.toLowerCase().includes(lowerSearchTerm)
    );
  }
  resetFilters(): void {
    this.applyFilters();
  }
  getBatches(): void {
    this.placementOfferRecievedApiService.GetBatches().subscribe({
      next: (batchData) => {
        this.batches = batchData.value.map((batch: any) => batch.Name);
        console.log("Available batches:", this.batches);
      },
      error: (error) => {
        console.error("Error fetching batches:", error);
      },
    });
  }

  getBranches(): void {
    this.placementOfferRecievedApiService.GetBranches().subscribe({
      next: (branchData) => {
        this.branches = branchData.value.map((branch: any) => branch.FullForm);
        console.log("Available branches:", this.branches);
      },
      error: (error) => {
        console.error("Error fetching branches:", error);
      },
    });
  }
  isDataAvailable(): boolean {
    const offers = this.JobpostingSelectedstudentData();
    return offers && offers.length > 0;
  }
  exportToExcel() {
    const offers = this.JobpostingSelectedstudentData();
    const exportData = offers.map((job: JobpostingSelectedstudent) => ({
      "Student Name": `${job.Student.FirstName} ${job.Student.LastName}`,
      "USN No": job.Student.RollNo,
      Batch: job.Student.Batch.Name,
      Branch: job.Student.Studentacademics[0].Course.FullForm,
      "Company Name": job.JobPosting.Company?.Name,
      "Job Role": job.JobPosting.JobRole,
      // "Industry Type ": getIndustryTypes(job),
      //"Status":job.JobPosting?.
      Skills: job.Student.skills,
    }));
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
    const workbook: XLSX.WorkBook = {
      Sheets: { "Job Postings": worksheet },
      SheetNames: ["Job Postings"],
    };
    XLSX.writeFile(workbook, "JobPostings.xlsx");
  }
  showResults(): void {
    this.applyFilters();
    console.log(this.filteredStudents());
  }
  applyFilters() {
    const filtered = this.JobpostingSelectedstudentData().filter((student) => {
      const nameFilter = this.searchName.value?.toLowerCase() || "";
      // const branchFilter = Array.isArray(this.searchBranch.value)
      //   ? this.searchBranch.value.map((branch) => branch.toLowerCase())
      //   : [];
      // const batchFilter = this.searchBatch.value || "";
      const selectedBranches = this.branchControl.value || [];
      const selectedBatches = this.batchControl.value || [];
      const salaryFilter = this.searchSalary.value || "";
      0;
      const selectedIndustries = this.industryControl.value || [];
      const industryMatches =
        !selectedIndustries.length ||
        student.JobPosting?.Company?.Companyindustries?.some(
          (companyIndustry) =>
            selectedIndustries.includes(companyIndustry.Industry?.Type)
        );
      const matchesName =
        !nameFilter ||
        `${student.Student?.FirstName ?? ""} ${student.Student?.LastName ?? ""}`
          .toLowerCase()
          .includes(nameFilter) ||
        student.JobPosting?.Company?.Name?.toLowerCase().includes(nameFilter) ||
        student.Student.RollNo.toLowerCase().includes(nameFilter);

      // const matchesBranch =
      //   !branchFilter.length ||
      //   branchFilter.some((branchFilter) =>
      //     student.Student?.Studentacademics?.[0]?.Course?.FullForm?.toLowerCase().includes(
      //       branchFilter
      //     )
      //   );
      // const matchesBatch =
      //   batchFilter.length === 0 ||
      //   batchFilter.includes(student.Student?.Batch?.Name || "");
      const branchMatch =
        selectedBranches.length === 0 ||
        selectedBranches.includes(
          student.Student?.Studentacademics?.[0]?.Course?.FullForm || ""
        );
      const batchMatch =
        selectedBatches.length === 0 ||
        selectedBatches.includes(student.Student?.Batch?.Name || "");
      const matchesSalary =
        !salaryFilter ||
        (student.JobPosting?.Salary ?? 0) >= parseInt(salaryFilter);

      return (
        matchesName &&
        branchMatch &&
        batchMatch &&
        matchesSalary &&
        industryMatches
      );
    });

    this.filteredStudents.set(filtered);
    this.isLoading = false;
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

  // filterIndustries(search: string) {
  //   const filterValue = search.toLowerCase();

  //   const filteredList = this.industries.filter((industry) =>
  //     industry.Type.toLowerCase().includes(filterValue)
  //   );

  //   const selectedIndustries = this.industryControl.value || [];
  //   this.filteredIndustries = [
  //     ...selectedIndustries
  //       .map((name: any) =>
  //         this.industries.find((industry) => industry.Type === name)
  //       )
  //       .filter(Boolean),
  //     ...filteredList.filter(
  //       (industry) => !selectedIndustries.includes(industry.Type)
  //     ),
  //   ];
  // }

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
  openOfferManagement(jobPostingId: number, studentId: number, id: number) {
    this.router.navigate([
      "/Placement-offer-Recieved/offer-management-details/",
      jobPostingId,
      studentId,
      id,
    ]);
  }
  openUploadExcel(id?: number) {
    // if (id !== undefined) {
    //   this.router.navigate(["/placement-upload-file", id]);
    // } else {
    //   this.router.navigate(["/placement-upload-file", ""]);
    // }

    this.dialog.open(PlacementOfferRecievedUploadFileComponent, {
      data: id,
      width: "500px",
      height: "600px",
    });
  }
}
