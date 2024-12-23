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
import { PlacementUploadFileComponent } from "../company-list-details/placement-upload-file/placement-upload-file.component";
import { JobTypes } from "src/app/services/common-dropdowns/JobTypes";
import { CompanyInvitePopupComponent } from "./company-invite-popup/company-invite-popup.component";
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
    start: new FormControl(new Date(year, month - 1, today.getDate())),
    end: new FormControl(new Date()),
  });
  searchCity: string = "";
  filteredCompanies: companyTableList[] = [];
  companyId: number | undefined = undefined;
  companies: companyTableList[] = [];
  jobTypeControl = new FormControl();
  filteredJobTypes = JobTypes;
  filteredCompany: Observable<any[]> = of([]);
  readonly dialog = inject(MatDialog);

  UserRoleId: number;
  campusCompanyId: number = 0;

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
  //experienceLevel: string[] = [];

  CityControl = new FormControl();
  industryControl = new FormControl();
  searchIndustry: string = "";
  industries: Industry[] = [];
  filteredIndustries: Industry[] = [];
  companySizeControl = new FormControl();

  CompanyId: number | null = null;
  searchName = new FormControl("");
  searchLocation = new FormControl();
  searchLocationValue: string = "";
  filteredLocations: string[] = [];
  JobPostingsDescriptionData = signal<Companydatum[]>([]);
  filteredJobpostingData = signal<Jobposting[]>([]);
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
              const data: Companydatum[] = jobPostings.value;
              console.log(data);
              this.jobPostingsData.set(data[0].Jobpostings);
              this.JobPostingsDescriptionData.set(data);
              console.log("Company Name:", this.JobPostingsDescriptionData());
              this.applyFilters();
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
    this.searchName.valueChanges.subscribe(() => this.applyFilters());
    this.searchLocation.valueChanges.subscribe(() => this.applyFilters());
    this.jobTypeControl.valueChanges.subscribe(() => this.applyFilters());
  }
  applyFilters(): void {
    const nameFilter = this.searchName.value?.toLowerCase() || "";
    const locationFilter = this.searchLocation.value || [];
    const jobtypeFilter = this.jobTypeControl.value || [];
    const filtered = this.jobPostingsData().filter((company) => {
      const matchesName =
        !nameFilter || company.JobRole?.toLowerCase().includes(nameFilter);
      const matchesLocation =
        !locationFilter.length || locationFilter.includes(company.Location);
      const matchesJobType =
        !jobtypeFilter.length ||
        jobtypeFilter.some((jobType: string) =>
          company.JobType?.toLowerCase().includes(jobType.toLowerCase())
        );
      return matchesName && matchesLocation && matchesJobType;
    });

    this.filteredJobpostingData.set(filtered);
    console.log("Filtered Data:", filtered);
  }

  removeJobPosting() {
    this.getAllCompanyCampuses();
  }

  getAllCompanyCampuses = () => {
    this.placementCompanyJobDetailsApiService
      .GetCampusCompanyById(this.CompanyId)
      .subscribe({
        next: (odataResponse) => {
          console.log("Company", odataResponse.value);
          this.campusCompanyId = odataResponse.value[0].Id;
          console.log(this.campusCompanyId);
          this.deleteCompanyById();
        },
        error: (error) => {
          console.error("Error fetching companies:", error);
        },
      });
  };

  deleteCompanyById = () => {
    this.placementCompanyJobDetailsApiService
      .DeleteCompanyById(this.campusCompanyId)
      .subscribe({
        next: (response: { success: boolean; message: string }) => {
          if (response.success) {
            this.sweetAlertService.success(response.message);
            this.router.navigate(["/placement-company"]);
          } else {
            this.sweetAlertService.error(response.message);
          }
        },
        error: (error) => {
          this.sweetAlertService.error(
            "An unexpected error occurred while deleting the Company."
          );
          console.error("Error deleting Company:", error);
        },
      });
  };

  filterCities(search: string) {
    const filterValue = search.toLowerCase();
    this.filteredLocations = Array.from(
      new Set(
        this.jobPostingsData()
          .map((job) => job.Location || "")
          .filter(
            (location): location is string =>
              location !== undefined &&
              location.toLowerCase().includes(filterValue)
          )
      )
    );
  }

  get selectedLocations(): string {
    const selected = this.CityControl.value;
    return selected ? selected.join(", ") : "";
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
        this.CompanyId,
        id,
      ]);
    } else {
      this.router.navigate([
        "/placement-company/placement-company-job-details/add-edit-jobPosting/",
        this.CompanyId,
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
      data: {
        JobPostingsData: this.jobPostingsData(),
        JobPostingsDescriptionData: this.JobPostingsDescriptionData(),
        FilteredJobpostingData: this.filteredJobpostingData(),
      },
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
    this.router.navigate([
      "placement-company/placement-company-job-details/placement-job-description/",
      this.CompanyId,
      jobId,
    ]);
  }

  getDateLabel(date: Date) {
    return GetDateDDMMYYYY(date);
  }
  openUploadExcel(id?: number) {
    // if (id !== undefined) {
    //   this.router.navigate(["/placement-upload-file", id]);
    // } else {
    //   this.router.navigate(["/placement-upload-file", ""]);
    // }

    this.dialog.open(PlacementUploadFileComponent, {
      data: id,
      width: "500px",
      height: "600px",
    });
  }
  showInvitePopup() {
    this.dialog.open(CompanyInvitePopupComponent, {
      width: "500px",
      height: "500px",
    });
  }
}
