import { AMGModules } from "src/AMG-Module/AMG-module";
import { CommonModule, Location } from "@angular/common";
import { Component, Inject, inject, signal } from "@angular/core";
import { ThemePalette } from "@angular/material/core";
import { Router, ActivatedRoute } from "@angular/router";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { StudentdetailsDialogComponent } from "src/app/features/placement-cell/placement-cell/studentdetails-dialog/studentdetails-dialog.component";
import { Studentacademic } from "src/app/services/types/Studentacademic";
import { StudentEligibleApiService } from "../JobEligibleApiService";
import { MatTableDataSource } from "@angular/material/table";
import { Jobposting } from "src/app/services/types/Jobposting";
import { JobEligibleStudentApiService } from "./jobEligibleStudentsApiService";

export interface ODataResponse<T> {
  value: T[];
}

@Component({
  selector: "app-job-eligible-students-modal",
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: "./job-eligible-students-modal.component.html",
  styleUrl: "./job-eligible-students-modal.component.css",
})
export class JobEligibleStudentsModalComponent {
  readonly dialog = inject(MatDialog);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  displayedColumns: string[] = [
    "StudentID",
    "StudentName",
    "DegreeName",
    "CollegeName",
    "Branch",
    "Batch",
    "JobeRole",
    "CGPA",
    "Status",
    "resume",
  ];
  columns = [
    { key: "StudentID", label: "Student ID" },
    { key: "StudentName", label: "Student Name" },
    { key: "DegreeName", label: "Degree" },
    { key: "CollegeName", label: "College Name" },
    { key: "Branch", label: "Branch" },
    { key: "Batch", label: "Batch" },
    { key: "JobeRole", label: "Jobe Role" },
    { key: "CGPA", label: "CGPA" },
    { key: "Status", label: "Status" },
    { key: "resume", label: "Resume" },
  ];

  status: string[] = ["Invite", "Accepted", "Invited", "Rejected", "Pending"];
  branches: string[] = [
    "Computer Science",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Civil Engineering",
    "Information Technology",
  ];
  batches: number[] = [2019, 2020, 2021, 2022];

  statusControl = new FormControl<string[]>(["Accepted"]);
  branchControl = new FormControl<string[] | null>(null);
  batchControl = new FormControl<any[] | null>(null);
  searchControl = new FormControl("");

  studentsDetails = new MatTableDataSource<{}>([]);

  ngOnInit() {
    this.getAllStudents();
  }

  getChipStyle(action: string): any {
    switch (action) {
      case "Invite":
        return { "background-color": "#bee2e9", color: "white !important" };
      case "Accepted":
        return { "background-color": "#9aee9a", color: "white" };
      case "Invited":
        return { "background-color": "#8cade2", color: "white" };
      case "Rejected":
        return { "background-color": "#fb6767", color: "white" };
      case "Pending":
        return { "background-color": "grey", color: "white" };
      default:
        return { "background-color": "blue", color: "white" };
    }
  }

  getBadgeColor(action: string): ThemePalette {
    switch (action) {
      case "Invite":
        return "primary";
      case "Accepted":
        return "accent";
      case "Invited":
        return "warn";
      case "Rejected":
      case "Blocked":
        return "warn";
      default:
        return "primary";
    }
  }

  goBack(): void {
    this.location.back();
  }

  getAllStudents = () => {
    const studentDetails = this.data.value.map((studentRecord: any) => ({
      StudentID: studentRecord.Id,
      StudentName: `${studentRecord.FirstName} ${studentRecord.LastName}`,
      DegreeName: studentRecord.Studentacademics[0]?.Course?.Name ?? "",
      CollegeName: "MSRIT",
      Branch: studentRecord.Studentacademics[0]?.Stream?.Name ?? "",
      Batch: studentRecord.Batch?.Name ?? "",
      JobeRole: "Developer",
      CGPA: studentRecord.Studentacademics[0]?.Cgpa ?? "",
      Status: "Active",
      resume: "",
    }));

    this.studentsDetails.data = studentDetails;
  };
}
