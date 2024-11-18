import { CommonModule, Location } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ActivatedRoute, Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { Tblstudent } from "src/app/services/types/Tblstudent";
import { InterviewPlacementApiservice } from "./placementInterviewApiService";
import { MatTableDataSource } from "@angular/material/table";
import { Jobposting } from "src/app/services/types/Jobposting";
import { StepperOrientation } from "@angular/material/stepper";
import { map, Observable } from "rxjs";
import { BreakpointObserver } from "@angular/cdk/layout";

@Component({
  selector: "app-placement-interview-students-list",
  standalone: true,
  imports: [AMGModules, CommonModule, FlexLayoutModule],
  templateUrl: "./placement-interview-students.component.html",
  styleUrl: "./placement-interview-students.component.css",
})
export class PlacementInterviewStudentsComponent {
  Id: string | null = "0";

  currentRoundIndex: number = 0;

  stepperOrientation: Observable<StepperOrientation>;

  allDetails: Jobposting[] = [];

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private interviewPlacementApiservice: InterviewPlacementApiservice
  ) {
    const breakpointObserver = inject(BreakpointObserver);

    this.stepperOrientation = breakpointObserver
      .observe("(min-width: 800px)")
      .pipe(map(({ matches }) => (matches ? "horizontal" : "vertical")));
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.Id = this.route.snapshot.paramMap.get("id");
    this.getAllStudents();
  }

  onStepChange(index: number): void {
    this.currentRoundIndex = index;
    console.log(this.currentRoundIndex);
    console.log(
      this.allDetails[0].Jobinterviewrounds[this.currentRoundIndex]
        .JobpostStudentrounds
    );
  }

  getAllStudents() {
    console.log(this.Id);
    const id = this.Id ? parseInt(this.Id) : 0;
    console.log(id);
    this.interviewPlacementApiservice.GetAllStudents(id).subscribe({
      next: (response) => {
        const data: Jobposting[] = response.value;
        console.log("Interview students", data);
        this.allDetails = data;
        console.log(this.allDetails);
      },
      error: (error) => {
        console.log("Error fetching students: ", error);
      },
    });
  }
  // openInterviewMarksDetails(id?: number) {
  //   this.router.navigate([
  //     "/interview/interview-students-list/student-result-information",
  //     id,
  //   ]);
  // }

  // getAllStudents = () => {
  //   this.interviewPlacementApiservice.GetAllStudents().subscribe({
  //     next: (response) => {
  //       const data: Tblstudent[] = response.value;
  //       console.log('Interview students', data);
  //       this.studentDataSource.data = data;
  //       console.log(this.studentDataSource);
  //     },
  //     error: (error) => {
  //       console.log('Error fetching rounds: ', error);
  //     },
  //   });
  // };
}
