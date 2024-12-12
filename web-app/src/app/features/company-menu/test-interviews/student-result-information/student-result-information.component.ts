import { CommonModule, Location } from "@angular/common";
import { Component, inject, OnInit, signal } from "@angular/core";
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
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  JobpostStudentround,
  PostJobpostStudentround,
} from "src/app/services/types/JobpostStudentround";
import { postJobpostingSelectedstudent } from "src/app/services/types/postjobpostingselectedstudent";
import { MatButton } from "@angular/material/button";
import { MatTooltip } from "@angular/material/tooltip";

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
    MatButton,
    MatTooltip,
  ],
  templateUrl: "./student-result-information.component.html",
  styleUrl: "./student-result-information.component.css",
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class StudentResultInformation implements OnInit {
  hiringRounds: HiringRound[] = [];
  JobInterviewRoundId: string | null = "0";

  jobPostingId: number = 0;
  studentId: number = 0;
  jobPostingInterviewRoundId: number | null = 0;
  JobInterviewRoundsData = signal<Jobposting[]>([]);
  // currentRoundIndex = signal<number>(2);
  currentRoundIndex = signal<number>(1);
  stepperOrientation: Observable<StepperOrientation>;
  studentResultInformationForm: FormGroup;
  studentRoundsData = signal<JobpostStudentround[]>([]);

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
      Score: ["", Validators.required],
      Feedback: ["", Validators.required],
    });
  }

  ngOnInit() {
    // this.currentRoundIndex.set(2);
    this.route.paramMap.subscribe((params) => {
      const jobPostingId = Number(params.get("jobPostingId"));
      const jobPostingInterviewRoundId = Number(params.get("roundId"));
      const studentId = Number(params.get("studentId"));
      // const currentRoundIndex = 2;
      const currentRoundIndex = Number(params.get("currentRoundIndex"));
      console.log("Current round index", currentRoundIndex);
      this.jobPostingId = jobPostingId;
      this.jobPostingInterviewRoundId = jobPostingInterviewRoundId;
      this.studentId = studentId;
      // this.currentRoundIndex = currentRoundIndex;
      this.currentRoundIndex.set(currentRoundIndex);
      this.GetJobInterviewRounds();
    });
    this.getStudentRoundDetails();
  }

  getStudentRoundDetails = () => {
    this.studentResultInformationApiService
      .JobpostStudentround(this.studentId, this.jobPostingId)
      .subscribe({
        next: (studentRounds) => {
          const data = studentRounds.value;
          console.log(data);
          this.studentRoundsData.set(data);
          this.patchFormValues(0);
          this.currentRoundIndex.set(data.length);
          console.log(this.currentRoundIndex());
        },
      });
  };

  patchFormValues(roundIndex: number) {
    const roundData = this.studentRoundsData()[roundIndex];
    console.log(roundData);

    if (roundData) {
      this.studentResultInformationForm.patchValue({
        Score: roundData.Score || "",
        Feedback: roundData.Feedback || "",
      });
      this.studentResultInformationForm.get("Score")?.disable();
      this.studentResultInformationForm.get("Feedback")?.disable();
    } else {
      this.studentResultInformationForm.patchValue({
        Score: "",
        Feedback: "",
      });
      this.studentResultInformationForm.get("Score")?.enable();
      this.studentResultInformationForm.get("Feedback")?.enable();
    }
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
          // const currentRoundIndex =
          //   this.JobInterviewRoundsData()[0].Jobinterviewrounds.findIndex(
          //     (round) => round.Id === this.jobPostingInterviewRoundId
          //   );
          // this.currentRoundIndex.set(
          //   currentRoundIndex !== -1 ? currentRoundIndex : 0
          // );
        },
        error: (error) => {
          console.error(error);
        },
      });
  };

  onStepChange(index: number): void {
    // if (this.studentResultInformationForm.invalid) {
    //   this.sweetAlertService.error("All fields are required.");
    //   return;
    console.log(index);
    this.currentRoundIndex.set(0);
    this.patchFormValues(index);
    console.log(this.JobInterviewRoundsData()[0].Jobinterviewrounds[index].Id);
    this.jobPostingInterviewRoundId =
      this.JobInterviewRoundsData()[0].Jobinterviewrounds[index].Id;
  }

  // Function to patch the form values for a specific round (indexed by roundIndex)
  // patchFormValues(roundIndex: number) {
  //   const roundData = this.studentRoundsData()[roundIndex];
  //   console.log(roundData);

  //   // Patch the form values if data exists
  //   if (roundData) {
  //     this.studentResultInformationForm.patchValue({
  //       Score: roundData.Score || "",
  //       Feedback: roundData.Feedback || "",
  //     });
  //     // Disable the input fields if data exists
  //     this.studentResultInformationForm.get("Score")?.disable();
  //     this.studentResultInformationForm.get("Feedback")?.disable();
  //   } else {
  //     // If no data, reset the fields
  //     this.studentResultInformationForm.patchValue({
  //       Score: "",
  //       Feedback: "",
  //     });
  //     this.studentResultInformationForm.get("Score")?.enable();
  //     this.studentResultInformationForm.get("Feedback")?.enable();
  //   }
  // }

  // getStudentRoundDetails = () => {
  //   this.studentResultInformationApiService
  //     .JobpostStudentround(this.studentId, this.jobPostingId)
  //     .subscribe({
  //       next: (studentRounds) => {
  //         const data = studentRounds.value;
  //         console.log(data);
  //         this.studentRoundsData.set(data);
  //         this.currentRoundIndex.set(data.length);
  //         // this.currentRoundIndex.set(data.length);
  //         // console.log(this.currentRoundIndex());
  //       },
  //     });
  // };

  goBack(): void {
    this.location.back();
  }
  openMoveToNextRoundOrReject = async (action: number) => {
    if (
      this.studentResultInformationForm.invalid ||
      !this.studentResultInformationForm.value.Score ||
      !this.studentResultInformationForm.value.Feedback
    ) {
      this.sweetAlertService.error("Please enter both the score and feedback.");
      return;
    }

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
              if (action === 1) {
                this.sweetAlertService.success(
                  "Student successfully moved to the next round."
                );
              } else {
                this.sweetAlertService.success(
                  "Student successfully rejected."
                );
              }
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

  handleGenerateOffer = async () => {
    if (
      this.studentResultInformationForm.invalid ||
      !this.studentResultInformationForm.value.Score ||
      !this.studentResultInformationForm.value.Feedback
    ) {
      this.sweetAlertService.error("Please enter both the score and feedback.");
      return;
    }

    const postJobpostStudentroundForm: Partial<PostJobpostStudentround> =
      this.studentResultInformationForm.value;
    const confirmationMessage =
      "Do you want to generate offer for this student ?";

    const confirmed = await this.sweetAlertService.confirm(confirmationMessage);
    if (confirmed) {
      const postJobpostStudentround: PostJobpostStudentround = {
        Id: 0,
        StudentId: this.studentId ?? 0,
        JobPostingRoundId: this.jobPostingInterviewRoundId ?? 0,
        Feedback: postJobpostStudentroundForm.Feedback,
        HasPassed: 1,
        Score: postJobpostStudentroundForm.Score,
      };
      console.log(postJobpostStudentround, "round");
      this.studentResultInformationApiService
        .MoveToNextRoundOrReject(postJobpostStudentround)
        .subscribe({
          next: (response: { success: boolean; message: any }) => {
            console.log(response);
            if (response.success) {
              const postJobpostSelectedStudent: postJobpostingSelectedstudent =
                {
                  Id: 0,
                  JobPostingId: this.jobPostingId ?? 0,
                  StudentId: this.studentId ?? 0,
                  HasAcceptedOffer: 0,
                };

              this.studentResultInformationApiService
                .generateOffer(postJobpostSelectedStudent)
                .subscribe({
                  next: (response: { success: boolean; message: any }) => {
                    if (response.success) {
                      this.sweetAlertService.success(
                        "Student successfully moved to the next round."
                      );

                      this.goBack();
                    } else {
                      this.sweetAlertService.error(response.message);
                    }
                  },
                  error: (error: any) => {
                    this.sweetAlertService.error(
                      "An unexpected error occurred."
                    );
                  },
                });
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
