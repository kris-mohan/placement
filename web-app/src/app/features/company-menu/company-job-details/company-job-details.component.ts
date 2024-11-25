import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  signal,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { FormControl, FormGroup } from "@angular/forms";
import { companyTableList } from "../../company-configuration/company-config/companies/companies-model";
import { Industry } from "../../company-configuration/company-config/industry/industry.module";
import { Observable, of } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { CompanyJobAdditionalfiltersModalComponent } from "./company-job-additionalfilters-modal/company-job-additionalfilters-modal.component";
import { provideNativeDateAdapter } from "@angular/material/core";
import { Jobposting } from "src/app/services/types/Jobposting";
import { CompanyJobDetailsApiService } from "./company-job-details-apiService";

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

export interface JobpostingWithApplicants extends Jobposting {
  ApplicantsApplied: number;
  ApplicantsRejected: number;
  MinimumYearExperience: number;
  MaximumYearExperience: number;
}

@Component({
  selector: "app-company-job-details",
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: "./company-job-details.component.html",
  styleUrl: "./company-job-details.component.css",
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyJobDetailsComponent {
  sessionCompanyId: number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService,
    private location: Location,
    private companyJobDetailsApiService: CompanyJobDetailsApiService,
    private cd: ChangeDetectorRef
  ) {
    const storedUserRoleId = sessionStorage.getItem("userRoleId");
    this.UserRoleId = storedUserRoleId ? parseInt(storedUserRoleId) : 0;
    const storedCompanyId = sessionStorage.getItem("CompanyId");
    this.sessionCompanyId = storedCompanyId ? parseInt(storedCompanyId) : 0;
  }
  readonly campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });

  searchCity: string = "";
  filteredCompanies: companyTableList[] = [];
  companyId: number | undefined = undefined;
  companies: companyTableList[] = [];

  experienceLevelControl = new FormControl<string[]>([]);
  searchExperiencelevel: string[] = [];
  experienceLevel: string[] = [];

  filteredCompany: Observable<any[]> = of([]);

  UserRoleId: number;
  readonly dialog = inject(MatDialog);

  dataSource1 = new MatTableDataSource<companyTableList>([]);

  CityControl = new FormControl();
  industryControl = new FormControl();
  searchIndustry: string = "";
  industries: Industry[] = [];
  filteredIndustries: Industry[] = [];
  companySizeControl = new FormControl();

  JobPostingsData = signal<JobpostingWithApplicants[]>([]);
  filteredJobPostings = signal<JobpostingWithApplicants[]>([]);
  jobroles: string[] = [];

  searchControl = new FormControl("");
  searchJob = new FormControl("");
  searchLocation = new FormControl("");

  searchLocationValue: string = "";
  filteredLocations: string[] = [];

  ngOnInit() {
    this.GetAllJobPosting(this.sessionCompanyId);
    console.log(this.JobPostingsData);
    this.searchJob.valueChanges.subscribe(() => this.applyFilters());
    this.searchLocation.valueChanges.subscribe(() => this.applyFilters());
    this.experienceLevelControl.valueChanges.subscribe(() =>
      this.applyFilters()
    );
  }

  GetAllJobPosting = (id: number) => {
    this.companyJobDetailsApiService.GetAllJobPostings(id).subscribe({
      next: (jobPostings) => {
        const data: JobpostingWithApplicants[] = jobPostings.value;
        const mappedData = data.map((jobposting: any) => {
          const applicantsApplied =
            jobposting.JobpostingsEligiblestudents.filter(
              (student: any) => student.StatusId === 5
            ).length;
          const applicantsRejected =
            jobposting.JobpostingsEligiblestudents.filter(
              (student: any) => student.StatusId === 8
            ).length;
          return {
            ...jobposting,
            ApplicantsApplied: applicantsApplied,
            ApplicantsRejected: applicantsRejected,
            ValidTill: this.convertToDateOnly(jobposting.ValidTill),
            ValidFrom: this.convertToDateOnly(jobposting.ValidFrom),
            DriveDate: this.convertToDateOnly(jobposting.DriveDate),
          };
        });
        this.JobPostingsData.set(mappedData);
        console.log("jobPosting", this.JobPostingsData);
        const experiences = data.map(
          (student) =>
            `${student.MinimumYearExperience}-${student.MaximumYearExperience} years`
        );
        this.experienceLevel = Array.from(new Set(experiences));
        this.searchExperiencelevel = [...this.experienceLevel];
        this.applyFilters();
      },
      error: (error) => {
        console.error("Error fetching jobPostings:", error);
      },
    });
  };
  applyFilters() {
    const roleFilter = this.searchJob.value
      ? this.searchJob.value.toLowerCase()
      : "";
    const locationFilter = this.searchLocation.value || "";
    const experienceFilter = this.experienceLevelControl.value || [];
    const filtered = this.JobPostingsData().filter((jobposting: any) => {
      const matchesRole =
        jobposting.JobRole?.toLowerCase().includes(roleFilter);
      const matchesLocation =
        !locationFilter.length ||
        locationFilter.includes(jobposting.Location || "");
      const matchesExperience =
        !experienceFilter.length ||
        experienceFilter.includes(
          `${jobposting?.MinimumYearExperience}-${jobposting?.MaximumYearExperience} years`
        );
      return matchesRole && matchesLocation && matchesExperience;
    });

    this.filteredJobPostings.set(filtered);
  }

  filterCities(search: string) {
    const filterValue = search.toLowerCase();
    this.filteredLocations = Array.from(
      new Set(
        this.JobPostingsData()
          .map((student) => student.Location)
          .filter(
            (location): location is string =>
              location !== undefined &&
              location.toLowerCase().includes(filterValue)
          )
      )
    );
  }

  get selectedLocations(): string {
    return this.searchLocation.value || "";
  }
  filterExperienceLevels(search: string) {
    const filterValue = search.toLowerCase();
    this.searchExperiencelevel = this.experienceLevel.filter((level) =>
      level.toLowerCase().includes(filterValue)
    );
  }
  convertToDateOnly(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  }

  openAddEditCompanyForm(id?: number) {
    if (id !== undefined) {
      this.router.navigate(["/company-job-details/add-edit-jobPosting/", id]);
    } else {
      this.router.navigate(["/company-job-details/add-edit-jobPosting/", 0]);
    }
  }

  openTestRounds(id: number) {
    this.router.navigate(["/company-job-details/test-rounds", id]);
  }

  async deleteCompany(id: number) {
    // const confirmed = await this.sweetAlertService.confirmDelete(
    //   "Do you really want to delete this job?"
    // );
    // if (confirmed) {
    //   this.dataSource.data = this.dataSource.data.filter(
    //     (jobs) => jobs.jobId !== id
    //   );
    //   this.sweetAlertService.success("Job deleted successfully!");
    // }
  }

  goBack(): void {
    this.location.back();
  }

  onCompanySelected(e: any) {}
  onCityDropdownOpen() {
    this.filterCities(this.searchCity);
  }
  get selectedCompanyCities(): string {
    const selected = this.CityControl.value;
    return selected ? selected.join(", ") : "";
  }
  resetLocationSelection() {
    this.CityControl.reset();
    this.searchCity = "";
    this.filteredCompanies = this.companies;
    this.dataSource1.data = this.filteredCompanies;
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

    this.dataSource1.data = this.filteredCompanies;
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
  onIndustryDropdownOpen() {
    this.filterIndustries(this.searchIndustry);
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
  get selectedIndustries(): string {
    const selected = this.industryControl.value;
    return selected ? selected.join(", ") : "";
  }
  resetIndustrySelection() {
    this.industryControl.reset();
    this.searchIndustry = "";
    this.filteredCompanies = this.companies;
    this.dataSource1.data = this.filteredCompanies;
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
    this.dataSource1.data = this.filteredCompanies;
  }

  goToCompanyJobDetails(companyId: number) {}

  openCopmanyJobDescriptionPage(jobId?: number) {
    if (jobId !== undefined) {
      this.router.navigate([
        "/company-job-details/companyJobDescription",
        jobId,
      ]);
    } else {
      this.router.navigate(["company-job-details"]);
    }
  }
  openStudentJobAdditionalFiltersModal() {
    this.dialog.open(CompanyJobAdditionalfiltersModalComponent, {
      width: "500px",
    });
  }
}
