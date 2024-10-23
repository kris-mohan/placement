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
import { AMGModules } from "src/AMG-Module/AMG-module";
// import { interviewApiService } from "./api.interview";
import { Jobinterviewround } from "src/app/services/types/Jobinterviewround";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-interview-schedule",
  standalone: true,
  imports: [AMGModules, CommonModule, FullCalendarModule],
  templateUrl: "./interview-schedule.component.html",
  styleUrl: "./interview-schedule.component.css",
})
export class InterviewScheduleComponent implements OnInit {
  newEventDate: any;

  isEdited: boolean = false;

  private eventIDCounter = 0;
  currentEvents: EventApi[] = [];

  events = [
    {
      companyName: "Capgemini",
      jobTitle: "Associate Software Engineer",
      Round: 3,
      RoundName: "Technical Round",
      eventDate: "05-10-2024",
      timings: "10:00 AM - 12:00 PM",
      duration: "2 hours",
    },
    {
      companyName: "Accenture",
      jobTitle: "Software Developer",
      Round: 1,
      RoundName: "Test Assesment",
      eventDate: "05-10-2024",
      timings: "2:00 PM - 3:30 PM",
      duration: "1.5 hours",
    },
    {
      companyName: "Google",
      jobTitle: "QA",
      Round: 2,
      RoundName: "Interview-1",
      eventDate: "05-10-2024",
      timings: "9:00 AM - 1:00 PM",
      duration: "4 hours",
    },
  ];

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
    private dialog: MatDialog // Inject MatDialog instead of NgbModal // private InterviewApiService: interviewApiService
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
    // // this.Getinterview();

