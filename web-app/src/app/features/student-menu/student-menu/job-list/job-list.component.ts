import { LiveAnnouncer } from "@angular/cdk/a11y";
import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { MatSort, Sort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { JOBS } from "./job-list-model";
import { FormControl } from "@angular/forms";
import { companyTableList } from "src/app/features/company-configuration/company-config/companies/companies-model";

export const CompanyListData: JOBS[] = [
  {
    CompanyId: 1,
    CompanyName: "Tech Innovators In  c.",
    JobName: "software Engineer",
    Package: "3.16LPA",
    Location: "New York, USA",
    Actions: "read_more",
  },
  {
    CompanyId: 2,
    CompanyName: "Global Solutions Ltd.",
    JobName: "software Engineer",
    Package: "3.16LPA",
    Location: "London, UK",
    Actions: "read_more",
  },
  {
    CompanyId: 3,
    CompanyName: "Creative Minds Co.",
    JobName: "software Engineer",
    Package: "3.16LPA",
    Location: "Sydney, Australia",
    Actions: "read_more",
  },
  {
    CompanyId: 4,
    CompanyName: "Future Tech Corp.",
    JobName: "software Engineer",
    Package: "3.16LPA",
    Location: "Berlin, Germany",
    Actions: "read_more",
  },
  {
    CompanyId: 5,
    CompanyName: "Pioneers in IT",
    JobName: "software Engineer",
    Package: "3.16LPA",
    Location: "San Francisco, USA",
    Actions: "read_more",
  },
];
@Component({
  selector: "app-job-list",
  standalone: true,
  imports: [
    AMGModules,
    SharedModule,
    CommonModule,
    MatSortModule,
    MatTableModule,
  ],
  templateUrl: "./job-list.component.html",
  styleUrl: "./job-list.component.css",
})
export class JobListComponent {
  companies: companyTableList[] = [];

  constructor(
    private router: Router,
    private sweetAlertService: SweetAlertService,
    private location: Location,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  displayedColumns: string[] = [
    "CompanyId",
    "CompanyName",
    "JobName",
    "Package",
    "Location",
    "Actions",
  ];
  columns = [
    { key: "CompanyId", label: "Company Id" },
    { key: "CompanyName", label: "Company Name" },
    { key: "JobName", label: "Job Name" },
    { key: "Package", label: "Package" },
    { key: "Location", label: "Location" },
    { key: "Actions", label: "Actions" },
  ];
  dataSource = new MatTableDataSource<JOBS>(CompanyListData);
  selection = new SelectionModel<JOBS>(true, []);
  @ViewChild(MatSort) sort!: MatSort;

  filteredCompanies: companyTableList[] = [];

  CityControl = new FormControl();

  searchCity: string = "";

  onCityDropdownOpen() {
    this.filterCities(this.searchCity);
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

  get selectedCompanyCities(): string {
    const selected = this.CityControl.value;
    return selected ? selected.join(", ") : "";
  }

  resetLocationSelection() {
    this.CityControl.reset();
    this.searchCity = "";
    this.filteredCompanies = this.companies;
    // this.dataSource.data = this.filteredCompanies;
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

    // this.dataSource.data = this.filteredCompanies;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce("Sorting cleared");
    }
  }

  openJobDetails(id?: number) {
    if (id !== undefined) {
      this.router.navigate(["/job-list", id]);
    } else {
      this.router.navigate(["/job-list", "#"]);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
