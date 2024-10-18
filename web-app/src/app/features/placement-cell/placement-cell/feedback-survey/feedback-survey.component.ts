import { Component, inject } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { CreateFeedbackComponent } from "./create-feedback/create-feedback.component";

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
  selectedFeedbackType: string = "survey";

  surveys: any[] = [
    {
      title: "Survey 1",
      questions: ["Question 1?", "Question 2?", "Question 3?"],
    },
    {
      title: "Survey 2",
      questions: ["Question A?", "Question B?", "Question C?"],
    },
  ];

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
  grievanceSubject = "";
  grievanceDetails = "";

  questions: any[] = [{ text: "", type: "multiple-choice", options: [""] }];

  totalResponses = 0;
  averageSurveyRating = 0;
  readonly dialog = inject(MatDialog);
  calculateFeedbackTotals() {
    this.totalStudentFeedback = this.feedbackList.filter(
      (f) => f.type === "Student"
    ).length;
    this.totalCompanyFeedback = this.feedbackList.filter(
      (f) => f.type === "Company"
    ).length;
  }

  addOption(questionIndex: number) {
    this.questions[questionIndex].options.push("");
  }

  // Remove Option for Multiple Choice Question
  removeOption(questionIndex: number, optionIndex: number) {
    this.questions[questionIndex].options.splice(optionIndex, 1);
  }

  viewFeedbackDetail(feedbackId: number) {
    const feedback = this.feedbackList.find((f) => f.id === feedbackId);

    if (feedback) {
    }
  }
  submitGrievance() {
    // Logic to submit grievance feedback
    console.log("Grievance submitted:", {
      subject: this.grievanceSubject,
      details: this.grievanceDetails,
    });
  }

  openCreateSurvey(): void {
    this.dialog.open(CreateFeedbackComponent, {
      width: "50%",
      height: "70%",
      maxWidth: "100vw",
      // data: survey,
    });
  }
  selectedTabHeading: string = "Feedback Dashboard"; 

  onTabChange(event: any): void {
    this.selectedTabHeading = event.tab.textLabel;
  }
}
