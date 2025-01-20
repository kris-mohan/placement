import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { CalendarEventAPIService } from "../api.calendar.events";

import {
  PostCalendarevent,
  PostCalEvent,
} from "src/app/services/types/Calendarevent";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";

@Component({
  selector: "app-add-edit-calendar-events",
  standalone: true,
  imports: [
    CommonModule,
    AMGModules,
    SharedModule,
    NgxMaterialTimepickerModule,
  ],
  templateUrl: "./add-edit-calendar-events.component.html",
  styleUrl: "./add-edit-calendar-events.component.css",
})
export class AddEditCalendarEventsComponent {
  addEditCalendarEventForm: FormGroup;
  calendarEventForm: FormGroup;
  calendarEventId: string | null = null;
  Id: number | null = null;
  sweetAlertService: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,

    private route: ActivatedRoute,

    private apiCalendarEventsService: CalendarEventAPIService
  ) {
    this.addEditCalendarEventForm = this.fb.group({
      Id: null,
      EventStartDateTime: ["", [Validators.required]],
      EventEndDateTime: ["", [Validators.required]],
      EventEndTime: ["", [Validators.required]], // Add missing control
      EventType: ["", [Validators.required]],
      EventDescription: ["", [Validators.required]],
      OrgId: null,
      CompanyId: null,
    });

    this.calendarEventForm = this.fb.group({
      EventStartTime: ["", [Validators.required]], // Ensure this control is defined
      EventEndTime: ["", [Validators.required]], // Ensure this control is defined
      EventStartDateTime: ["", [Validators.required]],
      EventEndDateTime: ["", [Validators.required]],
      EventType: ["", [Validators.required]],
      EventDescription: ["", [Validators.required]],
    });
  }

  async onSubmit(): Promise<void> {
    debugger;
      console.log("Action Text (Before Validation):", this.calendarEventId);

    if (this.calendarEventForm.invalid) {
      this.sweetAlertService.error("Please enter all the required field .");
      return;
    }
    const formValue = this.calendarEventForm.value;
    // // Parse and validate `calendarEventId`
    // const calendarEventId =
    //   this.calendarEventId && this.calendarEventId !== "0"
    //     ? parseInt(this.calendarEventId, 10)
    //     : null;
    const isUpdate = !!this.calendarEventId && this.calendarEventId !== "0";
    const actionText = isUpdate ? "update" : "add";

    console.log("isUpdate:", isUpdate);
    console.log("Action Text:", actionText);
    // Optional: Validate start and end dates
    // if (
    //   !this.validateEventDates(
    //     formValue.EventStartDateTime,
    //     formValue.EventEndDateTime
    //   )
    // ) {
    //   this.sweetAlertService.error(
    //     "End Date Time must be after Start Date Time"
    //   );
    //   return;
    // }

    const confirmed = await this.sweetAlertService.confirm(
      `Do you want to ${actionText} this event?`
    );
    console.log("Confirmed Data ", confirmed);
    if (confirmed) {
        console.log("Confirmed Action Text:", actionText);

      const companydatum = {
        EventStartDateTime: formValue.EventStartDateTime ?? "",
        EventEndDateTime: formValue.EventEndDateTime ?? "",
        EventType: formValue.EventType ?? "",
        EventDescription: formValue.EventDescription ?? "",
      };
      const calendarEventId =
        this.calendarEventId === "0"
          ? null
          : parseInt(this.calendarEventId ?? "0");

      this.apiCalendarEventsService
        .addUpdateCalendarEvent(calendarEventId, companydatum)
        .subscribe({
          next: (response: { success: boolean; message: any }) => {
            // console.log(response);
            if (response.success) {
              this.sweetAlertService.success(response.message);
              this.router.navigate(["/campus-configuration"]);
            } else {
              this.sweetAlertService.error(response.message);
            }
          },
          error: (error) => {
            this.sweetAlertService.error("An unexpected error occurred.");
          },
        });
    }
  }
  // ngOnInit(): void {
  //   this.getCalendarEventsById();
  // }

  // getCalendarEventsById(): void {
  //   this.route.paramMap.subscribe((params) => {
  //     const id = params.get("companyId");
  //     this.Id = id !== null ? +id : null;
  //     if (this.Id) {
  //       this.apiCalendarEventsService.getCompanyDataById(this.Id).subscribe({
  //         next: (response: ODataResponse<any>) => {
  //           const Company = response.value[0];
  //           if (Company) {
  //             this.addEditCompanyForm.patchValue(Company);
  //             this.initialFormValues = this.addEditCompanyForm.value;
  //           }
  //         },
  //         error: (error) => {
  //           console.error(`Error fetching Company data by ${this.Id}`, error);
  //         },
  //       });
  //     }
  //   });
  // }

  validateEventDates(
    startDate: Date | undefined,
    endDate: Date | undefined
  ): boolean {
    if (!startDate || !endDate) {
      return false;
    }

    if (endDate <= startDate) {
      return false;
    }

    return true;
  }
  onReset(): void {}
}
