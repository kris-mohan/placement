import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ThemePalette } from "@angular/material/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router, ActivatedRoute } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { PeriodicElement } from "src/app/features/customers/customer-list/customer-list.component";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { employeeDataList } from "./eligible-students-list-model";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { StudentdetailsDialogComponent } from "../studentdetails-dialog/studentdetails-dialog.component";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

export const EMPLOYEEDATA: employeeDataList[] = [
  {
    StudentID: 1,
    StudentName: "John Doe",
    Branch: "Computer Science",
    Batch: "2021",
    CGPA: "9.2",
    Status: "Invite",
    ApplicationApprovalStatus: "Verify",
  },
  {
    StudentID: 2,
    StudentName: "Jane Smith",
    Branch: "Civil Engineering",
    Batch: "2020",
    CGPA: "8.7",
    Status: "Accepted",
    ApplicationApprovalStatus: "Verify",
  },
  {
    StudentID: 3,
    StudentName: "Michael Johnson",
    Branch: "Electrical Engineering",
    Batch: "2019",
    CGPA: "8.9",
    Status: "Invited",
    ApplicationApprovalStatus: "Verify",
  },
  {
    StudentID: 4,
    StudentName: "Emily Davis",
    Branch: "Civil Engineering",
    Batch: "2022",
    CGPA: "9.1",
    Status: "Rejected",
    ApplicationApprovalStatus: "Verify",
  },
  {
    StudentID: 5,
    StudentName: "William Brown",
    Branch: "Information Technology",
    Batch: "2021",
    CGPA: "9.4",
    Status: "Pending",
    ApplicationApprovalStatus: "Verify",
  },
];

export interface ODataResponse<T> {
  value: T[];
}
@Component({
  selector: "app-eligible-students-list",
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: "./eligible-students-list.component.html",
  styleUrl: "./eligible-students-list.component.css",
})
export class EligibleStudentsListComponent {
  readonly dialog = inject(MatDialog);
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService,
    private location: Location
  ) {}

  isLargeScreen() {
    return window.innerWidth > 768; // Customize based on your layout
  }

  displayedColumns: string[] = [
    "select",
    // "StudentID",
    "StudentName",
    "Branch",
    "Batch",
    "CGPA",
    "Status",
    "ApplicationApprovalStatus",
  ];
  columns = [
    { key: "StudentID", label: "Student ID" },
    { key: "StudentName", label: "Student Name" },
    { key: "Branch", label: "Branch" },
    { key: "Batch", label: "Batch" },
    { key: "CGPA", label: "CGPA" },
    { key: "Status", label: "Registration Status" },
    { key: "ApplicationApprovalStatus", label: "Application Approval Status" },
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
  // Inject BreakpointObserver
  private breakpointObserver = inject(BreakpointObserver);
  statusControl = new FormControl<string[]>(["Accepted"]);
  branchControl = new FormControl<string[] | null>(null);
  batchControl = new FormControl<any[] | null>(null);
  searchControl = new FormControl("");

  dataSource = new MatTableDataSource<employeeDataList>(EMPLOYEEDATA);
  selection = new SelectionModel<employeeDataList>(true, []);

  ngOnInit() {
    this.dataSource.filterPredicate = (
      data: employeeDataList,
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

  checkboxLabel(row?: employeeDataList): string {
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

  getApplicationApproveChipStyle(action: string): any {
    switch (action) {
      case "Verify":
        return { "background-color": "#bee2e9", color: "white !important" };
      case "Accepted":
        return { "background-color": "#9aee9a", color: "white" };
      case "Rejected":
        return { "background-color": "#fb6767", color: "white" };
      default:
        return { "background-color": "blue", color: "white" };
    }
  }

  getBadgeColor(action: string): ThemePalette {
    switch (action) {
      case "Invite":
        return "primary";
      case "Verify":
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

  openStudentDetailsDialog() {
    this.dialog.open(StudentdetailsDialogComponent, {
      width: "90vw",
      height: "90vh",
      maxWidth: "100vw",
      panelClass: "custom-dialog-container",
    });
  }

  verifyApplicationStatus(id?: number) {
    this.router.navigate(["/students/student-details-approval", id]);
  }
}
