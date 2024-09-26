import { Component } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-feedback-survey",
  standalone: true,
  imports: [AMGModules, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: "./feedback-survey.component.html",
  styleUrl: "./feedback-survey.component.css",
})
export class FeedbackSurveyComponent {
  totalFeedback = 150;
  averageRating = 4.5;

  feedbackList = [
    {
      id: 101,
      type: "Student",
      category: "Interview",
      date: "2024-09-01",
      rating: 5,
    },
    {
      id: 102,
      type: "Company",
      category: "Process",
      date: "2024-09-05",
      rating: 4,
    },
  ];

  totalStudentFeedback = 0;
  totalCompanyFeedback = 0;
  constructor() {
    this.calculateFeedbackTotals();
  }

  displayedColumns: string[] = [
    "id",
    "type",
    "category",
    "date",
    "rating",
    "actions",
  ];

  studentFeedbackList = [
    {
      studentName: "John Doe",
      date: "2024-09-01",
      rating: 5,
      comments: "Excellent interview process.",
    },
    {
      studentName: "Jane Smith",
      date: "2024-09-02",
      rating: 4,
      comments: "Good communication.",
    },
  ];

  companyFeedbackList = [
    {
      companyName: "Tech Solutions",
      date: "2024-09-05",
      rating: 4,
      comments: "Smooth placement process.",
    },
    {
      companyName: "Global Corp",
      date: "2024-09-06",
      rating: 5,
      comments: "Very satisfied with the talent pool.",
    },
  ];

  surveyTitle = "";
  surveyDescription = "";
  startDate: Date = new Date();
  endDate: Date = new Date();

  questions: any[] = [{ text: "", type: "multiple-choice", options: [""] }];

  totalResponses = 0;
  averageSurveyRating = 0;

  calculateFeedbackTotals() {
    this.totalStudentFeedback = this.feedbackList.filter(
      (f) => f.type === "Student"
    ).length;
    this.totalCompanyFeedback = this.feedbackList.filter(
      (f) => f.type === "Company"
    ).length;
  }
  addQuestion() {
    this.questions.push({ text: "", type: "multiple-choice" });
  }

  removeQuestion(index: number) {
    this.questions.splice(index, 1);
  }

  addOption(questionIndex: number) {
    this.questions[questionIndex].options.push("");
  }

  // Remove Option for Multiple Choice Question
  removeOption(questionIndex: number, optionIndex: number) {
    this.questions[questionIndex].options.splice(optionIndex, 1);
  }
  previewSurvey() {
    const previewSurveyData = {
      title: this.surveyTitle,
      description: this.surveyDescription,
      questions: this.questions,
      startDate: this.startDate,
      endDate: this.endDate,
    };
    console.log("Survey Preview:", previewSurveyData);
    // Logic to show a modal preview of the survey
  }

  saveSurvey() {
    const newSurvey = {
      title: this.surveyTitle,
      description: this.surveyDescription,
      questions: this.questions,
    };
  }

  viewFeedbackDetail(feedbackId: number) {
    const feedback = this.feedbackList.find((f) => f.id === feedbackId);

    if (feedback) {
    }
  }
}
