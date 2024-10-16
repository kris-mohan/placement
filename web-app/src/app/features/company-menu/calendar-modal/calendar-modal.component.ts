import { CommonModule } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
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
  isEdited: boolean;

  constructor(
    public dialogRef: MatDialogRef<CalendarModalComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdited = this.data.isEdited;

    this.formDataa = this.formBuilder.group({
      eventName: ["", Validators.required],
      jobRole: ["", Validators.required],
      // round: ["", Validators.required],
      // panels: ["", Validators.required],
      // venueDetails: ["", Validators.required],
      // startDate: ["", Validators.required],
      startTime: ["", Validators.required],
      endDate: [""],
      endTime: ["", Validators.required],
    });
  }

  loadRoles(): void {
    this.roles = [
      {
        id: 1,
        name: "Software Engineer",
      },
      {
        id: 2,
        name: "Data Analyst",
      },
      {
        id: 3,
        name: "Product Manager",
      },
    ];
  }

  onSave(): void {
    if (this.formDataa.valid) {
      const returnData = {
        ...this.formDataa.value, // Spread the form values
        // toggle: this.toggle,
        weekdays: this.weekdays, // Add the weekdays state
        // Add any other specific data you want to send back
      };
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
    this.loadRoles();
    // Check if the dialog is opened in edit mode
    if (this.data.isEdited && this.data.eventData) {
      // Convert start and end times to 'HH:mm' format
      // const formattedStartTime = this.formatTime(this.data.eventData.start);
      // const formattedEndTime = this.formatTime(this.data.eventData.end);
      console.log(this.data.eventData.title);

      console.log(this.data.eventData.start);
      const formattedStartTime = this.formatTime(this.data.eventData.start);
      const formattedEndTime = this.formatTime(this.data.eventData.end);
      console.log(this.data);
      console.log("Formatted Start Time:", formattedStartTime);
      console.log("Formatted End Time:", formattedEndTime);
      // Prefill the form with event data if isEdited is true
      this.formDataa.patchValue({
        eventName: this.data.eventData.title,
        jobRole: this.data.eventData.jobRole || "", // Assuming jobRole is part of eventData
        startTime: formattedStartTime,
        endTime: formattedEndTime,
        endDate: this.data.eventData.endDate,
      });

      // this.toggle = !!this.data.eventData.endDate;
    }
  }

  // formatTime(date: Date | string): string {
  //   const time = new Date(date);
  //   const hours = time.getHours().toString().padStart(2, "0");
  //   const minutes = time.getMinutes().toString().padStart(2, "0");
  //   return `${hours}:${minutes}`;
  // }

  // formatTime(time: string): string {
  //   const date = new Date(time);
  //   const hours = date.getHours().toString().padStart(2, "0");
  //   const minutes = date.getMinutes().toString().padStart(2, "0");
  //   return `${hours}:${minutes}`;
  // }

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
