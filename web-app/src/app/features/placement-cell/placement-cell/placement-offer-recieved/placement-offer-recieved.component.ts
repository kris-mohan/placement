import { CommonModule, Location } from "@angular/common";
import { Component, inject, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { map, Observable, of, startWith } from "rxjs";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { CompanyAPIService } from "src/app/features/company-configuration/company-config/companies/api.companies";
import {
  companyTableList,
  Industry,
} from "src/app/features/company-configuration/company-config/companies/companies-model";
import { CompanyDetailDialogModalComponent } from "src/app/features/company-configuration/company-config/companies/company-detail-dialog-modal/company-detail-dialog-modal.component";
import { IndustryAPIService } from "src/app/features/company-configuration/company-config/industry/api.industry";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { ODataResponse } from "../eligible-students-list/eligible-students-list.component";
import { PlacementInterviewAdditionalFilterComponent } from "../placement-interview/placement-interview-additional-filter/placement-interview-additional-filter.component";
import { MatTableDataSource } from "@angular/material/table";

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: "app-placement-offer-recieved",
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: "./placement-offer-recieved.component.html",
  styleUrl: "./placement-offer-recieved.component.css",
})
export class PlacementOfferRecievedComponent {
  constructor(
    private router: Router,
    private sweetAlertService: SweetAlertService,
    private location: Location,
    private apiCompanyService: CompanyAPIService,
    private apiIndustryService: IndustryAPIService
  ) {
    const storedUserRoleId = sessionStorage.getItem("userRoleId");
    this.UserRoleId = storedUserRoleId ? parseInt(storedUserRoleId) : 0;
  }
  readonly campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });

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
  UserRoleId: number;

  CityControl = new FormControl();
  industryControl = new FormControl();
  companySizeControl = new FormControl();
  experienceLevelControl = new FormControl();
  companyControl = new FormControl();

  CityFilterControl = new FormControl();
  industryFilterControl = new FormControl();
  companySizeFilterControl = new FormControl();

  readonly dialog = inject(MatDialog);
  jobsCard = [
    {
      Id: 1,
      logo: "../../../../../assets/images/Softserve-logo1.png",
      name: "Samsung Tech",
      title: "Software Engineer",
      experience: "0 - 2 years",
      salary: "₹6 - 8 LPA",
      location: "Bengaluru",
      shift: "Day Shift",
      modeOfWork: "Hybrid",
      numberOfOpenings: 10,
      // applicants: 100,
      type: "MNC",
      Skills: "Node, React",
    },
    {
      Id: 2,
      logo: "../../../../assets/images/Softserve-logo1.png",
      name: "Samsung Tech",
      title: "Data Analyst",
      experience: "1 - 3 years",
      salary: "₹4 - 6 LPA",
      location: "Hyderabad",
      shift: "Day Shift",
      modeOfWork: "Remote",
      numberOfOpenings: 5,
      // applicants: 80,
      type: "MNC",
      Skills: "Node, React",
    },
    {
      Id: 3,
      logo: "../../../../assets/images/Softserve-logo1.png",
      name: "Samsung Tech",
      title: "Product Manager",
      experience: "3 - 5 years",
      salary: "₹12 - 15 LPA",
      location: "Mumbai",
      shift: "Day Shift",
      modeOfWork: "On-site",
      numberOfOpenings: 3,
      // applicants: 50,
      type: "MNC",
      Skills: "Node, React",
    },
    {
      Id: 4,
      logo: "../../../../assets/images/Softserve-logo1.png",
      name: "Samsung Tech",
      title: "HR Executive",
      experience: "0 - 1 year",
      salary: "₹3 - 5 LPA",
      location: "Delhi",
      shift: "Day Shift",
      modeOfWork: "Hybrid",
      numberOfOpenings: 7,
      // applicants: 120,
      type: "MNC",
      Skills: "Node, React",
    },
    {
      Id: 5,
      logo: "../../../../assets/images/Softserve-logo1black.png",
      name: "Samsung Tech",
      title: "Marketing Specialist",
      experience: "2 - 4 years",
      salary: "₹7 - 9 LPA",
      location: "Pune",
      shift: "Day Shift",
      modeOfWork: "On-site",
      numberOfOpenings: 5,
      // applicants: 60,
      type: "MNC",
      Skills: "Node, React",
    },
    {
      Id: 6,
      logo: "../../../../assets/images/Softserve-logo1.png",
      name: "Samsung Tech",
      title: "Sales Manager",
      experience: "4 - 6 years",
      salary: "₹10 - 12 LPA",
      location: "Chennai",
      shift: "Day Shift",
      modeOfWork: "Remote",
      numberOfOpenings: 4,
      // applicants: 70,
      type: "MNC",
      Skills: "Node, React",
    },
    {
      Id: 7,
      logo: "../../../../assets/images/Softserve-logo1.png",
      name: "Samsung Tech",
      title: "Cloud Engineer",
      experience: "2 - 4 years",
      salary: "₹8 - 10 LPA",
      location: "Bengaluru",
      shift: "Night Shift",
      modeOfWork: "On-site",
      numberOfOpenings: 6,
      // applicants: 150,
      type: "MNC",
      Skills: "Node, React",
    },
    {
      Id: 8,
      logo: "../../../../assets/images/Softserve-logo1.png",
      name: "Samsung Tech",
      title: "UI/UX Designer",
      experience: "1 - 3 years",
      salary: "₹5 - 7 LPA",
      location: "Gurugram",
      shift: "Day Shift",
      modeOfWork: "Hybrid",
      numberOfOpenings: 5,
      // applicants: 90,
      type: "MNC",
      Skills: "Node, React",
    },
    {
      Id: 9,
      logo: "../../../../assets/images/Softserve-logo1.png",
      name: "Samsung Tech",
      title: "DevOps Engineer",
      experience: "3 - 5 years",
      salary: "₹10 - 14 LPA",
      location: "Noida",
      shift: "Night Shift",
      modeOfWork: "Remote",
      numberOfOpenings: 4,
      // applicants: 85,
      type: "MNC",
      Skills: "Node, React",
    },
    {
      Id: 10,
      logo: "../../../../assets/images/Softserve-logo1.png",
      name: "Samsung Tech",
      title: "Cybersecurity Specialist",
      experience: "5+ years",
      salary: "₹15 - 18 LPA",
      location: "Bengaluru",
      shift: "Day Shift",
      modeOfWork: "On-site",
      numberOfOpenings: 2,
      // applicants: 40,
      type: "MNC",
      Skills: "Node, React",
    },
  ];

  dataSource = new MatTableDataSource<companyTableList>([]);

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
      this.router.navigate(["/company-configuration/company", id]);
    } else {
      this.router.navigate(["/company-configuration/company", 0]);
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

  openPlacementinterviewAdditionalFilter() {
    this.dialog.open(PlacementInterviewAdditionalFilterComponent, {
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

  goToInterviewStudentsDetails(id: number) {
    if (this.UserRoleId === 1 || this.UserRoleId === 2) {
      this.router.navigate([
        "placement-interview/placement-interview-students/",
        id,
      ]);
    }
  }

  scheduledInterviews = [
    {
      id: 1,
      jobTitle: "Software Engineer",
      company: "Google",
      postedDate: "2024-07-01",
      applicationDeadline: new Date("2024-08-01"),
      status: "Upcoming",
      jobDescription:
        "We are seeking an experienced project manager to oversee our projects.",

      roundName: "Test Assesment 1",
      studentsCleared: 12,
      studentsRejected: 15,
      logo: "../../../../assets/images/Softserve-logo1.png",
    },
    {
      id: 2,
      jobTitle: "Data Scientist",
      company: "Facebook",
      date: "2024-09-28",
      status: "Upcoming",
      postedDate: "2024-07-01",
      applicationDeadline: new Date("2024-08-01"),
      jobDescription:
        "This is the first assessment to test the candidate's programming and problem-solving skills.",
      roundName: "Test Assesment 2",
      studentsCleared: 12,
      studentsRejected: 15,
      logo: "../../../../assets/images/Softserve-logo1.png",
    },
    {
      id: 3,
      jobTitle: "Product Manager",
      company: "Amazon",
      date: "2024-09-27",
      status: "Completed",
      postedDate: "2024-07-01",
      applicationDeadline: new Date("2024-08-01"),
      jobDescription:
        "The second assessment focuses on data science challenges and machine learning algorithms.",

      roundName: "Test Assesment 3",
      studentsCleared: 12,
      studentsRejected: 15,
      logo: "../../../../assets/images/Softserve-logo1.png",
    },
    {
      id: 4,
      jobTitle: "Web Developer",
      company: "Microsoft",
      date: "2024-09-29",
      status: "Ongoing",
      postedDate: "2024-07-01",
      applicationDeadline: new Date("2024-08-01"),
      jobDescription:
        "This assessment evaluates the candidate's ability to manage products and handle business cases.",

      roundName: "Technical Interview",
      studentsCleared: 12,
      studentsRejected: 15,
      logo: "../../../../assets/images/Softserve-logo1.png",
    },
    {
      id: 5,
      jobTitle: "UI/UX Designer",
      company: "Apple",
      date: "2024-09-26",
      status: "Ongoing",
      postedDate: "2024-07-01",
      applicationDeadline: new Date("2024-08-01"),
      jobDescription:
        "A technical interview to assess coding skills, system design, and problem-solving ability.",

      roundName: "HR Interview",
      studentsCleared: 12,
      studentsRejected: 15,
      logo: "../../../../assets/images/Softserve-logo1.png",
    },
  ];

  jobSummary = [
    { jobTitle: "Software Engineer", studentsCount: 1 },
    { jobTitle: "Data Scientist", studentsCount: 1 },
    { jobTitle: "Product Manager", studentsCount: 1 },
    { jobTitle: "Web Developer", studentsCount: 1 },
    { jobTitle: "UI/UX Designer", studentsCount: 1 },
  ];

  viewInterviewDetails(id: number) {
    // Navigate to interview details page (to be implemented)
    console.log("View details for interview ID:", id);
  }
}
