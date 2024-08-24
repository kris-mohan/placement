import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { CALENDAREVENT_DATA } from "../calendar-events.component";

@Component({
  selector: "app-add-edit-calendar-events",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
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
      technologyId: [null],
      name: ["", Validators.required],
      description: ["", Validators.required],
      category: ["", Validators.required],
      version: ["", Validators.required],
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this.calendarEventId = id !== null ? id : null;
      if (this.calendarEventId) {
        const technology = CALENDAREVENT_DATA.find(
          (t) => t.calendarEventId === this.calendarEventId
        );
        if (technology) {
          this.addEditCalendarEventForm.patchValue(technology);
        }
      }
    });
  }
}
