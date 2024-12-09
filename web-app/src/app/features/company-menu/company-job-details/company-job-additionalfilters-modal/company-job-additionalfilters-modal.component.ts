import { CommonModule } from "@angular/common";
import { Component, Inject, inject, signal } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { CompanyAPIService } from "src/app/features/company-configuration/company-config/companies/api.companies";
import { companyTableList } from "src/app/features/company-configuration/company-config/companies/companies-model";
import { Industry } from "src/app/features/company-configuration/company-config/companies/companies-model";
import { IndustryAPIService } from "src/app/features/company-configuration/company-config/industry/api.industry";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { FormControl } from "@angular/forms";
import { Observable, of } from "rxjs";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { Jobposting } from "src/app/services/types/Jobposting";
import { ModeOfWorks } from "src/app/services/common-dropdowns/ModeOfWorks";
import { Companydatum } from "src/app/services/types/Companydatum";
@Component({
  selector: "app-company-job-additionalfilters-modal",
  standalone: true,
  imports: [AMGModules, CommonModule, SharedModule, NgxMatSelectSearchModule],
  templateUrl: "./company-job-additionalfilters-modal.component.html",
  styleUrl: "./company-job-additionalfilters-modal.component.css",
})
export class CompanyJobAdditionalfiltersModalComponent {
  companies: companyTableList[] = [];
  industries: Industry[] = [];
  jobPostingsData: Jobposting[] = [];
  filteredJobpostingData: Jobposting[] = [];

  JobPostingsDescriptionData: Companydatum[] = [];
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
  filteredCompanies: companyTableList[] = [];
  filteredCities: Observable<any[]> = of([]);
  filteredIndustries: Industry[] = [];
  filteredIndutry: Observable<any[]> = of([]);
  filteredCompany: Observable<any[]> = of([]);
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
  readonly dialog = inject(MatDialog);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiCompanyService: CompanyAPIService,
    private apiIndustryService: IndustryAPIService
  ) {
    this.jobPostingsData = data?.JobPostingsData ?? [];
    this.filteredJobpostingData = data?.FilteredJobpostingData ?? [];
  }

  ngOnInit() {
    if (this.data && this.data.JobPostingsData) {
      console.log(
        "ngOnInit: Received JobPostingsData in modal:",
        this.jobPostingsData,
        this.filteredJobpostingData
      );
    } else {
      console.error("Error: JobPostingsData is missing from dialog data!");
    }
    //   this.modeOfWorksControl.valueChanges.subscribe(() => this.applyFilters());
    // }
    // applyFilters(): void {
    //   const jobtypeFilter = this.modeOfWorksControl.value || [];
    //   const filtered = this.jobPostingsData().filter((company) => {
    //     const matchesJobType =
    //       !jobtypeFilter.length ||
    //       jobtypeFilter.some((jobType: string) =>
    //         company.JobType?.toLowerCase().includes(jobType.toLowerCase())
    //       );
    //     return matchesJobType;
    //   });
    //   this.filteredJobpostingData.set(filtered);
    //   console.log("Filtered Data:", filtered);
  }
  onCompanySelected(e: any) {}
  openAddEditCompanyForm() {}
}
