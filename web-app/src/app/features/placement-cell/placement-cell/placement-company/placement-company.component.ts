import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
  signal,
} from "@angular/core";
import { Router, withDebugTracing } from "@angular/router";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { MatTableDataSource } from "@angular/material/table";
import { CommonModule, Location } from "@angular/common";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { MatDialog } from "@angular/material/dialog";
import { map, Observable, of, startWith } from "rxjs";
import { FormControl, FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatPaginatorModule } from "@angular/material/paginator";
import { CompanyAPIService } from "src/app/features/company-configuration/company-config/companies/api.companies";
import {
  companyTableList,
  Industry,
} from "src/app/features/company-configuration/company-config/companies/companies-model";
import { CompanyDetailDialogModalComponent } from "src/app/features/company-configuration/company-config/companies/company-detail-dialog-modal/company-detail-dialog-modal.component";
import { ImportCompanyDialogComponent } from "src/app/features/company-configuration/company-config/companies/import-company-dialog/import-company-dialog.component";
import { IndustryAPIService } from "src/app/features/company-configuration/company-config/industry/api.industry";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { provideNativeDateAdapter } from "@angular/material/core";
import { Companydatum } from "src/app/services/types/Companydatum";
import { PlacementCompanyApiService } from "./PlacementCompanyApiService";
import { getCompanyIndustryTypes } from "./placement-company-module";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { CampusCompany } from "src/app/services/types/CampusCompany";
import { CompanyAddtionlfiltersComponent } from "../company-addtionlfilters/company-addtionlfilters.component";
import { Jobinterviewround } from "src/app/services/types/Jobinterviewround";
import * as XLSX from "xlsx";

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

export interface ODataResponse<T> {
  value: T[];
}

