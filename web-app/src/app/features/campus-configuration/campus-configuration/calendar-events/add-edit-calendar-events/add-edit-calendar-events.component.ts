import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
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
  ngOnInit(): void {}
}
