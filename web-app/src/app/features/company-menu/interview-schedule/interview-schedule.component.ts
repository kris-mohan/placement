import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

import { MatDialogModule } from "@angular/material/dialog";
import { MatDialog } from "@angular/material/dialog";

import { FullCalendarModule } from "@fullcalendar/angular";
import { CalendarOption } from "@fullcalendar/angular/private-types";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
// import { CalendarOptions } from "@fullcalendar/angular";
import { CalendarOptions } from "@fullcalendar/core";
import { FormBuilder } from "@angular/forms";
import { CalendarModalComponent } from "../calendar-modal/calendar-modal.component";

@Component({
  selector: "app-interview-schedule",
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: "./interview-schedule.component.html",
  styleUrl: "./interview-schedule.component.css",
})
export class InterviewScheduleComponent {
  newEventDate: any;
  constructor(
    private dialog: MatDialog, // Inject MatDialog instead of NgbModal
    private formBuilder: FormBuilder
  ) {}

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: "dayGridMonth,dayGridWeek,dayGridDay",
      center: "title",
      right: "prevYear,prev,next,nextYear",
    },
    initialView: "dayGridMonth", // Default view
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin], // Register the plugins
    dateClick: this.handleDateClick.bind(this),
  };
  handleDateClick(event?: any) {
    this.newEventDate = event.date;
    const dialogRef = this.dialog.open(CalendarModalComponent, {
      width: "400px",
      data: { date: this.newEventDate }, // Pass the clicked date to the modal
    });
    dialogRef.afterClosed();
  }
  events: any;  
}


