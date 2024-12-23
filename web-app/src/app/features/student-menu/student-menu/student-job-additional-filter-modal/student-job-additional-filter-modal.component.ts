import { CommonModule } from "@angular/common";
import { Component, inject, Inject, OnInit } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { CompanyAPIService } from "src/app/features/company-configuration/company-config/companies/api.companies";
import { companyTableList } from "src/app/features/company-configuration/company-config/companies/companies-model";
import { ODataResponse } from "../student-company/student-company.component";
import { Industry } from "src/app/features/company-configuration/company-config/companies/companies-model";
import { IndustryAPIService } from "src/app/features/company-configuration/company-config/industry/api.industry";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { FormControl } from "@angular/forms";
import { map, Observable, of, startWith } from "rxjs";
import { JobpostingsEligiblestudent } from "src/app/services/types/JobpostingsEligibleStudent";
import { ModeOfWorks } from "src/app/services/common-dropdowns/ModeOfWorks";
import { PlacementCompanyApiService } from "src/app/features/placement-cell/placement-cell/placement-company/PlacementCompanyApiService";
import { set } from "date-fns";
import { StudentInterviewAddtionalfilterComponent } from "../../interview-student/student-interview-addtionalfilter/student-interview-addtionalfilter.component";

@Component({
  selector: "app-student-job-additional-filter-modal",
  standalone: true,
  imports: [AMGModules, CommonModule, SharedModule, NgxMatSelectSearchModule],
  templateUrl: "./student-job-additional-filter-modal.component.html",
  styleUrl: "./student-job-additional-filter-modal.component.css",
})
export class StudentJobAdditionalFilterModalComponent {
  companies: companyTableList[] = [];
  industries: Industry[] = [];
  searchIndustry: string = "";
  industryControl = new FormControl();
  filteredIndustries: Industry[] = [];

  JobPostingsData: JobpostingsEligiblestudent[] = [];
  filteredStudents: JobpostingsEligiblestudent[] = [];
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

  salaryOptions: string[] = [
    "0 - 2 LPA",
    "2 - 4 LPA",
    "4 - 6 LPA",
    "6 - 8 LPA",
    "8 - 10 LPA",
    "10 - 15 LPA",
    "15 - 20 LPA",
    "20+ LPA",
  ];
  salaryRanges = [
    { label: "0 - 2 LPA", min: 0, max: 200000 },
    { label: "2 - 4 LPA", min: 200000, max: 400000 },
    { label: "4 - 6 LPA", min: 400000, max: 600000 },
    { label: "8 - 10 LPA", min: 800000, max: 1000000 },
    { label: "10 - 15 LPA", min: 1000000, max: 1500000 },
    { label: "15 - 20 LPA", min: 1500000, max: 2000000 },
    { label: "20+ LPA", min: 2000000, max: Infinity },
  ];
  salaryControl = new FormControl<string[]>([]);
  modeOfWorksControl = new FormControl();
  filteredModeOfWorks = ModeOfWorks;
  skillsControl = new FormControl("");

  filteredCompanies: companyTableList[] = [];
  filteredCities: Observable<any[]> = of([]);
  filteredIndutry: Observable<any[]> = of([]);
  filteredCompany: Observable<any[]> = of([]);
  searchCompany: string = "";
  searchCity: string = "";

  CityControl = new FormControl();
  companyControl = new FormControl();
  locationControl = new FormControl();
  companySizeControl = new FormControl();
  salaryRangeControl = new FormControl();
  jobTypeControl = new FormControl();

  companyFilterControl = new FormControl();
  locationFilterControl = new FormControl();
  companySizeFilterControl = new FormControl();
  salaryRangeFilterControl = new FormControl();

  constructor(
    private apiCompanyService: CompanyAPIService,
    private apiIndustryService: IndustryAPIService,
    private placementCompanyApiService: PlacementCompanyApiService,
    public dialogRef: MatDialogRef<StudentJobAdditionalFilterModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.JobPostingsData = data.JobPostingData;
    this.filteredStudents = data.FilteredStudents;
  }

  ngOnInit() {
    this.JobPostingsData, this.filteredStudents, this.getAllIndustries();
    // this.loadCompanies();
    // this.loadIndustries();
    this.skillsControl.valueChanges.subscribe(() => this.applyFilters());
    this.industryControl.valueChanges.subscribe(() => this.applyFilters());
    this.companyFilterControl.valueChanges.subscribe(() => this.applyFilters());
    this.companyControl.valueChanges.subscribe(() => {
      this.filterCompanies(this.searchCompany);
    });

    this.CityControl.valueChanges.subscribe(() => {
      this.filterCities(this.searchCity);
    });

    this.filteredCities = this.locationFilterControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filterCities(value))
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
  applyFilters() {
    const skillFilter = this.skillsControl.value?.toLowerCase() || "";
    const selectedIndustries = this.industryControl.value || [];
    const modeofworkFilter = this.modeOfWorksControl.value || [];
    const selectedSalaryRanges = this.salaryControl.value || [];
    const filtered = this.filteredStudents.filter((company: any) => {
      const industryMatches =
        !selectedIndustries.length ||
        company?.Jobpostings?.some((jobposting: any) =>
          jobposting?.Company?.Companyindustries?.some((ci: any) =>
            selectedIndustries.includes(ci.Industry?.Type)
          )
        );
      const matchesmodeofwork =
        !modeofworkFilter.length ||
        modeofworkFilter.some((jobType: string) =>
          company.ModeOfWork?.toLowerCase().includes(jobType.toLowerCase())
        );
      const matchesSalary =
        !selectedSalaryRanges.length ||
        selectedSalaryRanges.some((rangeLabel) => {
          const range = this.salaryRanges.find((r) => r.label === rangeLabel);
          return (
            company.Salary >= (range?.min || 0) &&
            company.Salary <= (range?.max || Infinity)
          );
        });
      // const matchesSkills =
      // !skillFilter || company.skills.some((skill) => skill.toLowerCase().includes(skillFilter));
      return industryMatches && matchesmodeofwork && matchesSalary;
    });
    this.filteredStudents = filtered;
  }
  filterIndustries(searchTerm: string) {
    const lowerSearchTerm = searchTerm.toLowerCase();
    this.filteredIndustries = this.industries.filter((industry) =>
      industry.Type.toLowerCase().includes(lowerSearchTerm)
    );
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
  resetFilters() {
    this.skillsControl.setValue("");
    this.salaryControl.setValue([]);
    this.modeOfWorksControl.setValue([]);
    this.industryControl.setValue([]);
    this.filteredStudents = [...this.JobPostingsData];
    this.companyFilterControl.setValue([]);
  }

  onCompanySelected(e: any) {}

  openAddEditCompanyForm() {}
  showResults() {
    debugger;
    this.dialogRef.close({
      companies: this.companyControl.value,
      jobTypes: this.jobTypeControl.value,
      ModeOfWorks: this.modeOfWorksControl.value,
    });
  }
}
