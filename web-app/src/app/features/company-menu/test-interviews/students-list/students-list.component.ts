import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router, ActivatedRoute } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { students } from "./students-list-model";

export const Student_Data: students[] = [
  {
    JobId: 1,
    StudentID: 1,
    StudentName: "John Doe",
    Branch: "Computer Science",
    Batch: "2021",
    CGPA: "9.2",
  },
  {
    JobId: 1,
    StudentID: 2,
    StudentName: "Jane Smith",
    Branch: "Mechanical Engineering",
    Batch: "2020",
    CGPA: "8.7",
  },
  {
    JobId: 1,
    StudentID: 3,
    StudentName: "Michael Johnson",
    Branch: "Electrical Engineering",
    Batch: "2019",
    CGPA: "8.9",
  },
  {
    JobId: 1,
    StudentID: 4,
    StudentName: "Emily Davis",
    Branch: "Civil Engineering",
    Batch: "2022",
    CGPA: "9.1",
  },
  {
    JobId: 1,
    StudentID: 5,
    StudentName: "William Brown",
    Branch: "Information Technology",
    Batch: "2021",
    CGPA: "9.4",
  },
  {
    JobId: 2,
    StudentID: 1,
    StudentName: "John Doe",
    Branch: "Computer Science",
    Batch: "2021",
    CGPA: "9.2",
  },
  {
    JobId: 2,
    StudentID: 2,
    StudentName: "Jane Smith",
    Branch: "Mechanical Engineering",
    Batch: "2020",
    CGPA: "8.7",
  },
  {
    JobId: 2,
    StudentID: 3,
    StudentName: "Michael Johnson",
    Branch: "Electrical Engineering",
    Batch: "2019",
    CGPA: "8.9",
  },
  {
    JobId: 2,
    StudentID: 4,
    StudentName: "Emily Davis",
    Branch: "Civil Engineering",
    Batch: "2022",
    CGPA: "9.1",
  },
];
@Component({
  selector: "app-students-list",
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: "./students-list.component.html",
  styleUrl: "./students-list.component.css",
})
export class StudentsListComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService,
    private location: Location,
  ) {}
  displayedColumns: string[] = [
    "StudentID",
    "JobId",
    "StudentName",
    "Branch",
    "Batch",
    "CGPA",
    "Actions",
  ];
  columns = [
    { key: "StudentID", label: "Student ID" },
    { key: "JobId", label: "JobId" },
    { key: "StudentName", label: "Student Name" },
    { key: "Branch", label: "Branch" },
    { key: "Batch", label: "Batch" },
    { key: "CGPA", label: "CGPA" },
    { key: "Actions", label: "Actions" },
  ];

  dataSource = new MatTableDataSource<students>(Student_Data);
  selection = new SelectionModel<students>(true, []);

  collegeId: number | undefined = undefined;
  jobId: number | undefined = undefined;
  filteredStudents: students[] = [];

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.collegeId = Number(params.get("collegeId"));
      this.jobId = Number(params.get("jobId"));
      this.filteredStudents = Student_Data.filter(
        (s) => s.JobId === this.jobId
      );
      this.dataSource.data = this.filteredStudents;
    });
  }

  openStudentResultInformation(studentId: number) {
    this.router.navigate([
      "test-interviews",
      this.collegeId,
      this.jobId,
      studentId,
    ]);
  }

  goBack(): void {
    this.location.back();
  }
}
