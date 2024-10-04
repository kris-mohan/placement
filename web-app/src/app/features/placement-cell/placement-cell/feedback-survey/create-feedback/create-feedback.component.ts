import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AMGModules } from 'src/AMG-Module/AMG-module';

@Component({
  selector: 'app-create-feedback',
  standalone: true,
  imports: [AMGModules, CommonModule, FormsModule],
  templateUrl: './create-feedback.component.html',
  styleUrl: './create-feedback.component.css',
})
export class CreateFeedbackComponent {
  surveyTitle = '';
  surveyDescription = '';
  startDate: Date = new Date();
  endDate: Date = new Date();
  grievanceSubject = '';
  grievanceDetails = '';

  questions: any[] = [{ text: '', type: 'multiple-choice', options: [''] }];

  totalResponses = 0;
  averageSurveyRating = 0;

  addQuestion() {
    this.questions.push({ text: '', type: 'multiple-choice' });
  }

  removeQuestion(index: number) {
    this.questions.splice(index, 1);
  }

  previewSurvey() {
    const previewSurveyData = {
      title: this.surveyTitle,
      description: this.surveyDescription,
      questions: this.questions,
      startDate: this.startDate,
      endDate: this.endDate,
    };
    console.log('Survey Preview:', previewSurveyData);
    // Logic to show a modal preview of the survey
  }

  saveSurvey() {
    const newSurvey = {
      title: this.surveyTitle,
      description: this.surveyDescription,
      questions: this.questions,
    };
  }

  addOption(questionIndex: number) {
    this.questions[questionIndex].options.push('');
  }

  // Remove Option for Multiple Choice Question
  removeOption(questionIndex: number, optionIndex: number) {
    this.questions[questionIndex].options.splice(optionIndex, 1);
  }
}
