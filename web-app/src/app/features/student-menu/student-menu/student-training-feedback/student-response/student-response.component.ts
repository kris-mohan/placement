import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AMGModules } from 'src/AMG-Module/AMG-module';
import { TrainingFeedbackQuestions } from 'src/app/services/types/TrainingFeedbackQuestions';
import { TrainingFeedbackResponse } from 'src/app/services/types/TrainingFeedbackResponse';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentFeedbackApiService } from '../studentFeedbackApiService';

export interface ODataResponse<T> {
  value: T[];
}

@Component({
  selector: 'app-student-response',
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: './student-response.component.html',
  styleUrl: './student-response.component.css',
})
export class StudentResponseComponent {
  feedBackQuestions: TrainingFeedbackQuestions[] = [];
  feedBackRatings: TrainingFeedbackResponse[] = [];
  ratings = [1, 2, 3, 4, 5];

  constructor(private fbQuestionsApiService: StudentFeedbackApiService) {}

  ngOnInit() {
    this.loadTrainingFeedbackQuestions();
  }

  isFormValid(): boolean {
    return this.feedBackRatings.every((q) => q.Rating !== null);
  }

  loadTrainingFeedbackQuestions() {
    this.fbQuestionsApiService.loadFeedbackQuestions().subscribe({
      next: (response: ODataResponse<any>) => {
        this.feedBackQuestions = response.value;
        console.log('Questions:', response);
      },
      error: (error) => {
        console.error('Error Feedback Questions', error);
      },
    });
  }

  submitFeedback(): void {
    // const feedbackResponse = this.feedbackQuestions.map((q) => ({
    //   question: q.text,
    //   rating: q.rating,
    // }));
  }
}
