import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { CalendarEventAPIService } from "../api.calendar.events";

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
  calendarEventId: number | null = null;
  Id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService,

    private apiCalendarEventsService: CalendarEventAPIService
  ) {
    this.addEditCalendarEventForm = this.fb.group({
      Id: null,
      EventStartDateTime: "",
      EventEndDateTime: "",
      EventStartTime: "",
      EventEndTime: "",
      EventType: "",
      EventDescription: "",
      OrgId: null,
      CompanyId: null,
    });
  }
  async onSubmit(): Promise<void> {
    const roleData: Partial<any> = this.addEditCalendarEventForm.value;
    const isUpdate = !!this.Id;
    const actionText = isUpdate ? "update" : "add";
    const confirmed = await this.sweetAlertService.confirm(
      `Do you want to ${actionText} add Calendar Event?`
    );

    if (confirmed) {
      this.apiCalendarEventsService
        .addUpdateCalendarEvent(this.Id, roleData)
        .subscribe({
          next: (response: { success: boolean; message: any }) => {
            console.log(response);
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

  onReset() {
    this.addEditCalendarEventForm.reset();
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
