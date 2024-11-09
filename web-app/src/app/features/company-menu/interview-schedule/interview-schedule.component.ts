import { CommonModule } from "@angular/common";
import { Component, OnInit, signal, WritableSignal } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FullCalendarModule } from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarOptions, EventApi } from "@fullcalendar/core";
import { CalendarModalComponent } from "../calendar-modal/calendar-modal.component";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { InterviewScheduleAPIService } from "./api.interview-schedule";
import { Colleges, Universities } from "src/app/services/types/Universities";
import { ODataEntity } from "src/app/services/types/OData";
import { PostCalendarevent } from "src/app/services/types/Calendarevent";
import { InterviewScheduleApiService } from "./InterviewScheduleApiService";

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

  isEdited: boolean = false;
  editedId: number = 0;

  private eventIDCounter = 0;
  currentEvents: EventApi[] = [];

  universityTypes: WritableSignal<Universities[]> = signal([]);
  // companiesList: WritableSignal<Companydatum[]> = signal([]);

  // colleges : signal<Colleges[]>([]);
  colleges: WritableSignal<Colleges[]> = signal([]);

  // events = [
  //   {
  //     companyName: "Capgemini",
  //     jobTitle: "Associate Software Engineer",
  //     Round: 3,
  //     RoundName: "Technical Round",
  //     eventDate: "05-10-2024",
  //     timings: "10:00 AM - 12:00 PM",
  //     duration: "2 hours",
  //   },
  //   {
  //     companyName: "Accenture",
  //     jobTitle: "Software Developer",
  //     Round: 1,
  //     RoundName: "Test Assesment",
  //     eventDate: "05-10-2024",
  //     timings: "2:00 PM - 3:30 PM",
  //     duration: "1.5 hours",
  //   },
  //   {
  //     companyName: "Google",
  //     jobTitle: "QA",
  //     Round: 2,
  //     RoundName: "Interview-1",
  //     eventDate: "05-10-2024",
  //     timings: "9:00 AM - 1:00 PM",
  //     duration: "4 hours",
  //   },
  // ];

  events: any[] = [];
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
    private dialog: MatDialog,
    private apiInterviewSchedule: InterviewScheduleApiService,
    private apiInterviewSchedule1: InterviewScheduleAPIService
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
    this.GetUniversties();
    this.GetColleges();
    this.getInterviewSchedule();
  }

  async GetUniversties() {
    this.apiInterviewSchedule1.getUniversities().subscribe({
      next: (odataResponse) => {
        this.universityTypes.set(odataResponse.value);
      },
      error: (error) => {
        console.error("Error fetching companies:", error);
      },
    });
  }

  async GetColleges() {
    this.apiInterviewSchedule1.getColleges().subscribe({
      next: (odataResponse) => {
        this.colleges.set(odataResponse.value);
      },
      error: (error) => {
        console.error("Error fetching colleges:", error);
      },
    });
  }

  trackById(index: number, item: any): number {
    return item.Id;
  }

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: "dayGridMonth,dayGridWeek,dayGridDay",
      center: "title",
      right: "prevYear,prev,next,nextYear",
    },
    events: this.calendarEvents().map((event) => ({
      ...event,
      extendedProps: {
        jobRoles: event.jobRole,
      },
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
        this.addEditNewEvent(result);
      }
    });
  }

  addEditNewEvent(result: any) {
    if (result) {
      console.log("New event", result);
      const title = result.eventName;
      // const jobRole = result.jobRole;
      const className = "bg-primary text-white";
      let startTime: Date | null = null;
      if (typeof result.startTime === "string") {
        const timeParts = result.startTime.match(/(\d+):(\d+)\s*(AM|PM)/);
        if (timeParts) {
          console.log("marker", timeParts);
          let hours = parseInt(timeParts[1], 10);
          const minutes = parseInt(timeParts[2], 10);
          const period = timeParts[3];

          // Convert hours to 24-hour format if PM
          if (period === "PM" && hours < 12) {
            hours += 12;
          } else if (period === "AM" && hours === 12) {
            hours = 0;
          }
          console.log(this.newEventDate.date);
          startTime = this.isEdited
            ? new Date(this.newEventDate.event.start)
            : new Date(this.newEventDate.date); // Create a new Date object from the selected date
          console.log(startTime);
          startTime.setHours(hours, minutes); // Set hours and minutes
          console.log(startTime);
        }
      } else {
        // If it's already a Date object
        startTime = result.startTime;
      }

      console.log("Start Time", startTime);

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

          endTime = this.isEdited
            ? new Date(this.newEventDate.event.end)
            : new Date(this.newEventDate.date); // Create a new Date object from the selected date
          endTime.setHours(hours, minutes); // Set hours and minutes
        }
      } else {
        // If it's already a Date object
        endTime = result.endTime;
      }

      console.log("End Time", endTime);

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
      if (endDate && endTime && !this.isEdited) {
        endDate?.setHours(endTime?.getHours(), endTime?.getMinutes());
      }

      console.log("End Date", endDate);

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

              // calendarApi.addEvent({
              //   id: this.eventIDCounter++,
              //   title: title,
              //   start: startTime,
              //   end: endTime,
              //   className: className,
              //   jobRoles: jobRole,
              // });

              // calendarApi.addEvent({
              //   id: this.eventIDCounter++,
              //   title: title,
              //   start: new Date(currentDate),
              //   end: endOfDay,
              //   className: className,
              // });

              if (this.isEdited) {
                const newEventData: PostCalendarevent = {
                  EventType: title,
                  EventStartDateTime: startTime,
                  EventEndDateTime: endTime,
                  EventDescription: title,
                  OrgId: 1,
                  CompanyId: 4,
                };
                this.updateCalendarEventHandler(this.editedId, newEventData);
              } else {
                const newEventData: PostCalendarevent = {
                  EventType: title,
                  EventStartDateTime: startTime,
                  EventEndDateTime: endTime,
                  EventDescription: title,
                  OrgId: 1,
                  CompanyId: 4,
                };
                console.log("New Event Data:", newEventData);
                this.saveCalendarEventHandler(newEventData);

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
            }
          } else {
            if (endTime) {
              endOfDay.setHours(endTime.getHours(), endTime.getMinutes());
            } else {
              // If endTime is null, set a default end time (e.g., 11:59 PM)
              endOfDay.setHours(23, 59);
            }

            // endOfDay.setHours(endTime.getHours(), endTime.getMinutes());

            // calendarApi.addEvent({
            //   id: this.eventIDCounter++,
            //   title: title,
            //   start: new Date(currentDate),
            //   end: endOfDay,
            //   className: className,
            // });
            console.log("Current Date", currentDate);

            if (this.isEdited) {
              const newEventData: PostCalendarevent = {
                EventType: title,
                EventStartDateTime: new Date(currentDate),
                EventEndDateTime: endOfDay,
                EventDescription: title,
                OrgId: 1,
                CompanyId: 4,
              };
              console.log("Update Event Data", newEventData);
              this.updateCalendarEventHandler(this.editedId, newEventData);
            } else {
              const newEventData: PostCalendarevent = {
                EventType: title,
                EventStartDateTime: new Date(currentDate),
                EventEndDateTime: endOfDay,
                EventDescription: title,
                OrgId: 1,
                CompanyId: 4,
              };
              console.log("New Event Data:", newEventData);
              this.saveCalendarEventHandler(newEventData);
            }

            // console.log(
            //   "id:",
            //   this.eventIDCounter++,
            //   "title:",
            //   title,
            //   "start:",
            //   new Date(currentDate),
            //   "end:",
            //   endOfDay,
            //   "className:",
            //   className
            // );
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
      } else {
        // Add a single-day event if it doesn't span multiple days
        // const calendarApi = this.newEventDate.view.calendar;
        // calendarApi.addEvent({
        //   id: this.eventIDCounter++,
        //   title: title,
        //   start: startTime,
        //   end: endTime,
        //   className: className,
        //   jobRoles: jobRole,
        // });
        if (this.isEdited) {
          console.log(this.editedId);
          const newEventData: PostCalendarevent = {
            EventType: title,
            EventStartDateTime: startTime,
            EventEndDateTime: endTime,
            EventDescription: title,
            OrgId: 1,
            CompanyId: 4,
          };
          console.log("Update Event Data", newEventData);
          this.updateCalendarEventHandler(this.editedId, newEventData);
        } else {
          const newEventData: PostCalendarevent = {
            EventType: title,
            EventStartDateTime: startTime,
            EventEndDateTime: endTime,
            EventDescription: title,
            OrgId: 1,
            CompanyId: 4,
          };
          console.log("New Event Data:", newEventData);
          this.saveCalendarEventHandler(newEventData);
        }
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
  getInterviewSchedule = () => {
    this.apiInterviewSchedule.GetInterviewSchedule().subscribe({
      next: (response) => {
        const responseList = response.value.flatMap((item: any) => {
          debugger;
          const driveDate = item.JobPosting?.DriveDate;
          const eventDate = driveDate ? GetDate(new Date(driveDate)) : "";

          return item.Jobinterviewrounds?.flatMap((i: any) => {
            return {
              jobTitle: item.JobRole,
              Round: i.Description,
              RoundName: i.Name,
              eventDate: item.DriveDate,
              // timings: ,
              // duration: ,
            };
          });
        });

        console.log(responseList, "event data");
        this.events = responseList;
      },
      error: (error) => {
        console.error("Error fetching Company Data", error);
      },
    });
  };

  handleEventClick(event?: any) {
    this.isEdited = true;
    this.editedId = event.event.id;
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
      if (result) {
        this.addEditNewEvent(result);
      }
    });
  }
  // events: any;

  loadInitialData(): void {
    // this.calendarEvents = [
    //   // {
    //   //   id: 0,
    //   //   title: "Meeting",
    //   //   start: new Date().setDate(new Date().getDate() + 1),
    //   //   end: new Date().setDate(new Date().getDate() + 2),
    //   //   className: "bg-warning text-white",
    //   // },
    //   // {
    //   //   id: 1,
    //   //   title: "Lunch",
    //   //   start: new Date(),
    //   //   end: new Date(),
    //   //   className: "bg-success text-white",
    //   // },
    //   // {
    //   //   id: 2,
    //   //   title: "Birthday - party",
    //   //   start: new Date().setDate(new Date().getDate() + 8),
    //   //   className: "bg-info text-white",
    //   // },
    //   // {
    //   //   id: 3,
    //   //   title: "Long Event",
    //   //   start: new Date().setDate(new Date().getDate() + 7),
    //   //   end: new Date().setDate(new Date().getDate() + 8),
    //   //   className: "bg-primary text-white",
    //   // },
    // ];
  }

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
