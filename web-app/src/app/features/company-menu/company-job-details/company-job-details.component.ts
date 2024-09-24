import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { APIService } from "src/app/services/api-services/api-services";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { JobPostingList } from "./company-job-details-model";
import { FormControl } from "@angular/forms";
import { companyTableList } from "../../company-configuration/company-config/companies/companies-model";
import { Industry } from "../../company-configuration/company-config/industry/industry.module";

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
  selector: "app-company-job-details",
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: "./company-job-details.component.html",
  styleUrl: "./company-job-details.component.css",
})
export class CompanyJobDetailsComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService,
    private location: Location,
    private apiService: APIService
  ) {}

  searchCity: string = "";
  filteredCompanies: companyTableList[] = [];
  companyId: number | undefined = undefined;
  companies: companyTableList[] = [];
  experienceLevelControl = new FormControl();

  dataSource1 = new MatTableDataSource<companyTableList>([]);

  displayedColumns: string[] = [
    "slNo",
    "jobId",
    "jobTitle",
    // "companyName",
    "location",
    "jobDescription",
    "postedDate",
    "actions",
  ];
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
}
