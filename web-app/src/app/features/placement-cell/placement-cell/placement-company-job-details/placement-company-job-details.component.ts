import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { APIService } from "src/app/services/api-services/api-services";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { FormControl, FormGroup } from "@angular/forms";
import { Observable, of } from "rxjs";
import {
  companyTableList,
  Industry,
} from "src/app/features/company-configuration/company-config/companies/companies-model";
import { JobPostingList } from "../jobs-list/jobs-list-model";
import { CompanyJobAdditionalfiltersModalComponent } from "src/app/features/company-menu/company-job-details/company-job-additionalfilters-modal/company-job-additionalfilters-modal.component";
import { ImportCompanyDialogComponent } from "src/app/features/company-configuration/company-config/companies/import-company-dialog/import-company-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { provideNativeDateAdapter } from "@angular/material/core";
const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

export const JOBPOSTING_DATA: JobPostingList[] = [
  {
    jobId: 1,
    jobTitle: "Software Engineer",
    companyName: "Tech Solutions Inc.",
    location: "San Francisco, CA",
    jobDescription:
      "We are looking for a skilled software engineer to join our team.",
    postedDate: "2024-07-01",
    applicationDeadline: new Date("2024-08-01"),
    applicationUrl: "https://techsolutions.com/careers/software-engineer",
    actions: "readmore, delete",
  },
  {
    jobId: 2,
    jobTitle: "Project Manager",
    companyName: "Innovative Projects Ltd.",
    location: "New York, NY",
    jobDescription:
      "We are seeking an experienced project manager to oversee our projects.",
    postedDate: "2024-07-05",
    applicationDeadline: new Date("2024-08-15"),
    applicationUrl: "https://innovativeprojects.com/careers/project-manager",
    actions: "readmore, delete",
  },
  {
    jobId: 3,
    jobTitle: "Marketing Specialist",
    companyName: "Creative Agency",
    location: "Los Angeles, CA",
    jobDescription:
      "We are looking for a creative marketing specialist to join our team.",
    postedDate: "2024-07-10",
    applicationDeadline: new Date("2024-08-20"),
    applicationUrl: "https://creativeagency.com/careers/marketing-specialist",
    actions: "readmore, delete",
  },
  {
    jobId: 4,
    jobTitle: "Data Analyst",
    companyName: "Data Insights Corp.",
    location: "Chicago, IL",
    jobDescription:
      "We are looking for a data analyst to help us make data-driven decisions.",
    postedDate: "2024-07-15",
    applicationDeadline: new Date("2024-08-25"),
    applicationUrl: "https://datainsights.com/careers/data-analyst",
    actions: "readmore, delete",
  },
];

