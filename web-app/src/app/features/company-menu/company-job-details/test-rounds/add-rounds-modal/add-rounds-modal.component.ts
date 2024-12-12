import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Inject, Output } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { ActivatedRoute, Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { InterviewRoundsAPIService } from "./api-add-rounds-modal";
import { Jobinterviewround } from "src/app/services/types/Jobinterviewround";
import { TestRoundsApiService } from "../TestRoundsApiService";
import { MatTableDataSource } from "@angular/material/table";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { interviewRounds } from "./add-rounds-modal.model";

@Component({
  selector: "app-add-rounds-modal",
  standalone: true,
  imports: [
    MatDialogModule,
    AMGModules,
    SharedModule,
    CommonModule,
    NgxMaterialTimepickerModule,
  ],
  templateUrl: "./add-rounds-modal.component.html",
  styleUrl: "./add-rounds-modal.component.css",
})
export class AddRoundsModalComponent {
  UserRoleId: number;
  selectedPriority: string = "";
  roundId: number;
  roundAddEditForm: FormGroup;
  jobPostingId: number;
  companyId: number = 0;
  //OrgId: number | null = null;
  sessionCampusId: number;
  sessionCompanyId: number;
  @Output() roundsUpdated = new EventEmitter<void>();
  constructor(
    private apiInterviewRounds: InterviewRoundsAPIService,
    public dialogRef: MatDialogRef<AddRoundsModalComponent>,
    private route: ActivatedRoute,
    private router: Router,
    private sweetAlertService: SweetAlertService,
    private testRoundsApiService: TestRoundsApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    const storedUserRoleId = sessionStorage.getItem("userRoleId");
    this.UserRoleId = storedUserRoleId ? parseInt(storedUserRoleId) : 0;
    const storedCompanyId = sessionStorage.getItem("CompanyId");
    this.sessionCompanyId = storedCompanyId ? parseInt(storedCompanyId) : 0;
    const storedCampusId = sessionStorage.getItem("CampusId");
    this.sessionCampusId = storedCampusId ? parseInt(storedCampusId) : 0;

    this.roundId = this.data?.roundsId;
    this.jobPostingId = this.data?.JobPostingId;
    console.log("Modal data", data);
    // this.OrgId = data.orgId || null; // Get OrgId from data
    // console.log("OrgId received:", this.OrgId);

    this.roundAddEditForm = this.fb.group({
      Name: ["", Validators.required],
      Description: ["", Validators.required],
      Priority: ["", Validators.required],
      startDate: ["", Validators.required],
      endDate: ["", Validators.required],
      startTime: ["", Validators.required],
      endTime: ["", Validators.required],
    });
  }
  RoundEditData = {
    Name: "",
    Description: "",
    // Priority: "",
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null,
  };
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log("Params", params.get("jobId"));
    });

    if (this.roundId) {
      this.getRoundsById(this.roundId);
    }
    // this.route.paramMap.subscribe((params) => {
    //   const id = params.get("roundsId");
    //   this.roundId = id !== null ? +id : null;
    //   if (this.roundId) {
    //     const technology = HIRING_ROUNDS_DATA.find(
    //       (t) => t.roundId === this.roundId
    //     );
    //     // if (technology) {
    //     //   this.addEditTrainerForm.patchValue(technology);
    //     // }
    //   }
    // });
  }

  RoundDataById = new MatTableDataSource<Jobinterviewround>([]);

  getRoundsById(id: number) {
    this.testRoundsApiService.GetRoundsById(id).subscribe({
      next: (response) => {
        const data: any = response.value;
        console.log("rounds by id", data);

        // const preFilledPriority = [
        //   { value: "1", viewValue: String(data[0].Priority) },
        // ];

        // const selectedPriority = String(data[0].Priority);
        //const selectedPriority = String(data[0].Priority);

        // console.log(preFilledPriority);
        // console.log(this.Priority);
        this.roundAddEditForm.patchValue({
          Name: data[0].Name,
          Description: data[0].Description,
          // startDate: data.startDate ? new Date(data.startDate) : null,
          // endDate: data.endDate ? new Date(data.endDate) : null,
          // startTime: data.startTime ? new Date(data.startTime) : null,
          // endTime: data.endTime ? new Date(data.endTime) : null,
          //Priority: selectedPriority,
          startDate: data[0].Event.EventStartDateTime
            ? new Date(data[0].Event.EventStartDateTime.split("T")[0])
            : null,
          endDate: data[0].Event.EventEndDateTime
            ? new Date(data[0].Event.EventEndDateTime.split("T")[0])
            : null,
          startTime: data[0].Event.EventStartDateTime
            ? new Date(data[0].Event.EventStartDateTime).getHours() +
              ":" +
              new Date(data[0].Event.EventStartDateTime).getMinutes()
            : null,
          endTime: data[0].Event.EventEndDateTime
            ? new Date(data[0].Event.EventEndDateTime).getHours() +
              ":" +
              new Date(data[0].Event.EventStartDateTime).getMinutes()
            : null,
        });
        this.RoundEditData = {
          Name: data[0].Name,
          Description: data[0].Description,
          startDate: data.startDate || null,
          endDate: data.endDate || null,
          // Priority: selectedPriority,
          startTime: null,
          endTime: null,
        };
      },
      error: (error) => {
        console.log("Error fetching rounds: ", error);
      },
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
  async getInterviewRounds() {
    this.apiInterviewRounds.getInterviewRounds().subscribe({
      next: () => {},
      error: () => {
        console.error("error 404");
      },
    });
  }
  // async onSubmit() {
  //   // const companyData: Partial<interviewRounds> = this.roundAddEditForm.value;
  //   // const isUpdate = !!this.roundId;
  //   // const actionText = isUpdate ? "update" : "add";
  //   // const confirmed = await this.sweetAlertService.confirm(
  //   //   `Do you want to ${actionText} this round?`
  //   // );
  //   const companyData: {
  //     Name: string;
  //     Description: string;
  //     startDate: any;
  //     endDate: any;
  //     startTime: any;
  //     endTime: any;
  //   } = this.roundAddEditForm.value;
  //   const parseTime = (time: string): Date | null => {
  //     const timeParts = time.match(/(\d+):(\d+)\s*(AM|PM)/);
  //     if (timeParts) {
  //       let hours = parseInt(timeParts[1], 10);
  //       const minutes = parseInt(timeParts[2], 10);
  //       const period = timeParts[3];
  //       if (period === "PM" && hours < 12) hours += 12;
  //       if (period === "AM" && hours === 12) hours = 0;

  //       const now = new Date(); // Use current date
  //       now.setHours(hours, minutes, 0, 0);
  //       return now;
  //     }
  //     return null;
  //   };
  //   // if (confirmed) {
  //   const companydatum: any = {
  //     Id: this.roundId ?? 0,
  //     // JobPostingId: this.jobPostingId ?? "",
  //     Name: companyData.Name ?? "",
  //     Description: companyData.Description ?? "",
  //     //Priority: companyData.Priority ?? "",
  //     // };
  //     // this.apiInterviewRounds
  //     //   .addInterviewRounds(this.roundId, companydatum)
  //     //   .subscribe({
  //     //     next: (response: { success: boolean; message: any }) => {
  //     //       console.log(response);
  //     //       if (response.success) {
  //     //         this.sweetAlertService.success(response.message);
  //     //         this.router.navigate(["/company-job-details/add-edit-jobPosting/"]);
  //     //       } else {
  //     //         this.sweetAlertService.error(response.message);
  //     //       }
  //     //     },
  //     //     error: (error) => {
  //     //       this.sweetAlertService.error("An unexpected error occurred.");
  //     //     },
  //     //   });
  //     // }
  //     StartDate: companyData.startDate,
  //     EndDate: companyData.endDate,
  //     StartTime: parseTime(companyData.startTime),
  //     EndTime: parseTime(companyData.endTime),
  //   };
  //   console.log("Round", companydatum);
  //   this.dialogRef.close({ data: companydatum });
  // }
  async onSubmit() {
    if (this.roundAddEditForm.invalid) {
      this.sweetAlertService.error("All fields are required.");
      return;
    }
    // const companyData: Partial<interviewRounds> = this.roundAddEditForm.value;
    const isUpdate = !!this.roundId;
    const actionText = isUpdate ? "update" : "add";
    const confirmed = await this.sweetAlertService.confirm(
      `Do you want to ${actionText} this round?`
    );
    const companyData: {
      Name: string;
      Description: string;
      startDate: any;
      endDate: any;
      startTime: any;
      endTime: any;
    } = this.roundAddEditForm.value;
    // const parseTime = (time: string): Date | null => {
    //   const timeParts = time.match(/(\d+):(\d+)\s*(AM|PM)/);
    //   if (timeParts) {
    //     let hours = parseInt(timeParts[1], 10);
    //     const minutes = parseInt(timeParts[2], 10);
    //     const period = timeParts[3];
    //     if (period === "PM" && hours < 12) hours += 12;
    //     if (period === "AM" && hours === 12) hours = 0;
    //     const now = new Date();
    //     now.setHours(hours, minutes, 0, 0);
    //     return now;
    //   }
    //   return null;
    // };
    if (this.roundAddEditForm.valid && confirmed) {
      const formData = this.roundAddEditForm.value;

      // Helper to combine date and time
      const combineDateAndTime = (date: Date, time: string): string | null => {
        if (!date || !time) return null;

        const timeParts = time.match(/(\d+):(\d+)\s*(AM|PM)/);
        if (timeParts) {
          let hours = parseInt(timeParts[1], 10);
          const minutes = parseInt(timeParts[2], 10);
          const period = timeParts[3];
          if (period === "PM" && hours < 12) hours += 12;
          if (period === "AM" && hours === 12) hours = 0;

          // Create a new Date object using the selected date
          const combinedDate = new Date(date);
          combinedDate.setHours(hours, minutes, 0, 0);
          return combinedDate.toISOString(); // Convert to ISO string
        }
        return null;
      };
      const startDateTime = combineDateAndTime(
        formData.startDate,
        formData.startTime
      );
      const endDateTime = combineDateAndTime(
        formData.endDate,
        formData.endTime
      );
      if (this.roundAddEditForm.valid) {
        const companydatum: any = {
          Id: this.roundId ?? 0,
          JobPostingId: this.jobPostingId ?? "",
          Name: companyData.Name ?? "",
          Description: companyData.Description ?? "",

          // };
          // this.apiInterviewRounds
          //   .addInterviewRounds(this.roundId, companydatum)
          //   .subscribe({
          //     next: (response: { success: boolean; message: any }) => {
          //       console.log(response);
          //       if (response.success) {
          //         this.sweetAlertService.success(response.message);
          //         this.router.navigate(["/company-job-details/add-edit-jobPosting/"]);
          //       } else {
          //         this.sweetAlertService.error(response.message);
          //       }
          //     },
          //     error: (error) => {
          //       this.sweetAlertService.error("An unexpected error occurred.");
          //     },
          //   });
          // }
          // StartDate: companyData.startDate,
          // EndDate: companyData.endDate,
          // StartTime: parseTime(companyData.startTime),
          // EndTime: parseTime(companyData.endTime),
        };
        console.log("Round", companydatum);
        this.dialogRef.close({ data: companydatum });
        const calendarEvent = {
          EventStartDateTime: startDateTime,
          EventEndDateTime: endDateTime,
          EventType: companydatum.Name,
          EventDescription: companydatum.Description,
          JobInterviewRoundId: this.roundId || null,
          OrgId: this.sessionCampusId,
          CompanyId: this.sessionCompanyId,
          IsDeleted: 0,
        };
        this.testRoundsApiService.saveCalendarEvent(calendarEvent).subscribe({
          next: (response) => {
            console.log("Interview Round saved successfully:", response);
            const eventId = response.id;
            companydatum.EventId = eventId;
            this.apiInterviewRounds
              .addInterviewRounds(companydatum.Id, companydatum)
              .subscribe({
                next: (roundResponse) => {
                  console.log(
                    "JobInterviewRound saved successfully:",
                    roundResponse
                  );
                  this.roundsUpdated.emit();
                  this.dialogRef.close({ data: roundResponse });
                },
                error: (error) => {
                  console.error("Error saving JobInterviewRound:", error);
                },
              });
          },
          error: (error) => {
            console.error("Error saving Calendarevent:", error);
          },
        });
      }
    }
  }
  handleResetRounds(): void {
    this.roundAddEditForm.patchValue(this.RoundEditData);
  }
}
