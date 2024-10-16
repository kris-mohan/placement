import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
} from "@angular/core";
import { Router, withDebugTracing } from "@angular/router";
import { APIService } from "src/app/services/api-services/api-services";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { MatTableDataSource } from "@angular/material/table";
import { CommonModule, Location } from "@angular/common";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { MatDialog } from "@angular/material/dialog";
import { map, Observable, of, startWith } from "rxjs";
import { FormControl, FormGroup } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatPaginator } from "@angular/material/paginator";
import { MatPaginatorModule } from "@angular/material/paginator";
import { CompanyAPIService } from "src/app/features/company-configuration/company-config/companies/api.companies";
import {
  companyTableList,
  Industry,
} from "src/app/features/company-configuration/company-config/companies/companies-model";
import { CompanyDetailDialogModalComponent } from "src/app/features/company-configuration/company-config/companies/company-detail-dialog-modal/company-detail-dialog-modal.component";
import { ImportCompanyDialogComponent } from "src/app/features/company-configuration/company-config/companies/import-company-dialog/import-company-dialog.component";
import { IndustryAPIService } from "src/app/features/company-configuration/company-config/industry/api.industry";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { provideNativeDateAdapter } from "@angular/material/core";

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

export interface ODataResponse<T> {
  value: T[];
}

