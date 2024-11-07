import { CommonModule } from "@angular/common";
import { Component, OnInit, signal } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FullCalendarModule } from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarOptions, EventApi } from "@fullcalendar/core";
import { CalendarModalComponent } from "../calendar-modal/calendar-modal.component";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { Jobposting } from "src/app/services/types/Jobposting";
import { Jobinterviewround } from "src/app/services/types/Jobinterviewround";
import { InterviewScheduleApiService } from "./InterviewScheduleApiService";
import {
  Calendarevent,
  PostCalendarevent,
} from "src/app/services/types/Calendarevent";
import { identity } from "rxjs";

type calendarEvent = {
  // id: string;
  title: string;
  start: Date;
  end: Date;
  // className: string;
};
@Component({
  selector: "app-interview-schedule",
  standalone: true,
  imports: [AMGModules, CommonModule, FullCalendarModule],
  templateUrl: "./interview-schedule.component.html",
  styleUrl: "./interview-schedule.component.css",
})
export class InterviewScheduleComponent implements OnInit {
  newEventDate: any;
  //events = signal<Jobposting[]>([]);
  jobinterviewroundsData = signal<Jobinterviewround[]>([]);
  isEdited: boolean = false;

  private eventIDCounter = 0;
  currentEvents: EventApi[] = [];

  universityTypes: string[] = [
    "Visvesvaraya Technological University (VTU)",
    "Deemed University",
    "Autonomous University",
  ];

  colleges: string[] = [
    "East West Institute of Technology",
    "East West College of Engineering",
    "East West School of Architecture",
    "East West First Grade College of Science ",
    "East West College of Management",
    "East West College of Management",
    "St. John’s Pharmacy College",
    "East West College of Pharmacy",
    "East West College of Nursing",
    "East West Institute of Polytechnic",
    "East West Polytechnic",
    "East West Pre-University",
    "East West Pre-University College",
  ];
  events: any[] = [];
  calendarEvents = signal<calendarEvent[]>([]);

  constructor(
    private dialog: MatDialog,
    private interviewScheduleApiService: InterviewScheduleApiService
  ) {}
  ngOnInit(): void {
    // this.loadInitialData();
    // this.getInterviewSchedule();
    this.getCalendarData();
  }

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: "dayGridMonth,dayGridWeek,dayGridDay",
      center: "title",
      right: "prevYear,prev,next,nextYear",
    },
    events: this.calendarEvents().map((event) => ({
      ...event,
      // extendedProps: {
      //   eventDescription: event.title,
      // },
    })),
    editable: true,
    selectable: true,
    selectMirror: true,
    initialView: "dayGridMonth",
    weekends: true,
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventTimeFormat: {
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

  addNewEvent(result: any, id?: number) {
    if (result) {
      console.log(result);
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
      const newEventData: PostCalendarevent = {
        Id: id,
        EventType: title,
        EventStartDateTime: startTime,
        EventEndDateTime: endTime,
        EventDescription: title,
        OrgId: 1,
        CompanyId: 4,
      };
      console.log("New Event Data:", newEventData);
      this.saveCalendarEventHandler(newEventData);
      const endDate = result.endDate ? new Date(result.endDate) : startTime;
      if (endDate && endTime) {
        endDate?.setHours(endTime?.getHours(), endTime?.getMinutes());
      }

      console.log(endDate);

      if (startTime && endDate && startTime < endDate) {
        const calendarApi = this.newEventDate.view.calendar;
        let currentDate = new Date(startTime);

        while (currentDate <= endDate) {
          const dayOfWeek = currentDate.getDay();
          const startOfDay = new Date(currentDate);
          const endOfDay = new Date(currentDate);

          if (result.weekdays) {
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
              if (endTime) {
                endOfDay.setHours(endTime.getHours(), endTime.getMinutes());
              } else {
                endOfDay.setHours(23, 59);
              }
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
              endOfDay.setHours(23, 59);
            }
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
          id: event.event.id,
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
      const calendarData: PostCalendarevent = {
        Id: event.event.id,
        EventStartDateTime: result.startTime,
        EventEndDateTime: result.endTime,
        EventDescription: result.eventName,
      };
      console.log(calendarData);
      if (result) {
        this.updateCalendarEventHandler(event.event.id, calendarData);
      }
    });
  }
  // events: any;

  loadInitialData(): void {}
  getCalendarData = () => {
    this.interviewScheduleApiService.GetCalendarData().subscribe({
      next: (response) => {
        const responeList: calendarEvent[] = response.value.map((x) => {
          return {
            id: x.Id.toString(),
            title: x.EventType,
            start: new Date(x.EventStartDateTime),
            end: new Date(x.EventEndDateTime),
            className: "bg-warning text-white",
          };
        });
        this.calendarOptions.events = responeList;
        this.calendarEvents.set(responeList);
        console.log(this.calendarEvents());
      },
      error: (error) => {
        console.error("Error fetching Student details:", error);
      },
    });
  };
  saveCalendarEventHandler = (event: PostCalendarevent) => {
    this.interviewScheduleApiService.saveCalendarEvent(event).subscribe({
      next: (response) => {
        console.log("Calendar event saved successfully:", response);
        // this.calendarEvents();
        this.getCalendarData();
      },
      error: (error) => {
        console.error("Error saving calendar event:", error);
      },
    });
  };
  updateCalendarEventHandler(id: number, event: PostCalendarevent) {
    this.interviewScheduleApiService.updateCalendarEvent(id, event).subscribe({
      next: (response) => {
        console.log("Calendar event updated successfully:", response);
        this.getCalendarData();
      },
      error: (error) => {
        console.error("Error updating calendar event:", error);
      },
    });
  }
}
