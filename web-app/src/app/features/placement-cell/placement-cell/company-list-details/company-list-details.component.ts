import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { companyList } from "./company-list-details-model";

export const CompanyListData: companyList[] = [
  {
    CompanyId: 1,
    CompanyName: "Tech Innovators Inc.",
    Location: "New York, USA",
    studentRegistered: 20,
    studentInvited: 40,
    Actions: "Edit | Delete",
  },
  {
    CompanyId: 2,
    CompanyName: "Global Solutions Ltd.",
    Location: "London, UK",
    studentRegistered: 20,
    studentInvited: 40,
    Actions: "Edit | Delete",
  },
  {
    CompanyId: 3,
    CompanyName: "Creative Minds Co.",
    Location: "Sydney, Australia",
    studentRegistered: 20,
    studentInvited: 40,
    Actions: "Edit | Delete",
  },
  {
    CompanyId: 4,
    CompanyName: "Future Tech Corp.",
    Location: "Berlin, Germany",
    studentRegistered: 20,
    studentInvited: 40,
    Actions: "Edit | Delete",
  },
  {
    CompanyId: 5,
    CompanyName: "Pioneers in IT",
    Location: "San Francisco, USA",
    studentRegistered: 20,
    studentInvited: 40,
    Actions: "Edit | Delete",
  },
];

@Component({
  selector: "app-company-list-details",
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: "./company-list-details.component.html",
  styleUrl: "./company-list-details.component.css",
})
export class CompanyListDetailsComponent {
  constructor(
    private router: Router,
    private sweetAlertService: SweetAlertService,
    private location: Location,
  ) {}
  displayedColumns: string[] = [
    // "CompanyId",
    "CompanyName",
    "Location",
    "studentRegistered",
    "studentInvited",
    "Actions",
  ];
  columns = [
    // { key: "CompanyId", label: "Company Id" },
    { key: "CompanyName", label: "Company Name" },
    { key: "Location", label: "Location" },
    { key: "studentRegistered", label: "Total number of Students Registered" },
    { key: "studentInvited", label: "Total number of Students Invited" },
    { key: "Actions", label: "Actions" },
  ];
  dataSource = new MatTableDataSource<companyList>(CompanyListData);
  selection = new SelectionModel<companyList>(true, []);

  openJobDetails(id?: number) {
    if (id !== undefined) {
      this.router.navigate(["/company-lists", id]);
    } else {
      this.router.navigate(["/company-lists", "#"]);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
