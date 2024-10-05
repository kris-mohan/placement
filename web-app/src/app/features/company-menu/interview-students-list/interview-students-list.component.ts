import { CommonModule, Location } from "@angular/common";
import { Component, signal } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";

@Component({
  selector: "app-interview-students-list",
  standalone: true,
  imports: [AMGModules, CommonModule, FlexLayoutModule],
  templateUrl: "./interview-students-list.component.html",
  styleUrl: "./interview-students-list.component.css",
})
export class InterviewStudentsListComponent {
  readonly panelOpenState = signal(false);

  constructor(private location: Location, private router: Router) {}

  studentsAttending = [
    {
      studentId: "4JN17EC109",
      studentName: "John Doe",
      status: "Ongoing",
      performanceScore: 85,
      remarks: "Good in problem-solving, needs to improve communication",
      batch: 2021,
      branch: "Electronics and communication",
      collegeName: "JNNCE",
    },
    {
      studentId: "4JN17EC109",
      studentName: "Jane Smith",
      status: "Rejected",
      performanceScore: 65,
      remarks: "Struggled with technical concepts",
      batch: 2021,
      branch: "Electronics and communication",
      collegeName: "JNNCE",
    },
    {
      studentId: "4JN17EC109",
      studentName: "Michael Johnson",
      status: "Ongoing",
      performanceScore: 90,
      remarks: "Excellent performance, good problem-solving skills",
      batch: 2021,
      branch: "Electronics and communication",
      collegeName: "JNNCE",
    },
    {
      studentId: "4JN17EC109",
      studentName: "John Doe",
      status: "Ongoing",
      performanceScore: 85,
      remarks: "Good in problem-solving, needs to improve communication",
      batch: 2021,
      branch: "Electronics and communication",
      collegeName: "JNNCE",
    },
    {
      studentId: "4JN17EC109",
      studentName: "Jane Smith",
      status: "Rejected",
      performanceScore: 65,
      remarks: "Struggled with technical concepts",
      batch: 2021,
      branch: "Electronics and communication",
      collegeName: "JNNCE",
    },
    {
      studentId: "4JN17EC109",
      studentName: "Michael Johnson",
      status: "Ongoing",
      performanceScore: 90,
      remarks: "Excellent performance, good problem-solving skills",
      batch: 2021,
      branch: "Electronics and communication",
      collegeName: "JNNCE",
    },
    {
      studentId: "4JN17EC109",
      studentName: "John Doe",
      status: "Ongoing",
      performanceScore: 85,
      remarks: "Good in problem-solving, needs to improve communication",
      batch: 2021,
      branch: "Electronics and communication",
      collegeName: "JNNCE",
    },
    {
      studentId: "4JN17EC109",
      studentName: "Jane Smith",
      status: "Rejected",
      performanceScore: 65,
      remarks: "Struggled with technical concepts",
      batch: 2021,
      branch: "Electronics and communication",
      collegeName: "JNNCE",
    },
    {
      studentId: "4JN17EC109",
      studentName: "Michael Johnson",
      status: "Ongoing",
      performanceScore: 90,
      remarks: "Excellent performance, good problem-solving skills",
      batch: 2021,
      branch: "Electronics and communication",
      collegeName: "JNNCE",
    },
    {
      studentId: "4JN17EC109",
      studentName: "John Doe",
      status: "Ongoing",
      performanceScore: 85,
      remarks: "Good in problem-solving, needs to improve communication",
      batch: 2021,
      branch: "Electronics and communication",
      collegeName: "JNNCE",
    },
    {
      studentId: "4JN17EC109",
      studentName: "Jane Smith",
      status: "Rejected",
      performanceScore: 65,
      remarks: "Struggled with technical concepts",
      batch: 2021,
      branch: "Electronics and communication",
      collegeName: "JNNCE",
    },
    {
      studentId: "4JN17EC109",
      studentName: "Michael Johnson",
      status: "Ongoing",
      performanceScore: 90,
      remarks: "Excellent performance, good problem-solving skills",
      batch: 2021,
      branch: "Electronics and communication",
      collegeName: "JNNCE",
    },
  ];

  goBack(): void {
    this.location.back();
  }

  openInterviewMarksDetails(id?: number) {
    this.router.navigate([
      "/interview/interview-students-list/student-result-information",
      id,
    ]);
  }
}
