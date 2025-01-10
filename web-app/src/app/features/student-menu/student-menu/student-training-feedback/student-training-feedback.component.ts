import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AMGModules } from 'src/AMG-Module/AMG-module';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentResponseComponent } from './student-response/student-response.component';
export interface ODataResponse<T> {
  value: T[];
}

@Component({
  selector: 'app-student-training-feedback',
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: './student-training-feedback.component.html',
  styleUrl: './student-training-feedback.component.css',
})
export class StudentTrainingFeedbackComponent {
  readonly dialog = inject(MatDialog);
  completedSchedules = [
    {
      scheduleName: 'Schedule Name 1',
      trainerName: 'Usha Nuchin',
      courseName: 'Course 1',
      conductedOn: '2025-01-05',
      status: 'Completed',
      feedbackGiven: false,
    },
    {
      scheduleName: 'Schedule Name 2',
      trainerName: 'Pallavi M V',
      courseName: 'Course 2',
      conductedOn: '2025-01-06',
      status: 'Pending',
      feedbackGiven: true,
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  openResponsePage() {
    this.dialog.open(StudentResponseComponent, {
      width: '90vw',
      height: '90vh',
      maxHeight: '95vh',
      data: {
        /* Pass data here if needed */
      },
    });
  }
}
