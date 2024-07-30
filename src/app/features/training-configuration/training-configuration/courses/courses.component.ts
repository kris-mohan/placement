import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";

export interface CourseTableList {
  slNo: number;
  courseId: number;
  courseName: string;
  description: string;
  createdDate: string;
  actions: string;
}

export const courseTableList_Data: CourseTableList[] = [
  {
    slNo: 1,
    courseId: 401,
    courseName: "Introduction to JavaScript",
    description: "A beginner course on JavaScript ",
    createdDate: "2024-07-01",
    actions: "View, Edit, Delete",
  },
  {
    slNo: 2,
    courseId: 402,
    courseName: "Advanced Angular",
    description: "An advanced course on Angular, ",
    createdDate: "2024-07-05",
    actions: "View, Edit, Delete",
  },
  {
    slNo: 3,
    courseId: 403,
    courseName: "Data Science with Python",
    description: "A comprehensive course on data science using Python, ",
    createdDate: "2024-07-10",
    actions: "View, Edit, Delete",
  },
  {
    slNo: 4,
    courseId: 404,
    courseName: "Machine Learning",
    description: "An in-depth course on machine learning concepts,",
    createdDate: "2024-07-15",
    actions: "View, Edit, Delete",
  },
  {
    slNo: 5,
    courseId: 405,
    courseName: "UI/UX Design Principles",
    description: "A course focused on the principles of UI/UX ",
    createdDate: "2024-07-20",
    actions: "View, Edit, Delete",
  },
];

@Component({
  selector: "app-courses",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./courses.component.html",
  styleUrl: "./courses.component.css",
})
export class CoursesComponent {
  displayedColumns: string[] = [
    "slNo",
    "courseId",
    "courseName",
    "description",
    "createdDate",
    "actions",
  ];

  columns = [
    { key: "slNo", label: "Sl No" },
    { key: "courseId", label: "course Id" },
    { key: "courseName", label: "course Name" },
    { key: "description", label: "description" },
    { key: "createdDate", label: "created Date" },
    { key: "actions", label: "Actions" },
  ];

  dataSource = new MatTableDataSource<CourseTableList>(courseTableList_Data);
  selection = new SelectionModel<CourseTableList>(true, []);

  constructor(private router: Router, private location: Location) {}

  openAddEditCourseForm(courseId?: number) {
    if (courseId != undefined) {
      this.router.navigate(["training-configuration/addEditCourse", courseId]);
    } else {
      this.router.navigate(["training-configuration/addEditCourse", "new"]);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
