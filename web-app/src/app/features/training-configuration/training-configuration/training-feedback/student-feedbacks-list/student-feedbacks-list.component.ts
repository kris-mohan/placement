import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AMGModules } from 'src/AMG-Module/AMG-module';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-student-feedbacks-list',
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: './student-feedbacks-list.component.html',
  styleUrl: './student-feedbacks-list.component.css',
})
export class StudentFeedbacksListComponent {
  displayedColumns: string[] = ['slNo', 'studentName', 'scheduleName', 'view'];
  dataSource = [
    { slNo: 1, studentName: 'John Doe', scheduleName: 'Angular Basics' },
    { slNo: 2, studentName: 'Jane Smith', scheduleName: 'React Fundamentals' },
    { slNo: 3, studentName: 'Sam Wilson', scheduleName: 'Vue.js Overview' },
    {
      slNo: 4,
      studentName: 'Emily Johnson',
      scheduleName: 'Node.js Essentials',
    },
  ];

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<StudentFeedbacksListComponent>
  ) {}

  openStudentsResponse() {
    {
      this.router.navigate(['training-configuration/tf-student']);
      this.dialogRef.close();
    }
  }
}
