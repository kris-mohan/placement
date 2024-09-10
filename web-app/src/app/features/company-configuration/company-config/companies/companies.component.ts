import { Component, inject } from "@angular/core";
import { Router, withDebugTracing } from "@angular/router";
import { APIService } from "src/app/services/api-services/api-services";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { companyTableList } from "./companies-model";
import { MatTableDataSource } from "@angular/material/table";
import { CommonModule, Location } from "@angular/common";
import { CompanyAPIService } from "./api.companies";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { ImportCompanyDialogComponent } from "./import-company-dialog/import-company-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { IndustryAPIService } from "../industry/api.industry";
import { Industry } from "../industry/industry.module";
import { map, Observable, of, startWith } from "rxjs";
import { FormControl } from "@angular/forms";

export interface ODataResponse<T> {
  value: T[];
}

@Component({
  selector: "app-companies",
  standalone: true,
  imports: [AMGModules, CommonModule, SharedModule],
  templateUrl: "./companies.component.html",
  styleUrl: "./companies.component.css",
})
export class CompaniesComponent {
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
  filteredCities: Observable<any[]> = of([]);
  filteredCompanySize: Observable<string[]> = of([]);
  filteredIndustries: Industry[] = [];
  filteredIndutry: Observable<any[]> = of([]);

  searchCompany: string = "";
  searchCity: string = "";
  searchIndustry: string = "";

  CityControl = new FormControl();
  industryControl = new FormControl();
  companySizeControl = new FormControl();
  experienceLevelControl = new FormControl();

  companyFilterControl = new FormControl();
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
  ) {}
  displayedColumns: string[] = [
    "Url",
    "Name",
    "ContactPerson",
    "City",
    "ZipCode",
    "Actions",
  ];
  columns = [
    { key: "Url", label: "Url" },
    { key: "Name", label: "Name" },
    { key: "ContactPerson", label: "Contact Person" },
    { key: "City", label: "City" },
    { key: "ZipCode", label: "ZipCode" },
    { key: "Actions", label: "Actions" },
  ];
  dataSource = new MatTableDataSource<companyTableList>([]);

  ngOnInit() {
    this.loadCompanies();
    this.loadIndustries();

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

  extractIndustriesFromCompanies(companies: any[]): Industry[] {
    const industriesSet = new Set();
    companies.forEach((company) => {
      company.Companyindustries.forEach((ci: any) => {
        industriesSet.add(ci.Industry);
      });
    });
    return Array.from(industriesSet) as Industry[];
  }

  resetLocationSelection() {}

  showLocationResults() {}
}
