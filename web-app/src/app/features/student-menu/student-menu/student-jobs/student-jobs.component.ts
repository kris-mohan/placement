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
  }
  readonly campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });

  searchCity: string = "";
  filteredCompanies: companyTableList[] = [];
  companyId: number | undefined = undefined;
  companies: companyTableList[] = [];
  experienceLevelControl = new FormControl();
  filteredCompany: Observable<any[]> = of([]);

  UserRoleId: number;
  readonly dialog = inject(MatDialog);

  dataSource1 = new MatTableDataSource<companyTableList>([]);

  // displayedColumns: string[] = [
  //   "slNo",
  //   "jobId",
  //   "jobTitle",
  //   // "companyName",
  //   "location",
  //   "jobDescription",
  //   "postedDate",
  //   "actions",
  // ];

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
  experienceLevel: string[] = ["Lateral", "Intern", "Fresher", "Contract"];
  //dataSource = new MatTableDataSource<JobPostingList>(StudentJobPostingList);
  selection = new SelectionModel<JobPostingList>(true, []);

  CityControl = new FormControl();
  industryControl = new FormControl();
  searchIndustry: string = "";
  industries: Industry[] = [];
  filteredIndustries: Industry[] = [];
  companySizeControl = new FormControl();

  JobPostingsData = signal<Jobposting[]>([]);

  ngOnInit() {
    this.GetAllJobPosting();
    console.log(this.JobPostingsData);
  }

  GetAllJobPosting = () => {
    this.studentJobsApiService.GetAllJobPostings().subscribe({
      next: (jobPostings) => {
        const data: Jobposting[] = jobPostings.value;
        const mappedData = data.map((jobposting: any) => ({
          ...jobposting,
          ValidTill: this.convertToDateOnly(jobposting.ValidTill),
          ValidFrom: this.convertToDateOnly(jobposting.ValidFrom),
          DriveDate: this.convertToDateOnly(jobposting.DriveDate),
        }));
        this.JobPostingsData.set(mappedData);
        console.log("Company Name:", this.JobPostingsData()[0].Company.Name);
        // }
      },
      error: (error) => {
        console.error("Error fetching jobPostings:", error);
      },
    });
  };

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
    });
  }
}