@Component({
  selector: "app-placement-company",
  standalone: true,
  imports: [
    AMGModules,
    CommonModule,
    SharedModule,
    MatPaginatorModule,
    MatDatepickerModule,
  ],
  templateUrl: "./placement-company.component.html",
  styleUrl: "./placement-company.component.css",
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlacementCompanyComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  companies: companyTableList[] = [];

  industries: Industry[] = [];

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

  experienceLevel: string[] = ["Lateral", "Intern", "Fresher", "Contract"];

  filteredCompanies: companyTableList[] = [];
  filteredCompany: Observable<any[]> = of([]);
  filteredCities: Observable<any[]> = of([]);
  filteredCompanySize: Observable<string[]> = of([]);
  filteredIndustries: Industry[] = [];
  filteredIndutry: Observable<any[]> = of([]);

  searchCompany: string = "";
  searchCity: string = "";
  searchIndustry: string = "";
  userType: number;

  CityControl = new FormControl();
  industryControl = new FormControl();
  companySizeControl = new FormControl();
  experienceLevelControl = new FormControl();
  companyControl = new FormControl();

  CityFilterControl = new FormControl();
  industryFilterControl = new FormControl();
  companySizeFilterControl = new FormControl();

  readonly dialog = inject(MatDialog);
  constructor(
    private router: Router,
    private sweetAlertService: SweetAlertService,
    private location: Location,
    private apiCompanyService: CompanyAPIService,
    private apiIndustryService: IndustryAPIService
  ) {
    const storedUserType = sessionStorage.getItem("userType");
    this.userType = storedUserType ? parseInt(storedUserType) : 0;
  }

  readonly campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });
  displayedColumns: string[] = [
    // "Url",
    // "Name",
    // "ContactPerson",
    // "City",
    // "ZipCode",
    // "Actions",
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
  dataSource = new MatTableDataSource<companyTableList>([]);

  companiesCard = [
    {
      Id: 1,
      logo: "../../../../assets/images/Softserve-logo1.png",
      name: "Haier Appliances",
      rating: 4.1,
      reviews: "1.3K+ reviews",
      type: "Foreign MNC",
      Companylocation: "Mysore",
      industrysize: 600,
      numberOfJobs: 30,
      CompanyPhone: 12345678,
      Email: "hr@HaierAppliance.com",
      URL: "HaierAppliance.com",
    },
    {
      Id: 2,
      logo: "../../../../assets/images/Softserve-logo1.png",
      name: "Sony Electronics",
      rating: 4.5,
      reviews: "2K+ reviews",
      type: "Foreign MNC",
      Companylocation: "Chennai",
      industrysize: 1600,
      numberOfJobs: 30,
      CompanyPhone: 12345678,
      Email: "hr@Sonyelectronics.com",
      URL: "Sonyelectronics.com",
    },
    {
      Id: 3,
      logo: "../../../../assets/images/Softserve-logo1.png",
      name: "Samsung Tech",
      rating: 4.2,
      reviews: "1.5K+ reviews",
      type: "Foreign MNC",
      Companylocation: "Mumbai",
      industrysize: 4600,
      numberOfJobs: 30,
      CompanyPhone: 12345678,
      Email: "hr@SamsungTech.com",
      URL: "Samsungtech.com",
    },
    {
      Id: 4,
      logo: "../../../../assets/images/Softserve-logo1.png",
      name: "LG Electronics",
      rating: 4.3,
      reviews: "1.8K+ reviews",
      type: "Foreign MNC",
      Companylocation: "Hyderabad",
      industrysize: 450,
      numberOfJobs: 30,
      CompanyPhone: 12345678,
      Email: "hr@HaierAppliance.com",
      URL: "HaierAppliance.com",
    },
    {
      Id: 5,
      logo: "../../../../assets/images/Softserve-logo1.png",
      name: "Apple Inc.",
      rating: 4.8,
      reviews: "3K+ reviews",
      type: "Foreign MNC",
      Companylocation: "Bengaluru",
      industrysize: 350,
      numberOfJobs: 30,
      CompanyPhone: 12345678,
      Email: "hr@apple.com",
      URL: "Apple.com",
    },
    {
      Id: 6,
      logo: "../../../../assets/images/Softserve-logo1.png",
      name: "Microsoft Corp.",
      rating: 4.7,
      reviews: "2.7K+ reviews",
      type: "Foreign MNC",
      Companylocation: "Delhi",
      industrysize: 1400,
      numberOfJobs: 30,
      CompanyPhone: 12345678,
      Email: "hr@microsoft.com",
      URL: "microsoft.com",
    },
    {
      Id: 7,
      logo: "../../../../assets/images/Softserve-logo1.png",
      name: "Google LLC",
      rating: 4.9,
      reviews: "5K+ reviews",
      type: "Foreign MNC",
      Companylocation: "Bengaluru",
      industrysize: 500,
      numberOfJobs: 30,
      CompanyPhone: 12345678,
      Email: "hr@google.com",
      URL: "google.com",
    },
    {
      Id: 8,
      logo: "../../../../assets/images/Softserve-logo1.png",
      name: "Facebook Inc.",
      rating: 4.6,
      reviews: "2.2K+ reviews",
      type: "Foreign MNC",
      Companylocation: "Kolkata",
      industrysize: 400,
      numberOfJobs: 30,
      CompanyPhone: 12345678,
      Email: "hr@facebook.com",
      URL: "facebook.com",
    },
    {
      Id: 9,
      logo: "../../../../assets/images/Softserve-logo1.png",
      name: "Amazon Web Services",
      rating: 4.4,
      reviews: "2.5K+ reviews",
      type: "Foreign MNC",
      Companylocation: "Hyderabad",
      industrysize: 300,
      numberOfJobs: 30,
      CompanyPhone: 123456788,
      Email: "hr@amazon.com",
      URL: "amazon.com",
    },
    {
      Id: 10,
      logo: "../../../../assets/images/Softserve-logo1.png",
      name: "Tesla Inc.",
      rating: 4.7,
      reviews: "2.8K+ reviews",
      type: "Foreign MNC",
      Companylocation: "Bengaluru",
      industrysize: 400,
      numberOfJobs: 30,
      CompanyPhone: 123456789,
      Email: "hr@tesla.com",
      URL: "tesla.com",
    },
  ];

  ngOnInit() {
    this.loadCompanies();
    this.loadIndustries();

    this.dataSource.paginator = this.paginator;

    this.CityControl.valueChanges.subscribe(() => {
      this.filterCities(this.searchCity);
    });

    this.industryControl.valueChanges.subscribe(() => {
      this.filterIndustries(this.searchIndustry);
    });

    this.filteredCities = this.CityFilterControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filterCities(value))
    );
    this.filteredIndutry = this.industryFilterControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filterIndustries(value))
    );

    this.filteredCompany = this.companyControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filterCompanies(value))
    );
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

  loadCompanies() {
    this.apiCompanyService.loadCompanyData().subscribe({
      next: (response: ODataResponse<companyTableList>) => {
        console.log("API Response:", response);
        this.dataSource.data = response.value;
        this.companies = response.value;
        this.industries = this.extractIndustriesFromCompanies(this.companies);
        this.filteredIndustries = this.industries;
      },
      error: (error) => {
        console.error("Error loading companies", error);
      },
    });
  }

  loadIndustries() {
    this.apiIndustryService.loadIndustryData().subscribe({
      next: (response: ODataResponse<any>) => {
        console.log("API Response:", response);
        this.industries = response.value;
      },
      error: (error) => {
        console.error("Error loading Industries", error);
      },
    });
  }
  openAddEditCompanyForm(id?: number) {
    if (id !== null && id !== undefined) {
      this.router.navigate(["/placement-company/add-edit-company/", id]);
    } else {
      this.router.navigate(["/placement-company/add-edit-company/", 0]);
    }
  }

  async deleteCompany(id: number) {
    const confirmed = await this.sweetAlertService.confirmDelete(
      "Do you really want to delete this Company?"
    );

    if (confirmed) {
      this.apiCompanyService.deleteCompany(id).subscribe({
        next: (response: { success: boolean; message: string }) => {
          if (response.success) {
            this.sweetAlertService.success(response.message);
            this.loadCompanies();
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
    }
  }

  openJdDetails(id: number) {}

  goBack(): void {
    this.location.back();
  }

  openImportCompanyDialog() {
    this.dialog.open(ImportCompanyDialogComponent, {
      width: "500px",
      height: "600px",
    });
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

  get selectedCompanyCities(): string {
    const selected = this.CityControl.value;
    return selected ? selected.join(", ") : "";
  }

  get selectedIndustries(): string {
    const selected = this.industryControl.value;
    return selected ? selected.join(", ") : "";
  }
  get selectedCompanySize(): string {
    const selected = this.companySizeControl.value;
    return selected ? selected.join(", ") : "";
  }

  onCityDropdownOpen() {
    this.filterCities(this.searchCity);
  }

  onIndustryDropdownOpen() {
    this.filterIndustries(this.searchIndustry);
  }

  _filterCities(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.companies.filter((option) =>
      option.City.toLowerCase().includes(filterValue)
    );
  }

  _filterIndustries(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.industries.filter((option) =>
      option.Type.toLowerCase().includes(filterValue)
    );
  }

  resetIndustrySelection() {
    this.industryControl.reset();
    this.searchIndustry = "";
    this.filteredCompanies = this.companies;
    this.dataSource.data = this.filteredCompanies;
  }

  resetLocationSelection() {
    this.CityControl.reset();
    this.searchCity = "";
    this.filteredCompanies = this.companies;
    this.dataSource.data = this.filteredCompanies;
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
    this.dataSource.data = this.filteredCompanies;
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

    this.dataSource.data = this.filteredCompanies;
  }

  extractIndustriesFromCompanies(companies: any[]): Industry[] {
    const industriesSet = new Set();
    companies.forEach((company) => {
      company.Companyindustries.forEach((ci: any) => {
        industriesSet.add(ci.Industry);
      });
    });
    return Array.from(industriesSet) as Industry[];
  }

  goToCompanyJobDetails(id: number) {
    this.router.navigate([
      "placement-company/placement-company-job-details/",
      id,
    ]);
  }

  onDelete(companyId: number, event: MouseEvent) {
    event.stopPropagation();
  }

  onEdit(id: number, event: MouseEvent) {
    event.stopPropagation();
    this.router.navigate(["placement-company/add-edit-company/", id]);
  }
}
