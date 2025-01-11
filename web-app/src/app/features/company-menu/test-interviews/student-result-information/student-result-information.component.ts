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
} from 'src/app/services/types/JobpostStudentround';
import { postJobpostingSelectedstudent } from 'src/app/services/types/postjobpostingselectedstudent';
import { MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
// import { NotifyPopupComponent } from './notify-popup/notify-popup.component';
import { Template } from 'src/app/services/types/Template';
import { NotifyPopupComponent } from './notify-popup/notify-popup.component';
import { TemplateCategory } from 'src/app/services/types/TemplateCategory';
import { notification } from "src/app/services/types/Notifications";
import { NotificationsApiService } from "src/app/features/student-menu/student-menu/profile-management/profilemanagement-dashboard/NotificationsAPIService";

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
  Templates = signal<Template[]>([]);
  id: number = 0;
  templateCategories: TemplateCategory[] = [];
  templates: Template[] = [];
  selectedTemplate: { Subject: string; Body: string } | null = null;
  templateSubject: string = '';
  templateBody: string = '';
  studentEmail: string = '';
  selectedRound: JobpostStudentround[] = [];
  hiringRounds: HiringRound[] = [];

  JobInterviewRoundId: string | null = '0';
  indexId: number = 0;
  jobPostingId: number = 0;
  studentId: number = 0;
  jobPostingInterviewRoundId: number | null = 0;
  JobInterviewRoundsData = signal<Jobposting[]>([]);
  // currentRoundIndex = signal<number>(2);
  currentRoundIndex = signal<number>(1);
  stepperOrientation: Observable<StepperOrientation>;
  studentResultInformationForm: FormGroup;
  studentRoundsData = signal<JobpostStudentround[]>([]);
  readonly dialog = inject(MatDialog);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService,
    private location: Location,
    private fb: FormBuilder,
    private studentResultInformationApiService: StudentResultInformationApiService,
    private notificationApiService: NotificationsApiService
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
      // this.confirmAction();
    });
    this.getStudentRoundDetails();
    this.getEmailTemplate();
    this.getStudentDetails();
    // this.GetNextRoundNotification();
  }

  getEmailTemplate() {
    this.studentResultInformationApiService.getNextRoundTemplates().subscribe({
      next: (res) => {
        const data = res.value;
        if (data.length === 0) {
          this.sweetAlertService.error('No email templates found.');
          return;
        }
        this.templateBody = data[0].Body;
        this.templateSubject = data[0].Subject;
      },
      error: (error) => {
        console.error('Error fetching email templates:', error);
        this.sweetAlertService.error('Failed to fetch email templates.');
      },
    });
  }

  getStudentDetails() {
    this.studentResultInformationApiService
      .GetStudentEmail(this.studentId)
      .subscribe({
        next: (res) => {
          const data = res.value[0];
          this.studentEmail = data.Email;
        },
      });
  }

  getStudentRoundDetails = () => {
    this.studentResultInformationApiService
      .JobpostStudentround(this.studentId, this.jobPostingId)
      .subscribe({
        next: (studentRounds) => {
          const data = studentRounds.value;
          console.log(data);
          this.studentRoundsData.set(data);
          this.patchFormValues(data.length - 1);
          this.currentRoundIndex.set(data.length - 1);
          console.log(this.currentRoundIndex());
        },
      });
  };

  confirmAction() {
    console.log('Offer letter confirmed!');
    // if (this.selectedRound.length > 0) {
    const currentDate = new Date();
    // this.selectedRound.forEach((offer) => {
    const email = {
      To: this.studentEmail,
      Cc: this.studentEmail,
      Bcc: '',
      Subject: this.templateSubject,
      Body: this.templateBody,
      SentAt: currentDate,
    };
    this.studentResultInformationApiService
      .selectedForNextRoundEmail(email as any)
      .subscribe({
        next: () => {
          console.log('Offer letter sent successfully!');
          this.sweetAlertService;
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
    // });
    // } else {
    //   // this.closeSecondPopup();
    // }
  }

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

  moveToNextRound(postJobpostStudentround: PostJobpostStudentround) {
    this.studentResultInformationApiService
      .MoveToNextRoundOrReject(postJobpostStudentround)
      .subscribe({
        next: (response: { success: boolean; message: any }) => {
          if (response.success) {
            this.sweetAlertService.success(
              postJobpostStudentround.HasPassed === 1
                ? 'Student successfully moved to the next round.'
                : 'Student successfully rejected.'
            );
            if (postJobpostStudentround.HasPassed === 1) {
              this.confirmAction();
              this.onStepChange(this.indexId);
            }
          } else {
            this.sweetAlertService.error(response.message);
          }
        },
        error: (error) => {
          console.error('Error moving student:', error);
          this.sweetAlertService.error('An unexpected error occurred.');
        },
      });
  }

  openMoveToNextRoundOrReject = async (action: number) => {
    if (
      this.studentResultInformationForm.invalid ||
      !this.studentResultInformationForm.value.Score ||
      !this.studentResultInformationForm.value.Feedback
    ) {
      this.sweetAlertService.error('Please enter both the score and feedback.');
      return;
    }

    const confirmationMessage =
      action === 1
        ? 'Do you want to move this student to the next round?'
        : 'Do you want to reject this student?';

    const confirmed = await this.sweetAlertService.confirm(confirmationMessage);
    if (!confirmed) {
      return;
    }

    const postJobpostStudentroundForm: Partial<PostJobpostStudentround> =
      this.studentResultInformationForm.value;

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
            const content = `We are excited to inform you that you have been successfully moved to the next round for the ${
              this.JobInterviewRoundsData()[0]?.JobRole
            } position. Good luck with the next round!`;
            const notification = {
              Id: 0,
              Title: "Interview moved to the Next Round",
              NotificationContent: content,
              ParentType: "",
              ParentId: 0,
              IsRead: 0,
              // CompanyId:
              //   this.JobInterviewRoundsData()[0]?.CompanyId ?? null,
              // CampusId: this.JobInterviewRoundsData()[0]?.OrgId ?? null,
              CompanyId: null,
              CampusId: null,
              StudentId: this.studentId,
            };
            this.saveNotification(notification);

            this.sweetAlertService.success(
              "Student successfully moved to the next round."
            );
          } else {
            const content = `We regret to inform you that you have not been selected for the ${
              this.JobInterviewRoundsData()[0]?.JobRole
            } position. We wish you the best of luck in your future endeavors.`;
            const notification = {
              Id: 0,
              Title: "Interview round rejected",
              NotificationContent: content,
              ParentType: "",
              ParentId: 0,
              IsRead: 0,
              // CompanyId:
              //   this.JobInterviewRoundsData()[0]?.CompanyId ?? null,
              // CampusId: this.JobInterviewRoundsData()[0]?.OrgId ?? null,
              CompanyId: null,
              CampusId: null,
              StudentId: this.studentId,
            };
            this.saveNotification(notification);

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
    if (action === 1) {
      this.studentResultInformationApiService
        .getNextRoundTemplates()
        .subscribe({
          next: (res) => {
            const data = res.value;
            if (data.length === 0) {
              this.sweetAlertService.error(
                'Cannot move student to the next round. No email templates found.'
              );
              return;
            }

            // Proceed if the template exists
            this.templateBody = data[0].Body;
            this.templateSubject = data[0].Subject;

            // Send the email
            const email = {
              To: this.studentEmail,
              Cc: this.studentEmail,
              Bcc: '',
              Subject: this.templateSubject,
              Body: this.templateBody,
              SentAt: new Date(),
            };

            this.studentResultInformationApiService
              .selectedForNextRoundEmail(email as any)
              .subscribe({
                next: () => {
                  console.log('Email sent successfully!');
                  this.moveToNextRound(postJobpostStudentround);
                },
                error: (error) => {
                  console.error('Error sending email:', error);
                  this.sweetAlertService.error(
                    'Failed to send email. Cannot move student to the next round.'
                  );
                },
              });
          },
          error: (error) => {
            console.error('Error fetching templates:', error);
            this.sweetAlertService.error(
              'Failed to fetch email template. Cannot move student to the next round.'
            );
          },
        });
    } else {
      // Reject the student
      this.moveToNextRound(postJobpostStudentround);
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
      this.studentResultInformationApiService
        .MoveToNextRoundOrReject(postJobpostStudentround)
        .subscribe({
          next: (response: { success: boolean; message: any }) => {
            console.log(response);
            if (response.success) {
              const content = `We are pleased to inform you that you have been selected for the ${
                this.JobInterviewRoundsData()[0]?.JobRole
              } position. Welcome to the team, and we look forward to your contributions and growth with us!`;
              const notification = {
                Id: 0,
                Title: "Offer Generated",
                NotificationContent: content,
                ParentType: "",
                ParentId: 0,
                IsRead: 0,
                // CompanyId: this.JobInterviewRoundsData()[0]?.CompanyId ?? null,
                // CampusId: this.JobInterviewRoundsData()[0]?.OrgId ?? null,
                CompanyId: null,
                CampusId: null,
                StudentId: this.studentId,
              };
              this.saveNotification(notification);

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

  // confirmAndMoveToNextRound() {
  //   const dialogRef = this.dialog.open(NotifyPopupComponent, {
  //     width: '350px',
  //     data: {
  //       title: 'Confirm Action',
  //       message: 'Are you sure you want to move to the next round?',
  //     },
  //   });
  saveNotification(body: notification) {
    this.notificationApiService.Notification(body).subscribe({
      next: (response: { success: boolean; message: any }) => {
        if (response.success) {
          console.log(response.success, "success");
        } else {
        }
      },
      error: () => {},
    });
  }

  showNotificationPopup() {
    this.dialog.open(NotifyPopupComponent, {
      data: this.Templates,
      width: "500px",
      height: "400px",
    });
  }
}