    // this.getinterview();
  }

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: "dayGridMonth,dayGridWeek,dayGridDay",
      center: "title",
      right: "prevYear,prev,next,nextYear",
    },
    // events: this.calendarEvents,
    events: this.calendarEvents.map((event) => ({
      ...event,
      extendedProps: {
        jobRoles: event.jobRole, // Assuming event.jobRole is defined
      },
    })),
    editable: true,
    selectable: true,
    selectMirror: true,
    initialView: "dayGridMonth", // Default view
    weekends: true,
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
    this.isEdited = false;
    console.log(event);
    console.log(this.newEventDate.date);
    const dialogRef = this.dialog.open(CalendarModalComponent, {
      width: "70vw",
      data: { date: this.newEventDate.date, isEdited: this.isEdited }, // Pass the clicked date to the modal
      panelClass: "custom-dialog-container",
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
      const jobRole = result.jobRole;
      const className = "bg-primary text-white";
      let startTime: Date | null = null;
      if (typeof result.startTime === "string") {
        const timeParts = result.startTime.match(/(\d+):(\d+)\s*(AM|PM)/);
        if (timeParts) {
          let hours = parseInt(timeParts[1], 10);
          const minutes = parseInt(timeParts[2], 10);
          const period = timeParts[3];

          // Convert hours to 24-hour format if PM
          if (period === "PM" && hours < 12) {
            hours += 12;
          } else if (period === "AM" && hours === 12) {
            hours = 0;
          }

          startTime = new Date(this.newEventDate.date); // Create a new Date object from the selected date
          startTime.setHours(hours, minutes); // Set hours and minutes
        }
      } else {
        // If it's already a Date object
        startTime = result.startTime;
      }

      console.log(startTime);

      let endTime: Date | null = null;
      if (typeof result.endTime === "string") {
        const timeParts = result.endTime.match(/(\d+):(\d+)\s*(AM|PM)/);
        if (timeParts) {
          let hours = parseInt(timeParts[1], 10);
          const minutes = parseInt(timeParts[2], 10);
          const period = timeParts[3];

          // Convert hours to 24-hour format if PM
          if (period === "PM" && hours < 12) {
            hours += 12;
          } else if (period === "AM" && hours === 12) {
            hours = 0;
          }

          endTime = new Date(this.newEventDate.date); // Create a new Date object from the selected date
          endTime.setHours(hours, minutes); // Set hours and minutes
        }
      } else {
        // If it's already a Date object
        endTime = result.endTime;
      }

      console.log(endTime);

      // console.log(typeof(startTime));
      // const startDateTime = new Date(this.newEventDate.date);
      // startDateTime.setHours(startTime.getHours(), startTime.getMinutes());

      // let endDateTime;
      // if (result.endDate) {
      //   const endDate = result.endDate;
      //   endDateTime = new Date(endDate);
      //   endDateTime.setHours(23, 59);
      // }
      // else{
      //   endDateTime = startTime;
      // }

      const endDate = result.endDate ? new Date(result.endDate) : startTime;
      if (endDate && endTime) {
        endDate?.setHours(endTime?.getHours(), endTime?.getMinutes());
      }

      console.log(endDate);

      if (startTime && endDate && startTime < endDate) {
        const calendarApi = this.newEventDate.view.calendar;
        let currentDate = new Date(startTime);

        while (currentDate <= endDate) {
          // const nextDay = new Date(currentDate);
          // nextDay.setDate(currentDate.getDate() + 1);
          // console.log(nextDay);
          const dayOfWeek = currentDate.getDay();
          const startOfDay = new Date(currentDate);
          const endOfDay = new Date(currentDate);

          if (result.weekdays) {
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
              if (endTime) {
                endOfDay.setHours(endTime.getHours(), endTime.getMinutes());
              } else {
                // If endTime is null, set a default end time (e.g., 11:59 PM)
                endOfDay.setHours(23, 59);
              }

              // endOfDay.setHours(endTime.getHours(), endTime.getMinutes());

              calendarApi.addEvent({
                id: this.eventIDCounter++,
                title: title,
                start: startTime,
                end: endTime,
                className: className,
                jobRoles: jobRole,
              });

              console.log(
                "id:",
                this.eventIDCounter++,
                "title:",
                title,
                "start:",
                new Date(currentDate),
                "end:",
                endOfDay,
                "className:",
                className
              );
            }
          } else {
            if (endTime) {
              endOfDay.setHours(endTime.getHours(), endTime.getMinutes());
            } else {
              // If endTime is null, set a default end time (e.g., 11:59 PM)
              endOfDay.setHours(23, 59);
            }

            // endOfDay.setHours(endTime.getHours(), endTime.getMinutes());

            calendarApi.addEvent({
              id: this.eventIDCounter++,
              title: title,
              start: new Date(currentDate),
              end: endOfDay,
              className: className,
            });

            console.log(
              "id:",
              this.eventIDCounter++,
              "title:",
              title,
              "start:",
              new Date(currentDate),
              "end:",
              endOfDay,
              "className:",
              className
            );
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
      } else {
        // Add a single-day event if it doesn't span multiple days
        const calendarApi = this.newEventDate.view.calendar;
        calendarApi.addEvent({
          id: this.eventIDCounter++,
          title: title,
          start: startTime,
          end: endTime,
          className: className,
          jobRoles: jobRole,
        });
      }

      // const calendarApi = this.newEventDate.view.calendar;
      // calendarApi.addEvent({
      //   id: this.eventIDCounter++,
      //   title: title,
      //   start: startTime,
      //   end: endTime,
      //   className: className,
      // });
    }
  }

  handleEventClick(event?: any) {
    this.isEdited = true;
    this.newEventDate = event;
    console.log(event);
    console.log(this.newEventDate);
    // console.log(event.event.extendedProps.jobRole);
    console.log(event.event.start);
    // console.log(event.event.end);
    const dialogRef = this.dialog.open(CalendarModalComponent, {
      width: "70vw",
      data: {
        eventData: {
          title: event.event.title,
          start: event.event.start,
          end: event.event.end ? event.event.end : null,
          jobRole: event.event.extendedProps.jobRoles || "",
        },
        isEdited: this.isEdited,
        date: event.event.start,
      }, // Pass the clicked date to the modal
      panelClass: "custom-dialog-container",
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.addNewEvent(result);
      }
    });
  }
  // events: any;

  loadInitialData(): void {
    this.calendarEvents = [
      // {
      //   id: 0,
      //   title: "Meeting",
      //   start: new Date().setDate(new Date().getDate() + 1),
      //   end: new Date().setDate(new Date().getDate() + 2),
      //   className: "bg-warning text-white",
      // },
      // {
      //   id: 1,
      //   title: "Lunch",
      //   start: new Date(),
      //   end: new Date(),
      //   className: "bg-success text-white",
      // },
      // {
      //   id: 2,
      //   title: "Birthday - party",
      //   start: new Date().setDate(new Date().getDate() + 8),
      //   className: "bg-info text-white",
      // },
      // {
      //   id: 3,
      //   title: "Long Event",
      //   start: new Date().setDate(new Date().getDate() + 7),
      //   end: new Date().setDate(new Date().getDate() + 8),
      //   className: "bg-primary text-white",
      // },
    ];
  }
}
