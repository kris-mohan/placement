import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { ThemePalette } from "@angular/material/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router, ActivatedRoute } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { PeriodicElement } from "src/app/features/customers/customer-list/customer-list.component";
import { APIService } from "src/app/services/api-services/api-services";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { employeeDataList } from "./eligible-students-list-model";
import { FormControl } from "@angular/forms";

export const EMPLOYEEDATA: employeeDataList[] = [
  {
    StudentID: 1,
    StudentName: "John Doe",
    Branch: "Computer Science",
    Batch: "2021",
    CGPA: "9.2",
    Status: "Invite",
  },
  {
    StudentID: 2,
    StudentName: "Jane Smith",
    Branch: "Mechanical Engineering",
    Batch: "2020",
    CGPA: "8.7",
    Status: "Accepted",
  },
  {
    StudentID: 3,
    StudentName: "Michael Johnson",
    Branch: "Electrical Engineering",
    Batch: "2019",
    CGPA: "8.9",
    Status: "Invited",
  },
  {
    StudentID: 4,
    StudentName: "Emily Davis",
    Branch: "Civil Engineering",
    Batch: "2022",
    CGPA: "9.1",
    Status: "Rejected",
  },
  {
    StudentID: 5,
    StudentName: "William Brown",
    Branch: "Information Technology",
    Batch: "2021",
    CGPA: "9.4",
    Status: "Pending",
  },
  {
    StudentID: 1,
    StudentName: "John Doe",
    Branch: "Computer Science",
    Batch: "2021",
    CGPA: "9.2",
    Status: "Invite",
  },
  {
    StudentID: 2,
    StudentName: "Jane Smith",
    Branch: "Mechanical Engineering",
    Batch: "2020",
    CGPA: "8.7",
    Status: "Accepted",
  },
  {
    StudentID: 3,
    StudentName: "Michael Johnson",
    Branch: "Electrical Engineering",
    Batch: "2019",
    CGPA: "8.9",
    Status: "Invited",
  },
  {
    StudentID: 4,
    StudentName: "Emily Davis",
    Branch: "Civil Engineering",
    Batch: "2022",
    CGPA: "9.1",
    Status: "Rejected",
  },
  {
    StudentID: 5,
    StudentName: "William Brown",
    Branch: "Information Technology",
    Batch: "2021",
    CGPA: "9.4",
    Status: "Pending",
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
    "Branch",
    "Batch",
    "CGPA",
    "Status",
  ];
  columns = [
    { key: "StudentID", label: "Student ID" },
    { key: "StudentName", label: "Student Name" },
    { key: "Branch", label: "Branch" },
    { key: "Batch", label: "Batch" },
    { key: "CGPA", label: "CGPA" },
    { key: "Status", label: "Status" },
  ];

  status: string[] = ["Invite", "Accepted", "Invited", "Rejected", "Pending"];
  statusControl = new FormControl(["Accepted"]);

  dataSource = new MatTableDataSource<employeeDataList>(EMPLOYEEDATA);
  selection = new SelectionModel<employeeDataList>(true, []);

  ngOnInit() {
    this.statusControl.valueChanges.subscribe((selectedStatuses) => {
      this.applyFilter(selectedStatuses);
    });

    this.dataSource.filterPredicate = (
      data: employeeDataList,
      filter: string
    ) => {
      const statusArray = filter.split(",");
      return statusArray.includes(data.Status);
    };

    this.route.paramMap.subscribe((params) => {
      const companyId = Number(params.get("id"));
      if (companyId) {
      }
    });
  }

  applyFilter(selectedStatuses: string[] | null) {
    if (!selectedStatuses || selectedStatuses.length === 0) {
      this.dataSource.filter = "";
    } else {
      this.dataSource.filter = selectedStatuses.join(",");
    }
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
}
