import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from "@angular/material/dialog";
import { CompanyAPIService } from "../api.companies";
import { companyTableList } from "../companies-model";
import { ODataResponse } from "../companies.component";
import { Industry } from "../../industry/industry.module";
import { IndustryAPIService } from "../../industry/api.industry";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { FormControl } from "@angular/forms";
import { map, Observable, of, startWith } from "rxjs";

@Component({
  selector: "app-import-company-dialog",
  standalone: true,
  imports: [AMGModules, CommonModule, SharedModule, NgxMatSelectSearchModule],
  templateUrl: "./import-company-dialog.component.html",
  styleUrl: "./import-company-dialog.component.css",
})
export class ImportCompanyDialogComponent implements OnInit {
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

  // filterCompanies() {
  //   const searchTermLower = this.searchCompany.toLowerCase();
  //   this.filteredCompanies = this.companies.filter((company) =>
  //     company.Name.toLowerCase().includes(searchTermLower)
  //   );
  // }

  // filterCities() {
  //   const searchTermLower = this.searchCity.toLowerCase();
  //   this.filteredCities = this.companies.filter((company) =>
  //     company.City.toLowerCase().includes(searchTermLower)
  //   );
  // }

  // filterIndustry() {
  //   const searchTermLower = this.searchIndustry.toLowerCase();
  //   this.filteredIndustries = this.industries.filter((idustry) =>
  //     idustry.Type.toLowerCase().includes(searchTermLower)
  //   );
  // }

  openAddEditCompanyForm() {}
}
