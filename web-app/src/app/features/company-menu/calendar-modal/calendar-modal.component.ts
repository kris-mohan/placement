import { CommonModule } from "@angular/common";
import { Component, Inject, OnInit, signal } from "@angular/core";
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
import { Companydatum } from "src/app/services/types/Companydatum";
// import { MatDatepickerModule } from "@angular/material/datepicker";
import { interval, Subscription } from "rxjs";
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
  joinMeetingEnabled: boolean = false; // For enabling/disabling the JoinMeeting button
  private timerSubscription!: Subscription;
  // CollegeRoleId: number;
  userRole: number;
  CompanyId: number;
  showJobPostingsAndRounds = true;
  jobPostingId: number = 0;
  OrgId: number = 0;
  allCompanies = signal<Companydatum[]>([]);

  constructor(
    public dialogRef: MatDialogRef<CalendarModalComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private calendarModalApiService: CalendarModalApiService
  ) {
    this.isEdited = this.data.isEdited;
    const userRoleId = sessionStorage.getItem("userRoleId");
    this.userRole = !!userRoleId ? parseInt(userRoleId) : 0;
    const storedCompanyId = sessionStorage.getItem("CompanyId");
    console.log(storedCompanyId);
    this.CompanyId = !!storedCompanyId ? parseInt(storedCompanyId) : 0;
    console.log(this.CompanyId);
    const storedStudentId = sessionStorage.getItem("StudentId");
    console.log("storedStudentId", storedStudentId);
    this.formDataa = this.formBuilder.group({
      startTime: ["", Validators.required],
      eventType: ["interview"],
      companyId: ["", Validators.required],
      endDate: [""],
      endTime: ["", Validators.required],
      jobPosting: ["", Validators.required],
      rounds: [""],
      meetingLink: [""],
    });
    if (this.isEdited && this.data.eventData) {
      this.formDataa.patchValue(this.data.eventData);
    }
  }
  onJobPostingChange(event: any): void {
    console.log("Selected Job Posting Id", event.value);
    const selectedJobPostingId = event.value;

    const currentCompanyId = this.formDataa.value.companyId;
    this.getAllRounds(selectedJobPostingId);

    if (currentCompanyId) {
      this.formDataa.patchValue({ companyId: currentCompanyId });
    }
  }

  getJobPostings = () => {
    this.calendarModalApiService.GetAllJobPostings(this.CompanyId).subscribe({
      next: (response) => {
        const data: Jobposting[] = response.value;
        console.log(data);
        this.jobPostings = data;
        this.OrgId = data[0].CompanyId || 0;
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

  getCompanies() {
    this.calendarModalApiService.GetAllCompanies().subscribe({
      next: (response) => {
        console.log(response.value);
        const data: Companydatum[] = response.value;
        console.log(data);
        this.allCompanies.set(data);
        console.log(this.allCompanies());
        this.setCompanyField();
      },
    });
  }

  onCompanySelected(event: any): void {
    console.log(event.value);
    this.CompanyId = event.value;
    this.formDataa.patchValue({ companyId: this.CompanyId });

    if (this.userRole !== 2) {
      this.getJobPostings();
    }
  }

  onEventTypeChange(event: any): void {
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
        //meetingLink: this.formDataa.value.meetingLink.trim(),
        weekdays: this.weekdays, // Add the weekdays state
        OrgId: this.OrgId,
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
    this.getCompanies();

    if (!!this.CompanyId) {
      console.log(this.CompanyId);
      this.getJobPostings();
    }
    if (this.data.isEdited && this.data.eventData) {
      this.getJobPostingById();
    }
    this.monitorMeetingTimes();
  }

  setCompanyField() {
    if (this.CompanyId) {
      console.log(this.CompanyId);
      this.formDataa.patchValue({ companyId: this.CompanyId });
      // this.formDataa.get("companyId")?.disable(); // Disable the companyId field if CompanyId exists
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
        meetingLink: this.data.eventData.meetingLink,
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
    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${period}`;
  }
  monitorMeetingTimes(): void {
    this.timerSubscription = interval(1000).subscribe(() => {
      const now = new Date();
      const startTime = this.parseTime(this.formDataa.value.startTime);
      const endTime = this.parseTime(this.formDataa.value.endTime);

      if (startTime && endTime) {
        const timeBeforeStart = (startTime.getTime() - now.getTime()) / 60000; // Time in minutes
        this.joinMeetingEnabled =
          timeBeforeStart <= 10 && now.getTime() < endTime.getTime();
      } else {
        this.joinMeetingEnabled = false;
      }
    });
  }
  parseTime(timeStr: string): Date | null {
    const date = new Date();
    const timeParts = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/);
    if (timeParts) {
      let hours = parseInt(timeParts[1], 10);
      const minutes = parseInt(timeParts[2], 10);
      const period = timeParts[3];

      if (period === "PM" && hours < 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;

      date.setHours(hours, minutes, 0, 0);
      return date;
    }
    return null;
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
