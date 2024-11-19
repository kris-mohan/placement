import { CommonModule, Location } from "@angular/common";
import {
  ChangeDetectionStrategy,
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
import { Observable, of } from "rxjs";
import {
  companyTableList,
  Industry,
} from "src/app/features/company-configuration/company-config/companies/companies-model";
import { CompanyJobAdditionalfiltersModalComponent } from "src/app/features/company-menu/company-job-details/company-job-additionalfilters-modal/company-job-additionalfilters-modal.component";
import { ImportCompanyDialogComponent } from "src/app/features/company-configuration/company-config/companies/import-company-dialog/import-company-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { provideNativeDateAdapter } from "@angular/material/core";
import { PlacementCompanyJobDetailsApiService } from "./placement-company-job-details-apiService";
import { Companydatum } from "src/app/services/types/Companydatum";
import { Jobposting } from "src/app/services/types/Jobposting";
import { GetDateDDMMYYYY } from "src/app/core/helper/DateHelper";
const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

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
    private placementCompanyJobDetailsApiService: PlacementCompanyJobDetailsApiService
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
  readonly dialog = inject(MatDialog);

  UserRoleId: number;

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
  experienceLevel: string[] = ["Lateral", "Intern", "Fresher", "Contract"];

  CityControl = new FormControl();
  industryControl = new FormControl();
  searchIndustry: string = "";
  industries: Industry[] = [];
  filteredIndustries: Industry[] = [];
  companySizeControl = new FormControl();

  CompanyId: number | null = null;

  JobPostingsDescriptionData = signal<Companydatum | null>(null);
  jobPostingsData = signal<Jobposting[]>([]);

  getCompanyJobDescriptionById(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this.CompanyId = id !== null ? +id : null;
      if (this.CompanyId !== null) {
        this.placementCompanyJobDetailsApiService
          .GetCompanyById(this.CompanyId)
          .subscribe({
            next: (jobPostings) => {
              const data: Companydatum = jobPostings.value[0];
              console.log(data);
              this.jobPostingsData.set(data.Jobpostings);
              this.JobPostingsDescriptionData.set(data);
              console.log("Company Name:", this.JobPostingsDescriptionData());
              // }
            },
            error: (error) => {
              console.error("Error fetching jobPostings:", error);
            },
          });
      }
    });
  }

  ngOnInit() {
    this.getCompanyJobDescriptionById();
  }

  convertToDateOnly(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  }

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

  async deleteCompany(id: number) {}

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
      this.CompanyId,
      jobId,
    ]);
  }

  getDateLabel(date: Date) {
    return GetDateDDMMYYYY(date);
  }
}
