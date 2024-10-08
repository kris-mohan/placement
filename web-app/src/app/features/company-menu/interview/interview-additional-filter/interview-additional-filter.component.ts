import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable, of, startWith, map } from "rxjs";
import { CompanyAPIService } from "src/app/features/company-configuration/company-config/companies/api.companies";
import {
  companyTableList,
  Industry,
} from "src/app/features/company-configuration/company-config/companies/companies-model";
import { IndustryAPIService } from "src/app/features/company-configuration/company-config/industry/api.industry";
import { ODataResponse } from "../interview.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";

@Component({
  selector: "app-interview-additional-filter",
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules, NgxMatSelectSearchModule],
  templateUrl: "./interview-additional-filter.component.html",
  styleUrl: "./interview-additional-filter.component.css",
})
export class InterviewAdditionalFilterComponent {
  companies: companyTableList[] = [];
  industries: Industry[] = [];
  companySizes: string[] = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "501-1000 employees",
    "1001-5000 employees",
    "5001-10000 employees",
    "10001+ employees",
  ];

  salaryRanges: string[] = [
    "0 - 2 LPA",
    "2 - 4 LPA",
    "4 - 6 LPA",
    "6 - 8 LPA",
    "8 - 10 LPA",
    "10 - 15 LPA",
    "15 - 20 LPA",
    "20+ LPA",
  ];

  filteredCompanies: companyTableList[] = [];
  filteredCities: Observable<any[]> = of([]);
  filteredIndustries: Industry[] = [];
  filteredIndutry: Observable<any[]> = of([]);

  searchCompany: string = "";
  searchCity: string = "";
  searchIndustry: string = "";

  CityControl = new FormControl();
  companyControl = new FormControl();
  locationControl = new FormControl();
  industryControl = new FormControl();
  companySizeControl = new FormControl();
  salaryRangeControl = new FormControl();

  companyFilterControl = new FormControl();
  locationFilterControl = new FormControl();
  industryFilterControl = new FormControl();
  companySizeFilterControl = new FormControl();
  salaryRangeFilterControl = new FormControl();

  constructor(
    private apiCompanyService: CompanyAPIService,
    private apiIndustryService: IndustryAPIService
  ) {}

  ngOnInit() {
    this.loadCompanies();
    this.loadIndustries();

    this.companyControl.valueChanges.subscribe(() => {
      this.filterCompanies(this.searchCompany);
    });

    this.CityControl.valueChanges.subscribe(() => {
      this.filterCities(this.searchCity);
    });

    this.industryControl.valueChanges.subscribe(() => {
      this.filterIndustries(this.searchIndustry);
    });

    this.filteredCities = this.locationFilterControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filterCities(value))
    );
    this.filteredIndutry = this.industryFilterControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filterIndustries(value))
    );
  }

  filterCompanies(search: string) {
    const filterValue = search.toLowerCase();

    const filteredList = this.companies.filter((company) =>
      company.Name.toLowerCase().includes(filterValue)
    );

    const selectedCompanies = this.companyControl.value || [];
    this.filteredCompanies = [
      ...selectedCompanies
        .map((name: any) =>
          this.companies.find((company) => company.Name === name)
        )
        .filter(Boolean),
      ...filteredList.filter(
        (company) => !selectedCompanies.includes(company.Name)
      ),
    ];
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

  get selectedCompanyNames(): string {
    const selected = this.companyControl.value;
    return selected ? selected.join(", ") : "";
  }

  get selectedCompanyCities(): string {
    const selected = this.CityControl.value;
    return selected ? selected.join(", ") : "";
  }
  get selectedIndustries(): string {
    const selected = this.industryControl.value;
    return selected ? selected.join(", ") : "";
  }
  onCompanyDropdownOpen() {
    this.filterCompanies(this.searchCompany);
  }
  onCityDropdownOpen() {
    this.filterCities(this.searchCity);
  }

  onIndustryDropdownOpen() {
    this.filterIndustries(this.searchIndustry);
  }

  private _filterCities(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.companies.filter((option) =>
      option.City.toLowerCase().includes(filterValue)
    );
  }

  private _filterIndustries(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.industries.filter((option) =>
      option.Type.toLowerCase().includes(filterValue)
    );
  }

  loadCompanies() {
    this.apiCompanyService.loadCompanyData().subscribe({
      next: (response: ODataResponse<companyTableList>) => {
        console.log("API Response:", response);
        this.companies = response.value;
        // this.filteredCompanies = this.companies;
        // this.filteredCities = this.companies;
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
        // this.filteredIndustries = response.value;
      },
      error: (error) => {
        console.error("Error loading Industries", error);
      },
    });
  }

  openAddEditCompanyForm() {}
}