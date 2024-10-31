import { CommonModule, Location } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewChild,
} from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Observable, of, startWith, map } from "rxjs";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { CompanyAPIService } from "../../company-configuration/company-config/companies/api.companies";
import {
  companyTableList,
  Industry,
} from "../../company-configuration/company-config/companies/companies-model";
import { CompanyDetailDialogModalComponent } from "../../company-configuration/company-config/companies/company-detail-dialog-modal/company-detail-dialog-modal.component";
import { ImportCompanyDialogComponent } from "../../company-configuration/company-config/companies/import-company-dialog/import-company-dialog.component";
import { IndustryAPIService } from "../../company-configuration/company-config/industry/api.industry";
import { InterviewAdditionalFilterComponent } from "../interview/interview-additional-filter/interview-additional-filter.component";
import { provideNativeDateAdapter } from "@angular/material/core";
import { OfferManagementDetailsApiService } from "./api.offer-management-details";
import { JobpostingSelectedstudent } from "src/app/services/types/JobpostingSelectedstudent";
import { University } from "src/app/services/types/University";
import { Campusregistration } from "src/app/services/types/Campusregistration";
import { Jobstudentstatus } from "src/app/services/types/Jobstudentstatus";
import { Jobposting } from "src/app/services/types/Jobposting";
import { Technology } from "src/app/services/types/Technology";

export interface ODataResponse<T> {
  value: T[];
}

