import { LiveAnnouncer } from "@angular/cdk/a11y";
import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { MatSort, Sort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { APIService } from "src/app/services/api-services/api-services";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { JOBS } from "./job-list-model";

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
  constructor(
    private router: Router,
    private sweetAlertService: SweetAlertService,
    private location: Location,
    private apiService: APIService,
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
