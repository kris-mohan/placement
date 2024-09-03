import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
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
  calendarEventId: string | null = null;
  Id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiCalendarEventsService: CalendarEventAPIService
  ) {
    this.addEditCalendarEventForm = this.fb.group({
      Id: null,
      EventStartDateTime: "",
      EventEndDateTime: "",
      EventType: "",
      EventDescription: "",
      OrgId: null,
      CompanyId: null,
    });
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
}
