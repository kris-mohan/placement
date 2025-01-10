import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AMGModules } from 'src/AMG-Module/AMG-module';

import { SharedModule } from 'src/app/shared/shared.module';

import { Router } from '@angular/router';
import { Trainerschedule } from '../schedules/schedules-module';
import { TrainerScheduleAPIService } from '../schedules/api.schedules';
import { ODataResponse } from '../trainers/trainers.component';
import { MatDialog } from '@angular/material/dialog';
import { StudentFeedbacksListComponent } from './student-feedbacks-list/student-feedbacks-list.component';
import { StudentResponseDialogComponent } from './student-response-dialog/student-response-dialog.component';
import { ScheduleDialogComponent } from './schedule-dialog/schedule-dialog.component';
import { SimplePieChartComponent } from 'src/app/features/charts/pie chart/simple-pie-chart/simple-pie-chart.component';

@Component({
  selector: 'app-training-feedback',
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules, SimplePieChartComponent],
  templateUrl: './training-feedback.component.html',
  styleUrls: ['./training-feedback.component.css'],
})
export class TrainingFeedbackComponent {
  feedbackName: string = '';
  showResponses = true;
  showResponseDialog = true;
  showStudentListDialog = true;
  trainingSchedule: Trainerschedule[] = [];
  selectedSchedule = '';
  questions: string[] = [];
  ratingSeries: number[] = [45, 30, 15, 10];
  ratingLabels: string[] = ['Excellent', 'Good', 'Average', 'Poor'];

  responses = [
    {
      schedule: 'Schedule 1',
      feedbackName: 'Session 1 Feedback',
      answers: [
        { question: 'What did you like?', answer: 'Great teaching.' },
        { question: 'What can be improved?', answer: 'More examples.' },
      ],
    },
    {
      schedule: 'Schedule 2',
      feedbackName: 'Session 2 Feedback',
      answers: [
        { question: 'Was it helpful?', answer: 'Yes, very informative.' },
        { question: 'Suggestions?', answer: 'Add more practical tasks.' },
      ],
    },
  ];
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
  displayedColumns: string[] = [
    'slNo',
    'feedbackName',
    'scheduleName',
    'actions',
  ];
  studentList = [
    { name: 'John Doe' },
    { name: 'Jane Smith' },
    { name: 'Sam Wilson' },
    { name: 'Emily Johnson' },
  ];
  readonly dialog = inject(MatDialog);
  constructor(
    private router: Router,
    private apiScheduleService: TrainerScheduleAPIService
  ) {}

  ngOnInit() {
    this.getAllTrainingSchedule();
  }

  addQuestion() {
    this.questions.push('');
  }

  removeLastQuestion() {
    if (this.questions.length > 0) {
      this.questions.pop();
    } else {
      alert('No questions to remove.');
    }
  }

  toggleView() {
    this.showResponses = !this.showResponses;
  }

  openStudentFeedbackList() {
    this.dialog.open(StudentFeedbacksListComponent, {
      width: '90vw',
      height: 'auto',
      maxWidth: 'none',
      data: {
        /* Pass data here if needed */
      },
    });
  }

  openScheduleList() {
    this.dialog.open(ScheduleDialogComponent, {
      width: '90vw',
      height: 'auto',
      maxWidth: 'none',
      data: {
        /* Pass data here if needed */
      },
    });
  }

  openStudentsResponse() {
    this.dialog.open(StudentResponseDialogComponent, {
      width: '90vw',
      height: 'auto',
      maxWidth: 'none',
      data: {
        /* Pass data here if needed */
      },
    });
  }

  // ratingStatus(): void {
  //   const mockResponse = {
  //     ratingSeries: [45, 30, 15, 10],
  //     ratingLabels: ['Excellent', 'Good', 'Average', 'Poor'],
  //   };

  //   // Optionally log the data for verification
  //   console.log('Student Ratings:', this.ratingSeries, this.ratingLabels);
  // }

  getAllTrainingSchedule(): void {
    this.apiScheduleService.loadTrainerScheduleData().subscribe({
      next: (response: ODataResponse<Trainerschedule>) => {
        this.trainingSchedule = response.value;
        console.log('Schedules:', response);
      },
      error: (error) => {
        console.error('Error loading batches', error);
      },
    });
  }

  submitFeedback() {
    if (!this.selectedSchedule) {
      alert('Please select a course');
      return;
    }
    if (this.questions.some((q) => q.trim() === '')) {
      alert('Please fill out all questions');
      return;
    }
    alert('Feedback submitted!');
    this.selectedSchedule = '';
    this.questions = [];
  }
}
