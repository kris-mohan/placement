import { CommonModule, Location } from "@angular/common";
import { Component, inject, OnInit, signal } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { IndentRequirementsApiService } from "./InterviewStudentListApiService";
import { Jobposting } from "src/app/services/types/Jobposting";
import { JobpostStudentround } from "src/app/services/types/JobpostStudentround";
import { map, Observable } from "rxjs";
import { StepperOrientation } from "@angular/material/stepper";
import { BreakpointObserver } from "@angular/cdk/layout";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-interview-students-list",
  standalone: true,
  imports: [AMGModules, CommonModule, FlexLayoutModule],
  templateUrl: "./interview-students-list.component.html",
  styleUrl: "./interview-students-list.component.css",
})
export class InterviewStudentsListComponent implements OnInit {
  allDetails: Jobposting[] = [];

  currentRoundIndex: number = 0;

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private location: Location,
    private router: Router,
    private indentRequirementsApiService: IndentRequirementsApiService
  ) {
    const breakpointObserver = inject(BreakpointObserver);

    this.stepperOrientation = breakpointObserver
      .observe("(min-width: 800px)")
      .pipe(map(({ matches }) => (matches ? "horizontal" : "vertical")));
  }

  ngOnInit(): void {
    this.getAllStudents();
  }

  goBack(): void {
    this.location.back();
  }

  getAllStudents = () => {
    const id = 2;
    this.indentRequirementsApiService.GetAllStudents(id).subscribe({
      next: (response) => {
        const data: Jobposting[] = response.value;
        console.log("All Students", data);
        this.allDetails = data;
      },
    });
  };

  onStepChange(index: number): void {
    this.currentRoundIndex = index;
    console.log(this.currentRoundIndex);
    console.log(
      this.allDetails[0].Jobinterviewrounds[this.currentRoundIndex]
        .JobpostStudentrounds
    );
  }

  openInterviewMarksDetails(id?: number) {
    this.router.navigate([
      "/interview/interview-students-list/student-result-information",
      id,
    ]);
  }
}