@Component({
  selector: "app-placement-company-job-details",
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: "./placement-company-job-details.component.html",
  styleUrl: "./placement-company-job-details.component.css",
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlacementCompanyJobDetailsComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService,
    private location: Location,
    private apiService: APIService
  ) {
    const storedUserType = sessionStorage.getItem("userType");
    this.userType = storedUserType ? parseInt(storedUserType) : 0;
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
  readonly dialog = inject(MatDialog);

  userType: number;

  dataSource1 = new MatTableDataSource<companyTableList>([]);
  companiesCard = [
    {
      Id: 1,
      logo: "company-logo-1.png",
      name: "Haier Appliances",
      rating: 4.1,
      reviews: "1.3K+ reviews",
      type: "Foreign MNC",
      numberOfJobs: 4,
      registeredStudents: 120,
      placedStudents: 80,
    },
    {
      Id: 2,
      logo: "company-logo-2.png",
      name: "Sony Electronics",
      rating: 4.5,
      reviews: "2K+ reviews",
      type: "Foreign MNC",
      numberOfJobs: 5,
      registeredStudents: 100,
      placedStudents: 60,
    },
    {
      Id: 3,
      logo: "company-logo-3.png",
      name: "Samsung Tech",
      rating: 4.2,
      reviews: "1.5K+ reviews",
      type: "Foreign MNC",
      numberOfJobs: 3,
      registeredStudents: 200,
      placedStudents: 150,
    },
    {
      Id: 4,
      logo: "company-logo-4.png",
      name: "LG Electronics",
      rating: 4.3,
      reviews: "1.8K+ reviews",
      type: "Foreign MNC",
      numberOfJobs: 6,
      registeredStudents: 140,
      placedStudents: 110,
    },
    {
      Id: 5,
      logo: "company-logo-5.png",
      name: "Apple Inc.",
      rating: 4.8,
      reviews: "3K+ reviews",
      type: "Foreign MNC",
      numberOfJobs: 7,
      registeredStudents: 250,
      placedStudents: 200,
    },
    {
      Id: 6,
      logo: "company-logo-6.png",
      name: "Microsoft Corp.",
      rating: 4.7,
      reviews: "2.7K+ reviews",
      type: "Foreign MNC",
      numberOfJobs: 5,
      registeredStudents: 180,
      placedStudents: 160,
    },
    {
      Id: 7,
      logo: "company-logo-7.png",
      name: "Google LLC",
      rating: 4.9,
      reviews: "5K+ reviews",
      type: "Foreign MNC",
      numberOfJobs: 8,
      registeredStudents: 300,
      placedStudents: 250,
    },
    {
      Id: 8,
      logo: "company-logo-8.png",
      name: "Facebook Inc.",
      rating: 4.6,
      reviews: "2.2K+ reviews",
      type: "Foreign MNC",
      numberOfJobs: 4,
      registeredStudents: 170,
      placedStudents: 130,
    },
    {
      Id: 9,
      logo: "company-logo-9.png",
      name: "Amazon Web Services",
      rating: 4.4,
      reviews: "2.5K+ reviews",
      type: "Foreign MNC",
      numberOfJobs: 6,
      registeredStudents: 220,
      placedStudents: 180,
    },
    {
      Id: 10,
      logo: "company-logo-10.png",
      name: "Tesla Inc.",
      rating: 4.7,
      reviews: "2.8K+ reviews",
      type: "Foreign MNC",
      numberOfJobs: 5,
      registeredStudents: 160,
      placedStudents: 140,
    },
  ];

  jobsCard = [
    {
      Id: 1,
      logo: "job-logo-1.png",
      title: "Software Engineer",
      experience: "0 - 2 years",
      salary: "₹6 - 8 LPA",
      location: "Bengaluru",
      shift: "Day Shift",
      modeOfWork: "Hybrid",
      numberOfOpenings: 10,
      applicants: 100,
    },
    {
      Id: 2,
      logo: "job-logo-2.png",
      title: "Data Analyst",
      experience: "1 - 3 years",
      salary: "₹4 - 6 LPA",
      location: "Hyderabad",
      shift: "Day Shift",
      modeOfWork: "Remote",
      numberOfOpenings: 5,
      applicants: 80,
    },
    {
      Id: 3,
      logo: "job-logo-3.png",
      title: "Product Manager",
      experience: "3 - 5 years",
      salary: "₹12 - 15 LPA",
      location: "Mumbai",
      shift: "Day Shift",
      modeOfWork: "On-site",
      numberOfOpenings: 3,
      applicants: 50,
    },
    {
      Id: 4,
      logo: "job-logo-4.png",
      title: "HR Executive",
      experience: "0 - 1 year",
      salary: "₹3 - 5 LPA",
      location: "Delhi",
      shift: "Day Shift",
      modeOfWork: "Hybrid",
      numberOfOpenings: 7,
      applicants: 120,
    },
    {
      Id: 5,
      logo: "job-logo-5.png",
      title: "Marketing Specialist",
      experience: "2 - 4 years",
      salary: "₹7 - 9 LPA",
      location: "Pune",
      shift: "Day Shift",
      modeOfWork: "On-site",
      numberOfOpenings: 5,
      applicants: 60,
    },
    {
      Id: 6,
      logo: "job-logo-6.png",
      title: "Sales Manager",
      experience: "4 - 6 years",
      salary: "₹10 - 12 LPA",
      location: "Chennai",
      shift: "Day Shift",
      modeOfWork: "Remote",
      numberOfOpenings: 4,
      applicants: 70,
    },
    {
      Id: 7,
      logo: "job-logo-7.png",
      title: "Cloud Engineer",
      experience: "2 - 4 years",
      salary: "₹8 - 10 LPA",
      location: "Bengaluru",
      shift: "Night Shift",
      modeOfWork: "On-site",
      numberOfOpenings: 6,
      applicants: 150,
    },
    {
      Id: 8,
      logo: "job-logo-8.png",
      title: "UI/UX Designer",
      experience: "1 - 3 years",
      salary: "₹5 - 7 LPA",
      location: "Gurugram",
      shift: "Day Shift",
      modeOfWork: "Hybrid",
      numberOfOpenings: 5,
      applicants: 90,
    },
    {
      Id: 9,
      logo: "job-logo-9.png",
      title: "DevOps Engineer",
      experience: "3 - 5 years",
      salary: "₹10 - 14 LPA",
      location: "Noida",
      shift: "Night Shift",
      modeOfWork: "Remote",
      numberOfOpenings: 4,
      applicants: 85,
    },
    {
      Id: 10,
      logo: "job-logo-10.png",
      title: "Cybersecurity Specialist",
      experience: "5+ years",
      salary: "₹15 - 18 LPA",
      location: "Bengaluru",
      shift: "Day Shift",
      modeOfWork: "On-site",
      numberOfOpenings: 2,
      applicants: 40,
    },
  ];

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
  dataSource = new MatTableDataSource<JobPostingList>(JOBPOSTING_DATA);
  selection = new SelectionModel<JobPostingList>(true, []);

  CityControl = new FormControl();
  industryControl = new FormControl();
  searchIndustry: string = "";
  industries: Industry[] = [];
  filteredIndustries: Industry[] = [];
  companySizeControl = new FormControl();

  openImportCompanyDialog() {
    this.dialog.open(ImportCompanyDialogComponent, {
      width: "500px",
      height: "600px",
    });
  }

  openAddEditCompanyForm(id?: number) {
    if (id !== undefined) {
      this.router.navigate([
        "/placement-company/placement-company-job-details/add-edit-jobPosting/",
        id,
      ]);
    } else {
      this.router.navigate([
        "/placement-company/placement-company-job-details/add-edit-jobPosting/",
        0,
      ]);
    }
  }

  openTestRounds(id: number) {
    this.router.navigate(["/company-job-details/test-rounds", id]);
  }

  async deleteCompany(id: number) {
    const confirmed = await this.sweetAlertService.confirmDelete(
      "Do you really want to delete this job?"
    );
    if (confirmed) {
      this.dataSource.data = this.dataSource.data.filter(
        (jobs) => jobs.jobId !== id
      );
      this.sweetAlertService.success("Job deleted successfully!");
    }
  }
  openStudentJobAdditionalFiltersModal() {
    this.dialog.open(CompanyJobAdditionalfiltersModalComponent, {
      width: "500px",
    });
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
      "placement-company/placement-company-job-details/placement-job-description/",
      jobId,
    ]);
  }
}
