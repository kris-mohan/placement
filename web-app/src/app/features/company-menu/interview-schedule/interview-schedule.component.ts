import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";

import { MatDialogModule } from "@angular/material/dialog";
import { MatDialog } from "@angular/material/dialog";

import { FullCalendarModule } from "@fullcalendar/angular";
import { CalendarOption } from "@fullcalendar/angular/private-types";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
// import { CalendarOptions } from "@fullcalendar/angular";
import { CalendarOptions, EventApi } from "@fullcalendar/core";
import { FormBuilder } from "@angular/forms";
import { CalendarModalComponent } from "../calendar-modal/calendar-modal.component";

@Component({
  selector: "app-interview-schedule",
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: "./interview-schedule.component.html",
  styleUrl: "./interview-schedule.component.css",
})
export class InterviewScheduleComponent implements OnInit {
  newEventDate: any;

  private eventIDCounter = 0;
  currentEvents: EventApi[] = [];

  calendarEvents: any[] = [
    {
      id: this.eventIDCounter++,
      title: "Meeting",
      start: new Date().setDate(new Date().getDate() + 1),
      end: new Date().setDate(new Date().getDate() + 2),
      className: "bg-warning text-white",
    },
    {
      id: this.eventIDCounter++,
      title: "Lunch",
      start: new Date(),
      end: new Date(),
      className: "bg-success text-white",
    },
    {
      id: this.eventIDCounter++,
      title: "Birthday - party",
      start: new Date().setDate(new Date().getDate() + 8),
      className: "bg-info text-white",
    },
    {
      id: this.eventIDCounter++,
      title: "Long Event",
      start: new Date().setDate(new Date().getDate() + 7),
      end: new Date().setDate(new Date().getDate() + 8),
      className: "bg-primary text-white",
    },
  ];

  constructor(
    private dialog: MatDialog // Inject MatDialog instead of NgbModal
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
  }

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: "dayGridMonth,dayGridWeek,dayGridDay",
      center: "title",
      right: "prevYear,prev,next,nextYear",
    },
    events: this.calendarEvents,
    editable: true,
    selectable: true,
    selectMirror: true,
    initialView: "dayGridMonth", // Default view
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin], // Register the plugins
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventTimeFormat: {
      // like '14:30:00'
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    },
    eventsSet: this.handleEvents.bind(this),
  };

  /**
   * Events bind in calander
   * @param events events
   */
  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  handleDateClick(event?: any) {
    this.newEventDate = event;
    const dialogRef = this.dialog.open(CalendarModalComponent, {
      width: "400px",
      data: { date: this.newEventDate.date }, // Pass the clicked date to the modal
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.addNewEvent(result);
      }
    });
  }

  addNewEvent(result: any) {
    // const title = prompt("Enter event title:");
    
    if (result) {
      const title = result.eventName;
      const className = result.round;
      const calendarApi = this.newEventDate.view.calendar;
      calendarApi.addEvent({
        id: this.eventIDCounter++,
        title: title,
        start: this.newEventDate.date,
        end: this.newEventDate.date,
        className: className + ' ' + 'text-white'
      });
    }
  }

  handleEventClick(event?: any) {}
  // events: any;

  loadInitialData(): void {
    this.calendarEvents = [
      {
        id: 0,
        title: "Meeting",
        start: new Date().setDate(new Date().getDate() + 1),
        end: new Date().setDate(new Date().getDate() + 2),
        className: "bg-warning text-white",
      },
      {
        id: 1,
        title: "Lunch",
        start: new Date(),
        end: new Date(),
        className: "bg-success text-white",
      },
      {
        id: 2,
        title: "Birthday - party",
        start: new Date().setDate(new Date().getDate() + 8),
        className: "bg-info text-white",
      },
      {
        id: 3,
        title: "Long Event",
        start: new Date().setDate(new Date().getDate() + 7),
        end: new Date().setDate(new Date().getDate() + 8),
        className: "bg-primary text-white",
      },
    ];
  }
}
