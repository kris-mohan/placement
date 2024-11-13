import { CommonModule } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { Jobinterviewround } from "src/app/services/types/Jobinterviewround";
import { Jobposting } from "src/app/services/types/Jobposting";
import { SharedModule } from "src/app/shared/shared.module";
import { CalendarModalApiService } from "./api.calendar-modal";
// import { MatDatepickerModule } from "@angular/material/datepicker";

@Component({
  selector: "app-calendar-modal",
  standalone: true,
  imports: [
    AMGModules,
    CommonModule,
    SharedModule,
    NgxMaterialTimepickerModule,
    // MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: "./calendar-modal.component.html",
  styleUrl: "./calendar-modal.component.css",
})
export class CalendarModalComponent implements OnInit {
  formDataa: FormGroup;
  roles: any[] = [];
  toggle: boolean = false;
  weekdays: boolean = false;
  isEdited: boolean = false;
  jobPostings: Jobposting[] = [];
  rounds: Jobinterviewround[] = [];
  CollegeRoleId: number;
  showJobPostingsAndRounds = true;
  jobPostingId: number = 0;

  constructor(
    public dialogRef: MatDialogRef<CalendarModalComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private calendarModalApiService: CalendarModalApiService
  ) {
    this.isEdited = this.data.isEdited;

    const storedUserRoleId = sessionStorage.getItem("CompanyId");
    this.CollegeRoleId = storedUserRoleId ? parseInt(storedUserRoleId) : 0;

    this.formDataa = this.formBuilder.group({
      // jobRole: ["", Validators.required],
      // round: ["", Validators.required],
      // panels: ["", Validators.required],
      // venueDetails: ["", Validators.required],
      // startDate: ["", Validators.required],
      startTime: ["", Validators.required],
      eventType: ["interview"],
      endDate: [""],
      endTime: ["", Validators.required],
      jobPosting: ["", Validators.required],
      rounds: [""],
    });
  }

  onJobPostingChange(event: any): void {
    console.log("Selected Job Posting Id", event.value);
    const selectedJobPostingId = event.value;
    this.getAllRounds(selectedJobPostingId);
  }

  getJobPostings = () => {
    this.calendarModalApiService
      .GetAllJobPostings(this.CollegeRoleId)
      .subscribe({
        next: (response) => {
          const data: Jobposting[] = response.value;
          console.log(data);
          this.jobPostings = data;
        },
        error: (error) => {
          console.error("Error fetching Job Postings:", error);
        },
      });
  };

  getJobPostingById = () => {
    this.calendarModalApiService
      .GetJobPostingById(this.data.eventData.jobPostingId)
      .subscribe({
        next: (response) => {
          const data: Jobposting[] = response.value;
          console.log(data[0]);
          this.jobPostingId = data[0] ? data[0].Id : 0;
          console.log(this.jobPostingId);
          this.getAllRounds(this.jobPostingId);
          this.formatEventData();
        },
        error: (error) => {
          console.error("Error fetching Job Postings:", error);
        },
      });
  };

  getAllRounds = (jobPostingId: number) => {
    this.calendarModalApiService.GetAllRounds(jobPostingId).subscribe({
      next: (response) => {
        console.log(response);
        const data: Jobinterviewround[] = response.value;
        console.log(data);
        this.rounds = data;
      },
    });
  };

  onEventTypeChange(event: any): void {
    console.log("HELLLOOOO");
    const selectedEventType = this.formDataa.value.eventType;
    console.log(selectedEventType);
    if (selectedEventType === "interview") {
      this.showJobPostingsAndRounds = true;
      // Show the job posting and rounds dropdowns
      this.formDataa.get("jobPosting")?.setValidators([Validators.required]);
      // this.formDataa.get("rounds")?.setValidators([Validators.required]);
    } else {
      // Hide job posting and rounds
      this.showJobPostingsAndRounds = false;
      this.formDataa.get("jobPosting")?.clearValidators();
      this.formDataa.get("rounds")?.clearValidators();
    }
    this.formDataa.get("jobPosting")?.updateValueAndValidity();
    this.formDataa.get("rounds")?.updateValueAndValidity();
  }

  // loadRoles(): void {
  //   this.roles = [
  //     {
  //       id: 1,
  //       name: "Software Engineer",
  //     },
  //     {
  //       id: 2,
  //       name: "Data Analyst",
  //     },
  //     {
  //       id: 3,
  //       name: "Product Manager",
  //     },
  //   ];
  // }

  onSave(): void {
    console.log(this.formDataa.value);
    if (this.formDataa.valid) {
      const returnData = {
        ...this.formDataa.value, // Spread the form values
        // toggle: this.toggle,
        weekdays: this.weekdays, // Add the weekdays state
        // Add any other specific data you want to send back
      };
      console.log(returnData);
      this.dialogRef.close(returnData);
    }
  }

  onToggleChange(event: MatCheckboxChange) {
    this.toggle = event.checked;
  }

  onWeekdaysChange(event: MatCheckboxChange) {
    this.weekdays = event.checked;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getJobPostings();

    if (this.data.isEdited && this.data.eventData) {
      this.getJobPostingById();
    }
  }

  formatEventData() {
    // Check if the dialog is opened in edit mode
    if (this.jobPostingId !== 0 && this.data.eventData.roundId) {
      // Convert start and end times to 'HH:mm' format
      // const formattedStartTime = this.formatTime(this.data.eventData.start);
      // const formattedEndTime = this.formatTime(this.data.eventData.end);
      console.log(this.data.eventData.title);

      console.log(this.data.eventData.start);
      const formattedStartTime = this.formatTime(this.data.eventData.start);
      const formattedEndTime = this.formatTime(this.data.eventData.end);
      console.log(this.data);
      // console.log("Formatted Start Time:", formattedStartTime);
      // console.log("Formatted End Time:", formattedEndTime);
      console.log("Event End Date", this.data.eventData.endDate);
      // Prefill the form with event data if isEdited is true
      this.formDataa.patchValue({
        eventType: this.data.eventData.title,
        // jobRole: this.data.eventData.jobRole || "", // Assuming jobRole is part of eventData
        startTime: formattedStartTime,
        endTime: formattedEndTime,
        endDate: null,
        jobPosting: this.jobPostingId,
        rounds: this.data.eventData.roundId,
      });
      console.log(this.formDataa.value);

      // this.toggle = !!this.data.eventData.endDate;
    }
  }

  formatTime(time: string): string {
    const date = new Date(time);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12 || 12; // The hour '0' should be '12'

    return `${hours}:${minutes} ${period}`;
  }
}
