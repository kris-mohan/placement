import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router, ActivatedRoute } from "@angular/router";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { Colleges } from "./colleges-model";

export const COLLEGES_DATA: Colleges[] = [
  {
    collegeId: 1,
    collegeName: "Springfield University",
    location: "Springfield, IL",
    studentRegistered: 20,
    studentInvited: 40,
    batch: "2024",
    branch: "Computer Science",
  },
  {
    collegeId: 2,
    collegeName: "Riverdale College",
    location: "Riverdale, NY",
    studentRegistered: 20,
    studentInvited: 40,
    batch: "2023",
    branch: "Mechanical Engineering",
  },
  {
    collegeId: 3,
    collegeName: "Hill Valley Institute of Technology",
    location: "Hill Valley, CA",
    batch: "2025",
    branch: "Electrical Engineering",
    studentRegistered: 20,
    studentInvited: 40,
  },
  {
    collegeId: 4,
    collegeName: "Bayside University",
    location: "Bayside, FL",
    batch: "2022",
    branch: "Business Administration",
    studentRegistered: 20,
    studentInvited: 40,
  },
  {
    collegeId: 5,
    collegeName: "Greendale Community College",
    location: "Greendale, CO",
    batch: "2024",
    branch: "Liberal Arts",
    studentRegistered: 20,
    studentInvited: 40,
  },
];

@Component({
  selector: "app-colleges",
  standalone: true,
  imports: [AMGModules, SharedModule, CommonModule],
  templateUrl: "./colleges.component.html",
  styleUrl: "./colleges.component.css",
})
export class CollegesComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService,
    private location: Location,
  ) {}

  displayedColumns: string[] = [
    // "collegeId",
    "collegeName",
    "location",
    "studentRegistered",
    "studentInvited",
    "actions",
  ];

  columns = [
    // { key: "collegeId", label: "college ID" },
    { key: "collegeName", label: "College Name" },
    { key: "location", label: "Location" },
    { key: "studentRegistered", label: "Total number of Students Registered" },
    { key: "studentInvited", label: "Total number of Students Invited" },
    { key: "actions", label: "Actions" },
  ];

  dataSource = new MatTableDataSource<Colleges>(COLLEGES_DATA);
  selection = new SelectionModel<Colleges>(true, []);

  openJobList(collegeId?: number) {
    if (collegeId !== undefined && collegeId !== null) {
      this.router.navigate(["test-interviews", collegeId]);
    } else {
      this.router.navigate(["test-interviews", 0]);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
