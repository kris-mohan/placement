import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { ScheduleTableList } from "./schedules-model";

export const ScheduleTableList_Data: ScheduleTableList[] = [
  {
    slNo: 1,
    scheduleId: 301,
    description:
      "Admin role with full access to all system features and settings.",
    createdDate: "2024-07-01",
    actions: "View, Edit, Delete",
  },
  {
    slNo: 2,
    scheduleId: 302,
    description:
      "Manager role with access to project management and team oversight tools.",
    createdDate: "2024-07-05",
    actions: "View, Edit, Delete",
  },
  {
    slNo: 3,
    scheduleId: 303,
    description:
      "Developer role with permissions to access code repositories and development tools.",
    createdDate: "2024-07-10",
    actions: "View, Edit, Delete",
  },
  {
    slNo: 4,
    scheduleId: 304,
    description:
      "Analyst role with access to data analysis and reporting features.",
    createdDate: "2024-07-15",
    actions: "View, Edit, Delete",
  },
  {
    slNo: 5,
    scheduleId: 305,
    description:
      "Support role with permissions to access customer support and ticketing systems.",
    createdDate: "2024-07-20",
    actions: "View, Edit, Delete",
  },
];

@Component({
  selector: "app-schedules",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./schedules.component.html",
  styleUrl: "./schedules.component.css",
})
export class SchedulesComponent {
  displayedColumns: string[] = [
    "slNo",
    "scheduleId",
    "description",
    "createdDate",
    "actions",
  ];

  columns = [
    { key: "slNo", label: "Sl No" },
    { key: "scheduleId", label: "scheduleId" },
    { key: "description", label: "description" },
    { key: "createdDate", label: "createdDate" },
    { key: "actions", label: "Actions" },
  ];

  dataSource = new MatTableDataSource<ScheduleTableList>(
    ScheduleTableList_Data
  );
  selection = new SelectionModel<ScheduleTableList>(true, []);

  constructor(private router: Router, private location: Location) {}

  openAddEditScheduleForm(scheduleId?: number) {
    const id = scheduleId !== undefined ? scheduleId : 0;
    this.router.navigate(["training-configuration", id], {
      queryParams: { from: "schedules" },
    });
  }

  goBack(): void {
    this.location.back();
  }
}