type FilterObject = {
  Status: number;
  JobRole: number;
  DriveDate: Date;
  University: number;
  College: number;
};

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: "app-offer-management",
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: "./offer-management.component.html",
  styleUrl: "./offer-management.component.css",
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferManagementComponent {
  constructor(
    private router: Router,
    private sweetAlertService: SweetAlertService,
    private location: Location,
    private apiCompanyService: CompanyAPIService,
    private apiIndustryService: IndustryAPIService,
    private offerManagementDetailsApiService: OfferManagementDetailsApiService
  ) {
    const storedUserRoleId = sessionStorage.getItem("userRoleId");
    this.UserRoleId = storedUserRoleId ? parseInt(storedUserRoleId) : 0;
    const userCompanyId = sessionStorage.getItem("CompanyId");
    this.companyId = userCompanyId ? parseInt(userCompanyId) : 0;
  }
  universityTypes: University[] = [];

  readonly dialog = inject(MatDialog);

  readonly campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  companyId: number;

  UserRoleId: number;

  statuses: Jobstudentstatus[] = [];
  selectedStatuses: Jobstudentstatus[] = [];

  technologies: Technology[] = [];
  selectedTechnologies: Technology[] = [];

  companies: companyTableList[] = [];
  colleges: Campusregistration[] = [];

  JobpostingSelectedstudentData = signal<JobpostingSelectedstudent[]>([]);
  acceptedOffersCount: number = 0;
  rejectedOffersCount: number = 0;
  pendingOffersCount: number = 0;

  displayedColumns: string[] = [
    "Name",
    "Industries",
    "OpenPosition",
    "ContactPerson",
    "City",
    "Email",
    "PhoneNumber",
    "Url",
    "JD",
    "Actions",
  ];

  columns = [
    { key: "Name", label: "Name" },
    { key: "Industries", label: "Industries" },
    { key: "OpenPosition", label: "Open Position" },
    { key: "ContactPerson", label: "Contact Person" },
    { key: "City", label: "City" },
    { key: "Email", label: "Email" },
    { key: "PhoneNumber", label: "Phone Number" },
    { key: "Url", label: "URL" },
    { key: "JD", label: "JD" },
    { key: "Actions", label: "Actions" },
  ];

  industries: Industry[] = [];

  offers: JobpostingSelectedstudent[] = [];

  calculateAcceptedOffers() {
    this.acceptedOffersCount = this.offers.filter(
      (offer) => offer.HasAcceptedOffer === 1
    ).length;
  }

  calculateRejectedOffer() {
    this.rejectedOffersCount = this.offers.filter(
      (offer) => offer.HasAcceptedOffer === 0
    ).length;
  }

  calculatePendingOffer() {
    this.pendingOffersCount = this.offers.filter(
      (offer) => offer.HasAcceptedOffer === null
    ).length;
  }

  getAllOffers = () => {
    this.offerManagementDetailsApiService
      .GetAllOffers(this.companyId, this.filterObject)
      .subscribe({
        next: (response) => {
          const data: JobpostingSelectedstudent[] = response.value;
          console.log("Selected Students", data);
          this.JobpostingSelectedstudentData.set(data);
          this.offers = data;
          this.calculateAcceptedOffers();
          this.calculateRejectedOffer();
          this.calculatePendingOffer();
        },
        error: (error) => {
          console.log("Error fetching rounds: ", error);
        },
      });
  };

  getAllUniversities = () => {
    this.offerManagementDetailsApiService.GetAllUniversities().subscribe({
      next: (response) => {
        const data: University[] = response.value;
        console.log("University Types", data);
        this.universityTypes = data;
      },
      error: (error) => {
        console.log("Error fetching rounds: ", error);
      },
    });
  };

  getAllColleges = () => {
    this.offerManagementDetailsApiService.GetAllColleges().subscribe({
      next: (response) => {
        const data: Campusregistration[] = response.value;
        console.log("College Types", data);
        if (data) this.colleges = data;
      },
    });
  };

  getAllStatuses = () => {
    this.offerManagementDetailsApiService.GetAllStatuses().subscribe({
      next: (response) => {
        const data: Jobstudentstatus[] = response.value;
        console.log("Statuses", data);
        this.statuses = data;
      },
    });
  };

  getAllTechnologies = () => {
    this.offerManagementDetailsApiService.GetAllTechnologies().subscribe({
      next: (response) => {
        const data: Technology[] = response.value;
        console.log("Technologies", data);
        this.technologies = data;
      },
    });
  };

  filterObject: FilterObject = {
    Status: 0,
    JobRole: 0,
    DriveDate: new Date(),
    University: 0,
    College: 0,
  };

  ngOnInit() {
    this.getAllOffers();

    this.getAllUniversities();

    this.getAllColleges();

    this.getAllStatuses();

    this.getAllTechnologies();

    // this.dataSource.paginator = this.paginator;

    // this.CityControl.valueChanges.subscribe(() => {
    //   this.filterCities(this.searchCity);
    //   this.filterObject.Status = 2;
    // });

    // this.industryControl.valueChanges.subscribe(() => {
    //   this.filterIndustries(this.searchIndustry);
    // });

    // this.filteredCities = this.CityFilterControl.valueChanges.pipe(
    //   startWith(""),
    //   map((value) => this._filterCities(value))
    // );
    // this.filteredIndutry = this.industryFilterControl.valueChanges.pipe(
    //   startWith(""),
    //   map((value) => this._filterIndustries(value))
    // );

    // this.filteredCompany = this.companyControl.valueChanges.pipe(
    //   startWith(""),
    //   map((value) => this._filterCompanies(value))
    // );
  }

  goBack(): void {
    this.location.back();
  }

  onCompanySelected(event: MatAutocompleteSelectedEvent) {
    const selectedCompanyName = event.option.value;
    const selectedCompany = this.companies.find(
      (company) => company.Name === selectedCompanyName
    );
    if (selectedCompany) {
      this.apiCompanyService
        .getCompanyDataById(selectedCompany.Id)
        .subscribe((response) => {
          const companyData = response.value[0];
          this.openCompanyModalPopup(companyData);
        });
    }
  }

  openCompanyModalPopup(company: any): void {
    this.dialog.open(CompanyDetailDialogModalComponent, {
      width: "500px",
      height: "600px",
      data: company,
    });
  }

  _filterCompanies(value: string): companyTableList[] {
    const filterValue = value.toLowerCase();
    if (filterValue.length < 2) {
      return [];
    }
    return this.companies.filter((company) =>
      company.Name.toLowerCase().includes(filterValue)
    );
  }

  openAddEditCompanyForm(id?: number) {
    if (id !== null && id !== undefined) {
      this.router.navigate(["/company-configuration/company", id]);
    } else {
      this.router.navigate(["/company-configuration/company", 0]);
    }
  }

  // async deleteCompany(id: number) {
  //   const confirmed = await this.sweetAlertService.confirmDelete(
  //     "Do you really want to delete this Company?"
  //   );

  //   if (confirmed) {
  //     this.apiCompanyService.deleteCompany(id).subscribe({
  //       next: (response: { success: boolean; message: string }) => {
  //         if (response.success) {
  //           this.sweetAlertService.success(response.message);
  //           this.loadCompanies();
  //         } else {
  //           this.sweetAlertService.error(response.message);
  //         }
  //       },
  //       error: (error) => {
  //         this.sweetAlertService.error(
  //           "An unexpected error occurred while deleting the Company."
  //         );
  //         console.error("Error deleting Company:", error);
  //       },
  //     });
  //   }
  // }

  openJdDetails(id: number) {}

  openImportCompanyDialog() {
    this.dialog.open(ImportCompanyDialogComponent, {
      width: "500px",
      height: "600px",
    });
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

  // filterIndustries(search: string) {
  //   const filterValue = search.toLowerCase();

  //   const filteredList = this.industries.filter((industry) =>
  //     industry.Type.toLowerCase().includes(filterValue)
  //   );

  //   const selectedIndustries = this.industryControl.value || [];
  //   this.filteredIndustries = [
  //     ...selectedIndustries
  //       .map((name: any) =>
  //         this.industries.find((industry) => industry.Type === name)
  //       )
  //       .filter(Boolean),
  //     ...filteredList.filter(
  //       (industry) => !selectedIndustries.includes(industry.Type)
  //     ),
  //   ];
  // }

  // get selectedCompanyCities(): string {
  //   const selected = this.CityControl.value;
  //   return selected ? selected.join(", ") : "";
  // }

  // get selectedIndustries(): string {
  //   const selected = this.industryControl.value;
  //   return selected ? selected.join(", ") : "";
  // }
  // get selectedCompanySize(): string {
  //   const selected = this.companySizeControl.value;
  //   return selected ? selected.join(", ") : "";
  // }

  // onCityDropdownOpen() {
  //   this.filterCities(this.searchCity);
  // }

  // onIndustryDropdownOpen() {
  //   this.filterIndustries(this.searchIndustry);
  // }

  // _filterCities(value: string): any[] {
  //   const filterValue = value.toLowerCase();
  //   return this.companies.filter((option) =>
  //     option.City.toLowerCase().includes(filterValue)
  //   );
  // }

  // _filterIndustries(value: string): any[] {
  //   const filterValue = value.toLowerCase();
  //   return this.industries.filter((option) =>
  //     option.Type.toLowerCase().includes(filterValue)
  //   );
  // }

  // resetIndustrySelection() {
  //   this.industryControl.reset();
  //   this.searchIndustry = "";
  //   this.filteredCompanies = this.companies;
  //   this.dataSource.data = this.filteredCompanies;
  // }

  // resetLocationSelection() {
  //   this.CityControl.reset();
  //   this.searchCity = "";
  //   this.filteredCompanies = this.companies;
  //   this.dataSource.data = this.filteredCompanies;
  // }

  // showIndustryResults() {
  //   const selectedIndustries = this.industryControl.value;
  //   if (selectedIndustries && selectedIndustries.length > 0) {
  //     this.filteredCompanies = this.companies.filter((company) =>
  //       company.Companyindustries.some((ci: any) =>
  //         selectedIndustries.includes(ci.Industry.Type)
  //       )
  //     );
  //   } else {
  //     this.filteredCompanies = this.companies;
  //   }
  //   this.dataSource.data = this.filteredCompanies;
  // }

  // showLocationResults() {
  //   const selectedCities = this.CityControl.value;
  //   if (selectedCities && selectedCities.length > 0) {
  //     this.filteredCompanies = this.companies.filter((company) =>
  //       selectedCities.includes(company.City)
  //     );
  //   } else {
  //     this.filteredCompanies = this.companies;
  //   }

  //   this.dataSource.data = this.filteredCompanies;
  // }

  extractIndustriesFromCompanies(companies: any[]): Industry[] {
    const industriesSet = new Set();
    companies.forEach((company) => {
      company.Companyindustries.forEach((ci: any) => {
        industriesSet.add(ci.Industry);
      });
    });
    return Array.from(industriesSet) as Industry[];
  }

  goToInterviewStudentsDetails(id: number) {
    if (this.UserRoleId === 1 || this.UserRoleId === 2) {
      this.router.navigate(["interview/interview-students-list", id]);
    }
  }

  viewInterviewDetails(id: number) {
    // Navigate to interview details page (to be implemented)
    console.log("View details for interview ID:", id);
  }

  openInterviewAdditionalFilter() {
    this.dialog.open(InterviewAdditionalFilterComponent, {
      width: "500px",
      height: "600px",
    });
  }

  openOfferManagement() {
    this.router.navigate(["offer-management/offer-management-details"]);
  }

  // filteredCompanies: companyTableList[] = [];
  // filteredCompany: Observable<any[]> = of([]);
  // filteredCities: Observable<any[]> = of([]);
  // filteredCompanySize: Observable<string[]> = of([]);
  // filteredIndustries: Industry[] = [];
  // filteredIndutry: Observable<any[]> = of([]);

  // searchCompany: string = "";
  // searchCity: string = "";
  // searchIndustry: string = "";

  // CityControl = new FormControl();
  // industryControl = new FormControl();
  // companySizeControl = new FormControl();
  // experienceLevelControl = new FormControl();
  // companyControl = new FormControl();

  // CityFilterControl = new FormControl();
  // industryFilterControl = new FormControl();
  // companySizeFilterControl = new FormControl();

  // dataSource = new MatTableDataSource<companyTableList>([]);
}
