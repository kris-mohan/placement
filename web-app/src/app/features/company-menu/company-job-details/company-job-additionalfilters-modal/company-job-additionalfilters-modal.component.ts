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
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { Jobposting } from "src/app/services/types/Jobposting";
import { ModeOfWorks } from "src/app/services/common-dropdowns/ModeOfWorks";
import { Companydatum } from "src/app/services/types/Companydatum";
import { SalaryRanges } from "src/app/services/common-dropdowns/salaryRanges";
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

  salaryOptions: any[] = SalaryRanges;

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
    public dialogRef: MatDialogRef<CompanyJobAdditionalfiltersModalComponent>,
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

  showResults() {
    this.dialogRef.close({
      companies: this.companyControl.value,
      ModeOfWorks: this.modeOfWorksControl.value,
      salaryRanges: this.salaryControl.value,
    });
  }
}
