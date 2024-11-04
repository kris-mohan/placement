import { CommonModule, Location } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { AMGModules } from 'src/AMG-Module/AMG-module';
import { Tblstudent } from 'src/app/services/types/Tblstudent';
import { InterviewPlacementApiservice } from './placementInterviewApiService';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-placement-interview-students-list',
  standalone: true,
  imports: [AMGModules, CommonModule, FlexLayoutModule],
  templateUrl: './placement-interview-students.component.html',
  styleUrl: './placement-interview-students.component.css',
})
export class PlacementInterviewStudentsComponent {
  readonly panelOpenState = signal(false);

  constructor(
    private location: Location,
    private router: Router,
    private interviewPlacementApiservice: InterviewPlacementApiservice
  ) {}

  studentsAttending = [
    {
      studentId: 101,
      studentName: 'John Doe',
      status: 'Ongoing',
      performanceScore: 85,
      remarks: 'Good in problem-solving, needs to improve communication',
      batch: 2021,
      branch: 'Electronics and communication',
    },
    {
      studentId: 102,
      studentName: 'Jane Smith',
      status: 'Rejected',
      performanceScore: 65,
      remarks: 'Struggled with technical concepts',
      batch: 2021,
      branch: 'Electronics and communication',
    },
    {
      studentId: 103,
      studentName: 'Michael Johnson',
      status: 'Ongoing',
      performanceScore: 90,
      remarks: 'Excellent performance, good problem-solving skills',
      batch: 2021,
      branch: 'Electronics and communication',
    },
    {
      studentId: 101,
      studentName: 'John Doe',
      status: 'Ongoing',
      performanceScore: 85,
      remarks: 'Good in problem-solving, needs to improve communication',
      batch: 2021,
      branch: 'Electronics and communication',
    },
    {
      studentId: 102,
      studentName: 'Jane Smith',
      status: 'Rejected',
      performanceScore: 65,
      remarks: 'Struggled with technical concepts',
      batch: 2021,
      branch: 'Electronics and communication',
    },
    {
      studentId: 103,
      studentName: 'Michael Johnson',
      status: 'Ongoing',
      performanceScore: 90,
      remarks: 'Excellent performance, good problem-solving skills',
      batch: 2021,
      branch: 'Electronics and communication',
    },
    {
      studentId: 101,
      studentName: 'John Doe',
      status: 'Ongoing',
      performanceScore: 85,
      remarks: 'Good in problem-solving, needs to improve communication',
      batch: 2021,
      branch: 'Electronics and communication',
    },
    {
      studentId: 102,
      studentName: 'Jane Smith',
      status: 'Rejected',
      performanceScore: 65,
      remarks: 'Struggled with technical concepts',
      batch: 2021,
      branch: 'Electronics and communication',
    },
    {
      studentId: 103,
      studentName: 'Michael Johnson',
      status: 'Ongoing',
      performanceScore: 90,
      remarks: 'Excellent performance, good problem-solving skills',
      batch: 2021,
      branch: 'Electronics and communication',
    },
    {
      studentId: 101,
      studentName: 'John Doe',
      status: 'Ongoing',
      performanceScore: 85,
      remarks: 'Good in problem-solving, needs to improve communication',
      batch: 2021,
      branch: 'Electronics and communication',
    },
    {
      studentId: 102,
      studentName: 'Jane Smith',
      status: 'Rejected',
      performanceScore: 65,
      remarks: 'Struggled with technical concepts',
      batch: 2021,
      branch: 'Electronics and communication',
    },
    {
      studentId: 103,
      studentName: 'Michael Johnson',
      status: 'Ongoing',
      performanceScore: 90,
      remarks: 'Excellent performance, good problem-solving skills',
      batch: 2021,
      branch: 'Electronics and communication',
    },
  ];
  studentDataSource = new MatTableDataSource<Tblstudent>([]);

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.getAllStudents();
  }
  // openInterviewMarksDetails(id?: number) {
  //   this.router.navigate([
  //     "/interview/interview-students-list/student-result-information",
  //     id,
  //   ]);
  // }

  getAllStudents = () => {
    this.interviewPlacementApiservice.GetAllStudents().subscribe({
      next: (response) => {
        const data: Tblstudent[] = response.value;
        console.log('Interview students', data);
        this.studentDataSource.data = data;
        console.log(this.studentDataSource);
      },
      error: (error) => {
        console.log('Error fetching rounds: ', error);
      },
    });
  };
}
