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
  currentRoundIndex: number = 0;
  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService,
    private location: Location,
    private studentResultInformationApiService: StudentResultInformationApiService
  ) {
    const breakpointObserver = inject(BreakpointObserver);

    this.stepperOrientation = breakpointObserver
      .observe("(min-width: 800px)")
      .pipe(map(({ matches }) => (matches ? "horizontal" : "vertical")));
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
          const currentRoundIndex = this.JobInterviewRoundsData().findIndex(
            (round) => round.Id === this.jobPostingInterviewRoundId
          );
          this.currentRoundIndex =
            currentRoundIndex !== -1 ? currentRoundIndex : 0;
        },
      });
  };

  onStepChange(index: number): void {
    this.currentRoundIndex = index;
    this.JobInterviewRoundsData()[0].Jobinterviewrounds[this.currentRoundIndex];
  }

  goBack(): void {
    this.location.back();
  }

  openMoveToNextRound() {}

  openReject() {}
}
