import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { FormControl, FormGroup } from "@angular/forms";
import { Observable, of } from "rxjs";
import {
  companyTableList,
  Industry,
} from "src/app/features/company-configuration/company-config/companies/companies-model";
import { JobPostingList } from "src/app/features/company-menu/company-job-details/company-job-details-model";
import { MatDialog } from "@angular/material/dialog";
import { StudentJobAdditionalFilterModalComponent } from "../student-job-additional-filter-modal/student-job-additional-filter-modal.component";
import { provideNativeDateAdapter } from "@angular/material/core";
import { Jobposting } from "src/app/services/types/Jobposting";
import { StudentJobsApiSerivce } from "./studentJobsApiService";
import { signal } from "@angular/core";
import { JobpostingsEligiblestudent } from "src/app/services/types/JobpostingsEligibleStudent";
import { Companydatum } from "src/app/services/types/Companydatum";
import { JobTypes } from "src/app/services/common-dropdowns/JobTypes";
import { AppliedJobInterview } from "src/app/services/types/AppliedJobInterview";

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: "app-student-jobs",
  standalone: true,
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: "./student-jobs.component.html",
  styleUrl: "./student-jobs.component.css",
})
export class StudentJobsComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService,
    private location: Location,
    private studentJobsApiService: StudentJobsApiSerivce,

    private cd: ChangeDetectorRef
  ) {
    const storedUserRoleId = sessionStorage.getItem("userRoleId");
    this.UserRoleId = storedUserRoleId ? parseInt(storedUserRoleId) : 0;

    const storedStudentId = sessionStorage.getItem("StudentId");
    this.StudentId = storedStudentId ? parseInt(storedStudentId) : 0;
  }
  readonly campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month - 1, today.getDate())),
    end: new FormControl(new Date()),
  });

  isLoading = true;
  jobInterviewRounds = signal<AppliedJobInterview[]>([]);
  filteredJobInterviewRounds = signal<AppliedJobInterview[]>([]);

  searchCity: string = "";
  filteredCompanies: companyTableList[] = [];
  companyId: number | undefined = undefined;
  companies: companyTableList[] = [];
  filteredCompany: Observable<any[]> = of([]);

  UserRoleId: number;
  StudentId: number;
  readonly dialog = inject(MatDialog);

  dataSource1 = new MatTableDataSource<companyTableList>([]);

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
  columns = [
    { key: "slNo", label: "Sl No" },
    { key: "jobId", label: "job Id" },
    { key: "jobTitle", label: "job Title" },
    // { key: "companyName", label: "company Name" },
    { key: "location", label: "location" },
    { key: "jobDescription", label: "job Description" },
    { key: "postedDate", label: "posted Date" },
    { key: "actions", label: "Actions" },
  ];
  //dataSource = new MatTableDataSource<JobPostingList>(StudentJobPostingList);
  selection = new SelectionModel<JobPostingList>(true, []);

  CityControl = new FormControl();
  industryControl = new FormControl();
  searchIndustry: string = "";
  industries: Industry[] = [];
  filteredIndustries: Industry[] = [];
  companySizeControl = new FormControl();

  searchControl = new FormControl("");
  searchName = new FormControl("");
  searchLocation = new FormControl("");
  //searchJobType = new FormControl("");
  experienceLevelControl = new FormControl<string[]>([]);

  searchLocationValue: string = "";
  //searchJobTypeValue: string = "";
  searchExperiencelevel: string[] = [];
  filteredLocations: string[] = [];
  //filteredJobTypes: string[] = [];
  experienceLevel: string[] = [];
  jobTypeControl = new FormControl();
  filteredJobTypes = JobTypes;

  JobPostingsData = signal<JobpostingsEligiblestudent[]>([]);
  filteredStudents = signal<JobpostingsEligiblestudent[]>([]);
  ngOnInit() {
    this.GetAllJobPosting();
    console.log(this.JobPostingsData);
    this.searchName.valueChanges.subscribe(() => this.applyFilters());
    this.searchLocation.valueChanges.subscribe(() => this.applyFilters());
    this.jobTypeControl.valueChanges.subscribe(() => this.applyFilters());
    this.experienceLevelControl.valueChanges.subscribe(() =>
      this.applyFilters()
    );
  }
  GetAllJobPosting = () => {
    this.studentJobsApiService.GetAllJobPostings(this.StudentId).subscribe({
      next: (jobPostings) => {
        const data: JobpostingsEligiblestudent[] = jobPostings.value;
        console.log(data);

        this.JobPostingsData.set(data);
        // this.filteredJobTypes = Array.from(
        //   new Set(
        //     data
        //       .map((student) => student.JobPosting?.JobType)
        //       .filter((jobType): jobType is string => jobType !== undefined)
        //   )
        // );
        const experiences = data.map(
          (student) =>
            `${student.JobPosting?.MinimumYearExperience}-${student.JobPosting?.MaximumYearExperience} years`
        );
        this.experienceLevel = Array.from(new Set(experiences));
        this.searchExperiencelevel = [...this.experienceLevel];
        console.log(this.JobPostingsData());
        this.applyFilters();
      },
      error: (error) => {
        console.error("Error fetching jobPostings:", error);
      },
    });
  };
  applyFilters() {
    const filtered = this.JobPostingsData().filter((student) => {
      const nameFilter = this.searchName.value?.toLowerCase() || "";
      const locationFilter = this.searchLocation.value || "";
      const jobtypeFilter = this.jobTypeControl.value || [];
      const experienceFilter = this.experienceLevelControl.value || [];
      const matchesName =
        !nameFilter ||
        student.JobPosting?.JobRole?.toLowerCase().includes(nameFilter) ||
        student.JobPosting?.Company?.Name?.toLowerCase().includes(nameFilter);
      const matchesLocation =
        !locationFilter.length ||
        locationFilter.includes(student.JobPosting.Location || "");
      // const matchesJobType =
      //   !jobtypeFilter.length ||
      //   jobtypeFilter.includes(student.JobPosting.JobType || "");
      const matchesJobType =
        !jobtypeFilter.length ||
        jobtypeFilter.some((jobType: string) =>
          student.JobPosting.JobType?.toLowerCase().includes(
            jobType.toLowerCase()
          )
        );

      const matchesExperience =
        !experienceFilter.length ||
        experienceFilter.includes(
          `${student.JobPosting?.MinimumYearExperience}-${student.JobPosting?.MaximumYearExperience} years`
        );
      return (
        matchesName && matchesLocation && matchesJobType && matchesExperience
      );
    });
    this.filteredStudents.set(filtered);
    this.isLoading = false;
  }
  convertToDateOnly(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  }

  openAddEditCompanyForm(id?: number) {
    if (id !== undefined) {
      this.router.navigate(["/company-job-details", id]);
    } else {
      this.router.navigate(["/company-job-details", 0]);
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
  filterCities(search: string) {
    const filterValue = search.toLowerCase();
    this.filteredLocations = Array.from(
      new Set(
        this.JobPostingsData()
          .map((student) => student.JobPosting.Location)
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
  filterJobTypes(search: string) {
    const filterValue = search.toLowerCase();
    this.filteredJobTypes = Array.from(
      new Set(
        this.JobPostingsData()
          .map((student) => student.JobPosting.JobType)
          .filter(
            (jobType): jobType is string =>
              jobType !== undefined &&
              jobType.toLowerCase().includes(filterValue)
          )
      )
    );
  }
  filterExperienceLevels(search: string) {
    const filterValue = search.toLowerCase();
    this.searchExperiencelevel = this.experienceLevel.filter((level) =>
      level.toLowerCase().includes(filterValue)
    );
  }

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
    this.router.navigate([
      "/student-company/student-jobs/student-job-description/",
      jobId,
    ]);
  }

  openStudentJobAdditionalFiltersModal() {
    this.dialog.open(StudentJobAdditionalFilterModalComponent, {
      width: "500px",
      data: {
        JobPostingData: this.JobPostingsData(),
        FilteredStudents: this.filteredStudents(),
      },
    });
  }
  openInterviewAdditionalFilter() {
    const dialogRef = this.dialog.open(
      StudentJobAdditionalFilterModalComponent,
      {
        width: "500px",
      }
    );
    dialogRef.afterClosed().subscribe((filterValues) => {
      debugger;
      if (filterValues) {
        this.filterData(filterValues);
      }
    });
  }
  filterData(filterValues: any) {
    debugger;
    console.log(filterValues, "filter values");
    const filtered = this.JobPostingsData().filter((student) => {
      const selectedCompanies = filterValues.companies || [];
      const selectedJobTypes = filterValues.jobTypes || [];
      const selectedworkModes = filterValues.ModeOfWorks || [];

      const companyMatch =
        selectedCompanies.length === 0 ||
        selectedCompanies.includes(student.JobPosting.Company?.Name || "");

      const jobmodeWorkMatch =
        selectedworkModes.length === 0 ||
        selectedworkModes.includes(student.JobPosting.ModeOfWork || "");

      return companyMatch && jobmodeWorkMatch;
    });
    this.filteredStudents.set(filtered);
  }
}
