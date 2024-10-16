import { AMGModules } from "src/AMG-Module/AMG-module";
import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ThemePalette } from "@angular/material/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router, ActivatedRoute } from "@angular/router";
import { PeriodicElement } from "src/app/features/customers/customer-list/customer-list.component";
import { APIService } from "src/app/services/api-services/api-services";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { jobEligibleStudent } from "./job-eligible-students-model";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { StudentdetailsDialogComponent } from "src/app/features/placement-cell/placement-cell/studentdetails-dialog/studentdetails-dialog.component";
export interface ODataResponse<T> {
  value: T[];
}
export const JobEligibleStudent: jobEligibleStudent[] = [
  {
    StudentID: 1,
    StudentName: "John Doe",
    DegreeName: "BE",
    CollegeName: "Malnad Collge Of Engineeirng ",
    Branch: "Computer Science",
    JobeRole: "Software Engineer",
    Batch: "2021",
    CGPA: "9.2",
    Status: "Invite",
    resume: "View",
  },
  {
    StudentID: 2,
    StudentName: "Jane Smith",
    DegreeName: "BE",
    CollegeName: "Malnad Collge Of Engineeirng ",
    Branch: "Civil Engineering",
    JobeRole: "Software Engineer",
    Batch: "2020",
    CGPA: "8.7",
    Status: "Accepted",
    resume: "View",
  },
  {
    StudentID: 3,
    StudentName: "Michael Johnson",
    DegreeName: "BE",
    CollegeName: "Malnad Collge Of Engineeirng ",
    Branch: "Electrical Engineering",
    JobeRole: "Software Engineer",
    Batch: "2019",
    CGPA: "8.9",
    Status: "Invited",
    resume: "View",
  },
  {
    StudentID: 4,
    StudentName: "Emily Davis",
    DegreeName: "BE",
    CollegeName: "Malnad Collge Of Engineeirng ",
    Branch: "Civil Engineering",
    JobeRole: "Software Engineer",
    Batch: "2022",
    CGPA: "9.1",
    Status: "Rejected",
    resume: "View",
  },
  {
    StudentID: 5,
    StudentName: "William Brown",
    DegreeName: "BE",
    CollegeName: "Malnad Collge Of Engineeirng ",
    Branch: "Information Technology",
    JobeRole: "Software Engineer",
    Batch: "2021",
    CGPA: "9.4",
    Status: "Pending",
    resume: "View",
  },
  {
    StudentID: 1,
    StudentName: "John Doe",
    DegreeName: "BE",
    CollegeName: "Malnad Collge Of Engineeirng ",
    Branch: "Computer Science",
    JobeRole: "Software Engineer",
    Batch: "2021",
    CGPA: "9.2",
    Status: "Invite",
    resume: "View",
  },
  {
    StudentID: 2,
    StudentName: "Jane Smith",
    DegreeName: "BE",
    CollegeName: "Malnad Collge Of Engineeirng ",
    Branch: "Mechanical Engineering",
    JobeRole: "Software Engineer",
    Batch: "2020",
    CGPA: "8.7",
    Status: "Accepted",
    resume: "View",
  },
  {
    StudentID: 3,
    StudentName: "Michael Johnson",
    DegreeName: "BE",
    CollegeName: "Malnad Collge Of Engineeirng ",
    Branch: "Electrical Engineering",
    JobeRole: "Software Engineer",
    Batch: "2019",
    CGPA: "8.9",
    Status: "Invited",
    resume: "View",
  },
  {
    StudentID: 4,
    StudentName: "Emily Davis",
    DegreeName: "BE",
    CollegeName: "Malnad Collge Of Engineeirng ",
    Branch: "Civil Engineering",
    JobeRole: "Software Engineer",
    Batch: "2022",
    CGPA: "9.1",
    Status: "Rejected",
    resume: "View",
  },
  {
    StudentID: 5,
    StudentName: "William Brown",
    DegreeName: "BE",
    CollegeName: "Malnad Collge Of Engineeirng ",
    Branch: "Information Technology",
    JobeRole: "Software Engineer",
    Batch: "2021",
    CGPA: "9.4",
    Status: "Pending",
    resume: "View ",
  },
];
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
    private router: Router,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService,
    private location: Location,
    private apiService: APIService
  ) {}

  displayedColumns: string[] = [
    "select",
    // "StudentID",
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

  dataSource = new MatTableDataSource<jobEligibleStudent>(JobEligibleStudent);
  selection = new SelectionModel<jobEligibleStudent>(true, []);

  ngOnInit() {
    this.dataSource.filterPredicate = (
      data: jobEligibleStudent,
      filter: string
    ) => {
      if (!filter) {
        return true;
      }
      const [statusFilter, branchFilter, batchFilter, searchFilter] =
        filter.split("|");
      const statusArray = statusFilter ? statusFilter.split(",") : [];
      const branchArray = branchFilter ? branchFilter.split(",") : [];
      const batchArray = batchFilter ? batchFilter.split(",") : [];
      const searchString = searchFilter ? searchFilter.toLowerCase() : "";

      const statusMatch =
        statusArray.length === 0 || statusArray.includes(data.Status);
      const branchMatch =
        branchArray.length === 0 || branchArray.includes(data.Branch);
      const batchMatch =
        batchArray.length === 0 || batchArray.includes(data.Batch);
      const searchMatch =
        !searchString || data.StudentName.toLowerCase().includes(searchString);

      return statusMatch && branchMatch && batchMatch && searchMatch;
    };

    this.statusControl.valueChanges.subscribe(() => {
      this.applyFilter();
    });

    this.branchControl.valueChanges.subscribe(() => {
      this.applyFilter();
    });

    this.batchControl.valueChanges.subscribe(() => {
      this.applyFilter();
    });

    this.searchControl.valueChanges.subscribe(() => {
      this.applyFilter();
    });

    this.applyFilter();

    this.route.paramMap.subscribe((params) => {
      const companyId = Number(params.get("id"));
      if (companyId) {
      }
    });
  }

  applyFilter() {
    const selectedStatuses = this.statusControl.value || [];
    const selectedBranches = this.branchControl.value || [];
    const selectedBatch = this.batchControl.value || [];
    const searchText = this.searchControl.value || "";

    const statusFilter = selectedStatuses.join(",");
    const branchFilter = selectedBranches.join(",");
    const batchFilter = selectedBatch.join(",");

    this.dataSource.filter = `${statusFilter}|${branchFilter}|${batchFilter}|${searchText}`;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: jobEligibleStudent): string {
    if (!row) {
      return `${this.isAllSelected() ? "deselect" : "select"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.StudentID + 1
    }`;
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
        return "primary"; // Blue
      case "Accepted":
        return "accent"; // Pink
      case "Invited":
        return "warn"; // Red
      case "Rejected":
      case "Blocked":
        return "warn"; // Red (for Rejected and Blocked)
      default:
        return "primary";
    }
  }

  goBack(): void {
    this.location.back();
  }

  openStudentDetailsDialog() {
    this.dialog.open(StudentdetailsDialogComponent, {
      width: "90vw",
      height: "90vh",
      maxWidth: "100vw",
      panelClass: "custom-dialog-container",
    });
  }
}
