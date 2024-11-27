import { CommonModule, Location } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { FirstRoundComponent } from "./first-round/first-round.component";
import { SecondRoundComponent } from "./second-round/second-round.component";
import { ThirdRoundComponent } from "./third-round/third-round.component";
import { FourthRoundComponent } from "./fourth-round/fourth-round.component";
//import { HIRING_ROUNDS_DATA } from "../../company-job-details/test-rounds/test-rounds.component";
import { HiringRound } from "../../company-job-details/test-rounds/test-rounds-model";
import { StepperOrientation } from "@angular/material/stepper";
import { map, Observable } from "rxjs";
import { BreakpointObserver } from "@angular/cdk/layout";
import { StudentResultInformationApiService } from "./StudentResultInformationApiService";
import { Jobposting } from "src/app/services/types/Jobposting";
import { FormBuilder, FormGroup } from "@angular/forms";
import { PostJobpostStudentround } from "src/app/services/types/JobpostStudentround";

@Component({
  selector: "app-student-result-information",
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    AMGModules,
    FirstRoundComponent,
    SecondRoundComponent,
    ThirdRoundComponent,
    FourthRoundComponent,
  ],
  templateUrl: "./student-result-information.component.html",
  styleUrl: "./student-result-information.component.css",
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class StudentResultInformation {
  hiringRounds: HiringRound[] = [];
  JobInterviewRoundId: string | null = "0";

  jobPostingId: number | null = 0;
  studentId: number | null = 0;
  jobPostingInterviewRoundId: number | null = 0;
  JobInterviewRoundsData = signal<Jobposting[]>([]);
  currentRoundIndex = signal<number>(0);
  stepperOrientation: Observable<StepperOrientation>;
  studentResultInformationForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService,
    private location: Location,
    private fb: FormBuilder,
    private studentResultInformationApiService: StudentResultInformationApiService
  ) {
    const breakpointObserver = inject(BreakpointObserver);

    this.stepperOrientation = breakpointObserver
      .observe("(min-width: 800px)")
      .pipe(map(({ matches }) => (matches ? "horizontal" : "vertical")));

    this.studentResultInformationForm = this.fb.group({
      Score: "",
      Feedback: "",
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const jobPostingId = Number(params.get("jobPostingId"));
      const jobPostingInterviewRoundId = Number(params.get("roundId"));
      const studentId = Number(params.get("studentId"));
      this.jobPostingId = jobPostingId;
      this.jobPostingInterviewRoundId = jobPostingInterviewRoundId;
      this.studentId = studentId;
      this.GetJobInterviewRounds();
    });
  }
  GetJobInterviewRounds = () => {
    const jobPostId = this.jobPostingId ?? 0;
    this.studentResultInformationApiService
      .GetJobInterviewRounds(jobPostId)
      .subscribe({
        next: (res) => {
          const data: Jobposting[] = res.value;
          this.JobInterviewRoundsData.set(data);
          console.log(this.JobInterviewRoundsData());
          console.log(this.jobPostingInterviewRoundId);
          const currentRoundIndex =
            this.JobInterviewRoundsData()[0].Jobinterviewrounds.findIndex(
              (round) => round.Id === this.jobPostingInterviewRoundId
            );
          this.currentRoundIndex.set(
            currentRoundIndex !== -1 ? currentRoundIndex : 0
          );
        },
        error: (error) => {
          console.error(error);
        },
      });
  };

  onStepChange(index: number): void {
    this.currentRoundIndex.set(index);
  }

  goBack(): void {
    this.location.back();
  }

  openMoveToNextRoundOrReject = async (action: number) => {
    const postJobpostStudentroundForm: Partial<PostJobpostStudentround> =
      this.studentResultInformationForm.value;
    const confirmationMessage =
      action === 1
        ? "Do you want to move this student to the next round?"
        : "Do you want to reject this student?";

    const confirmed = await this.sweetAlertService.confirm(confirmationMessage);
    if (confirmed) {
      const postJobpostStudentround: PostJobpostStudentround = {
        Id: 0,
        StudentId: this.studentId ?? 0,
        JobPostingRoundId: this.jobPostingInterviewRoundId ?? 0,
        Feedback: postJobpostStudentroundForm.Feedback,
        HasPassed: action,
        Score: postJobpostStudentroundForm.Score,
      };
      this.studentResultInformationApiService
        .MoveToNextRoundOrReject(postJobpostStudentround)
        .subscribe({
          next: (response: { success: boolean; message: any }) => {
            console.log(response);
            if (response.success) {
              this.sweetAlertService.success(response.message);
              this.goBack();
            } else {
              this.sweetAlertService.error(response.message);
            }
          },
          error: (error) => {
            this.sweetAlertService.error("An unexpected error occurred.");
          },
        });
    }
  };
}
