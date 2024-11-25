import { CommonModule, Location } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
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
import { interviewApiService } from "src/app/features/company-menu/interview/api.interview";
import { Jobinterviewround } from "src/app/services/types/Jobinterviewround";
import { GetDateForLabel } from "src/app/core/helper/DateHelper";
// import * as XLSX from "xlsx";
// import { jsPDF } from "jspdf";

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
  jobInterviewRounds = signal<Jobinterviewround[]>([]);
  filteredStudents = signal<Jobinterviewround[]>([]);
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

  searchControl = new FormControl("");
  searchName = new FormControl("");
  branches: string[] = [];
  batches: number[] = [];
  branchControl = new FormControl<string[] | null>(null);
  batchControl = new FormControl<any[] | null>(null);
  readonly dialog = inject(MatDialog);
  constructor(
    private router: Router,
    private sweetAlertService: SweetAlertService,
    private location: Location,
    private apiCompanyService: CompanyAPIService,
    private apiIndustryService: IndustryAPIService,
    private InterviewService: interviewApiService
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

  GetDateLabelByDate = (date?: Date) => {
    return date ? GetDateForLabel(date) : "NA";
  };

  GetJobInterviewRounds = () => {
    this.InterviewService.GetJobInterviewRounds().subscribe({
      next: (response) => {
        const data: Jobinterviewround[] = response.value;
        this.jobInterviewRounds.set(data);
        console.log(this.jobInterviewRounds);
        this.applyFilters();
      },
      error: (error) => {
        console.log("Error fetching rounds: ", error);
      },
    });
  };

  ngOnInit() {
    // this.loadCompanies();
    // this.loadIndustries();
    this.GetJobInterviewRounds();
    this.getBranches();
    this.getBatches();
    this.dataSource.paginator = this.paginator;
    this.searchName.valueChanges.subscribe(() => this.applyFilters());
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
  applyFilters() {
    const filtered = this.jobInterviewRounds().filter((student) => {
      const nameFilter = this.searchName.value?.toLowerCase() || "";
      const matchesName =
        !nameFilter ||
        student.JobPosting.Company.Name.toLowerCase().includes(nameFilter);
      return matchesName;
    });
    this.filteredStudents.set(filtered);
  }
  getBatches(): void {
    this.InterviewService.GetBatches().subscribe({
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
    this.InterviewService.GetBranches().subscribe({
      next: (branchData) => {
        this.branches = branchData.value.map((branch: any) => branch.FullForm);
        console.log("Available branches:", this.branches);
      },
      error: (error) => {
        console.error("Error fetching branches:", error);
      },
    });
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

  goToInterviewStudentsDetails(id?: number) {
    // if (this.UserRoleId === 1 || this.UserRoleId === 2) {
    this.router.navigate(["placement-interview/interview-students-list/", id]);
    // }
  }

  viewInterviewDetails(id: number) {
    // Navigate to interview details page (to be implemented)
    console.log("View details for interview ID:", id);
  }
}