@Component({
  selector: "app-placement-company",
  standalone: true,
  imports: [
    AMGModules,
    CommonModule,
    SharedModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatSlideToggleModule,
  ],
  templateUrl: "./placement-company.component.html",
  styleUrl: "./placement-company.component.css",
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlacementCompanyComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  OrgId: number;
  jobInterviewRounds = signal<Jobinterviewround[]>([]);
  filteredStudents = signal<Jobinterviewround[]>([]);
  companyData: [] = [];

  companiesList = signal<Companydatum[]>([]);
  campusCompanyList = signal<Companydatum[]>([]);
  filteredCompanyData = signal<Companydatum[]>([]);
  filteredCompanyData1 = signal<Companydatum[]>([]);

  companies: companyTableList[] = [];

  industries: Industry[] = [];

  // companySizes: string[] = [
  //   "1-10 Employees",
  //   "11-50 Employees",
  //   "51-200 Employees",
  //   "201-500 Employees",
  //   "501-1000 Employees",
  //   "1001-5000 Employees",
  //   "5001-10000 Employees",
  //   "10001+ Employees",
  // ];
  companySizes: { label: string; min: number; max: number }[] = [
    { label: "1-10 Employees", min: 1, max: 10 },
    { label: "11-50 Employees", min: 11, max: 50 },
    { label: "51-200 Employees", min: 51, max: 200 },
    { label: "201-500 Employees", min: 201, max: 500 },
    { label: "501-1000 Employees", min: 501, max: 1000 },
    { label: "1001-5000 Employees", min: 1001, max: 5000 },
    { label: "5001-10000 Employees", min: 5001, max: 10000 },
    { label: "10001+ Employees", min: 10001, max: Infinity },
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
  toggleValue: boolean = false;
  UserRoleId: number;

  CityControl = new FormControl();
  industryControl = new FormControl();
  companySizeControl = new FormControl();
  experienceLevelControl = new FormControl();
  companyControl = new FormControl();

  CityFilterControl = new FormControl();
  industryFilterControl = new FormControl();
  companySizeFilterControl = new FormControl();

  searchLocation = new FormControl();
  searchLocationValue: string = "";
  filteredLocations: string[] = [];
  showAll: boolean = false;

  readonly dialog = inject(MatDialog);
  constructor(
    private router: Router,
    private sweetAlertService: SweetAlertService,
    private location: Location,
    private apiCompanyService: CompanyAPIService,
    private apiIndustryService: IndustryAPIService,
    private placementCompanyApiService: PlacementCompanyApiService
  ) {
    const storedUserRoleId = sessionStorage.getItem("userRoleId");
    this.UserRoleId = storedUserRoleId ? parseInt(storedUserRoleId) : 0;
    const storedCampusId = sessionStorage.getItem("CampusId");
    this.OrgId = storedCampusId ? parseInt(storedCampusId) : 0;
  }

  readonly campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month - 1, today.getDate())),
    end: new FormControl(new Date()),
  });
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

  ngOnInit() {
    // this.getAllCompanies();
    this.getAllIndustries();
    this.getAllCompanyCampuses();
    // this.loadCompanies();
    // this.loadIndustries();
    this.searchLocation.valueChanges.subscribe(() => this.applyFilters());
    this.industryControl.valueChanges.subscribe(() => this.applyFilters());
    this.companySizeControl.valueChanges.subscribe(() => this.applyFilters());
    this.dataSource.paginator = this.paginator;

    // this.CityControl.valueChanges.subscribe(() => {
    //   this.filterCities(this.searchCity);
    // });

    // this.industryControl.valueChanges.subscribe(() => {
    //   this.filterIndustries(this.searchIndustry);
    // });

    // this.filteredCities = this.CityFilterControl.valueChanges.pipe(
    //   startWith(""),
    //   map((value) => this._filterCities(value))
    // );
    // this.filteredIndutry = this.industryFilterControl.valueChanges.pipe(
    //   startWith(""),
    //   map((value) => this._filterIndustries(value))
    // );

    // this.filteredCompany = this.companyControl.valueChanges.pipe(
    //   startWith(""),
    //   map((value) => this._filterCompanies(value))
    // );

    this.placementCompanyApiService.GetAllCompanies().subscribe((companies) => {
      this.companiesList.set(companies.value);

      console.log(this.companyControl);

      this.filteredCompany = this.companyControl.valueChanges.pipe(
        startWith(""),
        map((value) => this._filterCompanies(value))
      );
    });

    this.showVacantCompaniesOnly();
  }
  getIndustryTypes(company: Companydatum): string {
    if (!company?.Jobpostings?.length) return "";

    const industries = company.Jobpostings.flatMap(
      (posting) => posting.Company?.Companyindustries || []
    )
      .map((ci) => ci.Industry?.Type)
      .filter((type) => type);

    return Array.from(new Set(industries)).join(", ");
  }

  filterIndustries(searchTerm: string) {
    const lowerSearchTerm = searchTerm.toLowerCase();
    this.filteredIndustries = this.industries.filter((industry) =>
      industry.Type.toLowerCase().includes(lowerSearchTerm)
    );
  }
  getAllCompanies = () => {
    this.placementCompanyApiService.GetAllCompanies().subscribe({
      next: (odataResponse) => {
        console.log("companies", odataResponse.value);
        // this.companiesList.set(odataResponse.value);
        this.applyFilters();
      },
      error: (error) => {
        console.error("Error fetching companies:", error);
      },
    });
  };

  getAllCompanyCampuses = () => {
    this.placementCompanyApiService
      .GetAllCompanyCampuses(this.OrgId)
      .subscribe({
        next: (odataResponse) => {
          console.log("Campus Company Mapped", odataResponse.value);

          // Extract only the company data from each record in the response
          const companies = odataResponse.value.map(
            (campus: CampusCompany) => campus.Company
          );
          console.log(companies);
          this.campusCompanyList.set(companies);
          
          this.applyFilters();
          // this.filteredCompany = this.companyControl.valueChanges.pipe(
          //   startWith(""),
          //   map((value) => this._filterCompanies(value))
          // );
        },
        error: (error) => {
          console.error("Error fetching companies:", error);
        },
      });
  };
  isDataAvailable(): boolean {
    const companies = this.campusCompanyList();
    return companies && companies.length > 0;
  }

  applyFilters() {
    const locationFilter = this.searchLocation.value || "";
    const selectedIndustries = this.industryControl.value || [];
    const selectedSizes = this.companySizeControl.value || [];
    const filtered = this.campusCompanyList().filter((company: any) => {
      const matchesLocation =
        !locationFilter.length ||
        locationFilter.includes(company.Address || "");
      // jobposting.Address?.toLowerCase().includes(locationFilter);
      const industryMatches =
        !selectedIndustries.length ||
        company?.Jobpostings?.some((jobposting: any) =>
          jobposting?.Company?.Companyindustries?.some((ci: any) =>
            selectedIndustries.includes(ci.Industry?.Type)
          )
        );
      const matchesCompanySize =
        !selectedSizes.length ||
        selectedSizes.some((size: string) => {
          const sizeRange = this.companySizes.find(
            (range) => range.label === size
          );
          if (!sizeRange) return false;

          // Check if the company size is within the range
          const companySize = company.CompanySize || 0;
          return companySize >= sizeRange.min && companySize <= sizeRange.max;
        });
      return matchesLocation && industryMatches && matchesCompanySize;
    });

    if (!this.showAll) {
      const filteredCompanies = filtered.filter(
        (company) =>
          company.Jobpostings &&
          company.Jobpostings.some((job) => (job?.Vacancies || 0) > 0)
      );
      this.filteredCompanyData.set(filteredCompanies);
    } else {
      this.filteredCompanyData.set(filtered);
    }
    this.filteredCompanyData1.set(filtered);
  }
  getAllIndustries = () => {
    this.placementCompanyApiService.GetAllIndustries().subscribe({
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
  filterCities(search: string) {
    const filterValue = search.toLowerCase();
    this.filteredLocations = Array.from(
      new Set(
        this.companiesList()
          .map((student) => student.Address || "")
          .filter(
            (location): location is string =>
              location != "" && location.toLowerCase().includes(filterValue)
          )
      )
    );
  }

  get selectedLocations(): string {
    return this.searchLocation.value || "";
  }

  private _filterCompanies(value: string): Companydatum[] {
    const filterValue = value.toLowerCase();
    return this.companiesList().filter(
      (company) =>
        company.Name.toLowerCase().includes(filterValue) &&
        company.Name.trim() !== "" &&
        !this._isCompanyInCampusList(company) &&
        company.Name.toLowerCase() !== value.toLowerCase()
    );
  }

  private _isCompanyInCampusList(company: Companydatum): boolean {
    return this.campusCompanyList().some(
      (campusCompany) => campusCompany.Id === company.Id
    );
  }

  onCompanySelected(event: any): void {
    const selectedCompanyName = event.option.value;
    const selectedCompany = this.companiesList().find(
      (company) => company.Name === selectedCompanyName
    );

    if (selectedCompany) {
      this.openCompanyModalPopup(selectedCompany);
    }
  }

  openCompanyModalPopup(company: any): void {
    console.log(company);
    this.dialog
      .open(CompanyDetailDialogModalComponent, {
        width: "1200px",
        height: "620px",
        data: company,
      })
      .afterClosed()
      .subscribe(() => {
        this.resetSearchField();
        this.getAllCompanyCampuses(); 
      });
  }
  resetSearchField(): void {
    this.companyControl.setValue("");
  }
  loadCompanies() {
    this.placementCompanyApiService.loadCompanyData().subscribe({
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
    this.placementCompanyApiService.loadIndustryData().subscribe({
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
      this.router.navigate(["/placement-company/add-edit-company/", id]);
    } else {
      this.router.navigate(["/placement-company/add-edit-company/", 0]);
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

  openImportCompanyDialog() {
    this.dialog.open(CompanyAddtionlfiltersComponent, { width: "500px" });
  }

  // filterCities(search: string) {
  //   const filterValue = search.toLowerCase();

  //   const filteredList = this.companies.filter((company) =>
  //     company.City.toLowerCase().includes(filterValue)
  //   );

  //   const selectedCompanies = this.CityControl.value || [];
  //   this.filteredCompanies = [
  //     ...selectedCompanies
  //       .map((name: any) =>
  //         this.companies.find((company) => company.City === name)
  //       )
  //       .filter(Boolean),
  //     ...filteredList.filter(
  //       (company) => !selectedCompanies.includes(company.City)
  //     ),
  //   ];
  // }

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

  goToCompanyJobDetails(id: number) {
    this.router.navigate([
      "placement-company/placement-company-job-details/",
      id,
    ]);
  }

  onDelete(companyId: number, event: MouseEvent) {
    event.stopPropagation();
  }

  onEdit(id: number, event: MouseEvent) {
    event.stopPropagation();
    this.router.navigate(["placement-company/add-edit-company/", id]);
  }

  getCompanyIndustryTypesString = (company: Companydatum): string => {
    return getCompanyIndustryTypes(company);
  };
  handletogglechange(event: MouseEvent): void {
    this.showAll = !this.showAll;
    if (event) {
      this.filteredCompanyData.set(this.filteredCompanyData1());
    } else {
      const filteredCompanies = this.campusCompanyList().filter(
        (company) =>
          company.Jobpostings &&
          company.Jobpostings.some((job) => (job?.Vacancies || 0) > 0)
      );
      this.filteredCompanyData.set(filteredCompanies);
    }
  }

  showVacantCompaniesOnly(): void {
    const filteredCompanies = this.companiesList().filter(
      (company) =>
        company.Jobpostings &&
        company.Jobpostings.some((job) => (job?.Vacancies || 0) > 0)
    );
    this.filteredCompanyData.set(filteredCompanies);
  }

  openPlacementinterviewAdditionalFilter() {
    const dialogRef = this.dialog.open(CompanyAddtionlfiltersComponent, {
      width: "500px",
    });
    dialogRef.afterClosed().subscribe((filterValues) => {
      if (filterValues) {
        this.filterData(filterValues);
      }
    });
  }

  filterData(filterValues: any) {
    console.log(filterValues, "filter values");
    const filtered = this.campusCompanyList().filter((company) => {
      debugger;
      const selectedCompanies = filterValues.companies || [];
      const selectedIndustries = filterValues.jobTypes || [];

      const companyMatch =
        selectedCompanies.length === 0 ||
        selectedCompanies.includes(company?.Name || "");
      // const jobTypeMatch =
      //   selectedJobTypes.length === 0 ||
      //   selectedJobTypes.includes(student.JobPosting?.JobType || "");

      const industryMatches =
        selectedIndustries.length === 0 ||
        company?.Jobpostings?.some((jobposting: any) =>
          jobposting?.Company?.Companyindustries?.some(
            (ci: any) =>
              ci.Industry?.Type &&
              selectedIndustries.includes(ci.Industry?.Type)
          )
        );

      return companyMatch && industryMatches;
    });
    this.filteredCompanyData.set(filtered);
  }
  exportExcel(): void {
    console.log("exportExcel");
    this.placementCompanyApiService
      .downloadCompaniesData(this.OrgId)
      .subscribe({
        next: (response: Blob) => {
          const blob = new Blob([response], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const downloadUrl = window.URL.createObjectURL(blob);
          const anchor = document.createElement("a");
          anchor.href = downloadUrl;
          anchor.download = "CampusCompanies.xlsx";
          anchor.click();
          window.URL.revokeObjectURL(downloadUrl);
        },
        error: (err) => {
          console.error("Error downloading file:", err);
        },
      });
  }
}
