import { CommonModule } from "@angular/common";
import { Component, OnInit, signal } from "@angular/core";
import {
  ChangeDetectionStrategy,
  model,
  ChangeDetectorRef,
} from "@angular/core";
import { provideNativeDateAdapter } from "@angular/material/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { FullCalendarModule } from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarOptions, EventApi } from "@fullcalendar/core";
import {
  Jobinterviewround,
  PatchJobinterviewround,
} from "src/app/services/types/Jobinterviewround";
import { CalendarModalComponent } from "src/app/features/company-menu/calendar-modal/calendar-modal.component";
import { MatDialog } from "@angular/material/dialog";
import { PostCalendarevent } from "src/app/services/types/Calendarevent";
import { InterviewScheduleApiService } from "src/app/features/company-menu/interview-schedule/InterviewScheduleApiService";
import { APIInterviewScheduleService } from "src/app/features/company-menu/interview-schedule/api.interview-schedule";
import { CalendarModalApiService } from "src/app/features/company-menu/calendar-modal/api.calendar-modal";
import { GetDate } from "src/app/core/helper/DateHelper";
type calendarEvent = {
  title: string;
  start: Date;
  end: Date;
  jobPostingId?: number;
  round?: number;
  OrgId?: number;
};
@Component({
  selector: "app-student-calendar",
  standalone: true,
  imports: [AMGModules, CommonModule, FullCalendarModule],
  templateUrl: "./student-calendar.component.html",
  styleUrl: "./student-calendar.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
})
export class StudentCalendarComponent implements OnInit {
  newEventDate: any;
  jobinterviewroundsData = signal<Jobinterviewround[]>([]);
  isEdited: boolean = false;
  editedId: number = 0;
  constructor(
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private interviewScheduleApiService: InterviewScheduleApiService,
    private APiInterviewScheduleService: APIInterviewScheduleService,
    private calendarModalApiService: CalendarModalApiService
  ) {
    const storedCompanyId = sessionStorage.getItem("CompanyId");
    this.companyId = storedCompanyId ? parseInt(storedCompanyId) : 0;
  }
  selected = model<Date | null>(null);
  private eventIDCounter = 0;
  currentEvents: EventApi[] = [];
  roundsId: number = 0;
  jobPostingId: number = 0;
  OrgId: number = 0;

  roundsIdForBatchCall: Jobinterviewround[] = [];
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

  //events: any[] = [];

  calendarEvents = signal<calendarEvent[]>([]);
  companyId: number = 0;

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
        jobPostingId: event.jobPostingId,
        round: event.round,
        OrgId: event.OrgId,
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
  ngOnInit() {
    this.getCalendarData();
  }

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
      this.roundsId = result.rounds;
      this.jobPostingId = result.jobPosting;
      this.OrgId = result.OrgId;
      const title = result.eventType;
      const className = "bg-primary text-white";

      let startTime: Date | null = null;

      if (typeof result.startTime === "string") {
        const timeParts = result.startTime.match(/(\d+):(\d+)\s*(AM|PM)/);
        if (timeParts) {
          console.log("marker", timeParts);
          let hours = parseInt(timeParts[1], 10);
          const minutes = parseInt(timeParts[2], 10);
          const period = timeParts[3];

          if (period === "PM" && hours < 12) {
            hours += 12;
          } else if (period === "AM" && hours === 12) {
            hours = 0;
          }
          console.log(this.newEventDate.date);
          startTime = this.isEdited
            ? new Date(this.newEventDate.event.start)
            : new Date(this.newEventDate.date);
          console.log(startTime);
          startTime.setHours(hours, minutes); // Set hours and minutes
          console.log(startTime);
        }
      } else {
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
          if (period === "PM" && hours < 12) {
            hours += 12;
          } else if (period === "AM" && hours === 12) {
            hours = 0;
          }

          endTime = this.isEdited
            ? new Date(this.newEventDate.event.end)
            : new Date(this.newEventDate.date);
          endTime.setHours(hours, minutes);
        }
      } else {
        endTime = result.endTime;
      }

      console.log("End Time", endTime);
      const endDate = result.endDate ? new Date(result.endDate) : endTime;
      if (endDate && endTime && !this.isEdited) {
        endDate?.setHours(endTime?.getHours(), endTime?.getMinutes());
      }

      console.log("End Date", endDate);

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
              if (this.isEdited) {
                const newEventData: PostCalendarevent = {
                  EventType: title,
                  EventStartDateTime: startTime,
                  EventEndDateTime: endTime,
                  EventDescription: title,
                  OrgId: this.OrgId,
                  CompanyId: this.companyId,
                };
                this.updateCalendarEventHandler(this.editedId, newEventData);
              } else {
                const newEventData: PostCalendarevent = {
                  EventType: title,
                  EventStartDateTime: startTime,
                  EventEndDateTime: endTime,
                  EventDescription: title,
                  OrgId: this.OrgId,
                  CompanyId: this.companyId,
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
              endOfDay.setHours(23, 59);
            }
            console.log("Current Date", currentDate);

            if (this.isEdited) {
              const newEventData: PostCalendarevent = {
                EventType: title,
                EventStartDateTime: new Date(currentDate),
                EventEndDateTime: endOfDay,
                EventDescription: title,
                OrgId: this.OrgId,
                CompanyId: this.companyId,
              };
              console.log("Update Event Data", newEventData);
              this.updateCalendarEventHandler(this.editedId, newEventData);
            } else {
              const newEventData: PostCalendarevent = {
                EventType: title,
                EventStartDateTime: new Date(currentDate),
                EventEndDateTime: endOfDay,
                EventDescription: title,
                OrgId: this.OrgId,
                CompanyId: this.companyId,
              };
              console.log("New Event Data:", newEventData);
              this.saveCalendarEventHandler(newEventData);
            }
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
      } else {
        if (this.isEdited) {
          console.log(this.editedId);
          const newEventData: PostCalendarevent = {
            EventType: title,
            EventStartDateTime: startTime,
            EventEndDateTime: endTime,
            EventDescription: title,
            OrgId: this.OrgId,
            CompanyId: this.companyId,
          };
          console.log("Update Event Data", newEventData);
          this.updateCalendarEventHandler(this.editedId, newEventData);
        } else {
          const newEventData: PostCalendarevent = {
            EventType: title,
            EventStartDateTime: startTime,
            EventEndDateTime: endTime,
            EventDescription: title,
            OrgId: this.OrgId,
            CompanyId: this.companyId,
          };
          console.log("New Event Data:", newEventData);
          this.saveCalendarEventHandler(newEventData);
        }
      }
    }
  }

  getInterviewSchedule = () => {
    this.interviewScheduleApiService.GetInterviewSchedule().subscribe({
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
    console.log(event.event.start);
    const dialogRef = this.dialog.open(CalendarModalComponent, {
      width: "70vw",
      data: {
        eventData: {
          id: event.event.id,
          title: event.event.title,
          start: event.event.start,
          end: event.event.end ? event.event.end : null,
          jobRole: event.event.extendedProps.jobRoles || "",
          jobPostingId: event.event.extendedProps.jobPostingId || 0, // Extract jobPostingId from extendedProps
          roundId: event.event.extendedProps.round || "", // Extract round description from extendedProps
        },
        isEdited: this.isEdited,
        date: event.event.start,
      },
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
        this.addEditNewEvent(result);
      }
    });
  }

  loadInitialData(): void {}
  getCalendarData = () => {
    this.interviewScheduleApiService.GetCalendarData().subscribe({
      next: (response) => {
        console.log(response.value);
        const responeList: calendarEvent[] = response.value.map((x) => {
          const rounds =
            x.Jobinterviewrounds.length > 1
              ? undefined
              : x.Jobinterviewrounds[0]?.Id;
          return {
            id: x.Id.toString(),
            title: x.EventType,
            start: new Date(x.EventStartDateTime),
            end: new Date(x.EventEndDateTime),
            extendedProps: {
              jobPostingId: x.Jobinterviewrounds[0]
                ? x.Jobinterviewrounds[0].JobPostingId
                : 0,
              round: rounds,
            },
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
        console.log(this.roundsId);

        const id = response.id;
        console.log(id);
        const updateJobInterviewRoundData = {
          Id: this.roundsId,
          EventId: id,
        };
        if (this.roundsId) {
          this.updateJobInterviewRoundsHandler(
            this.roundsId,
            updateJobInterviewRoundData
          );
        } else {
          this.getAllRounds(this.jobPostingId, id);
        }
        this.getCalendarData();
      },
      error: (error) => {
        console.error("Error saving calendar event:", error);
      },
    });
  };
  updateJobInterviewRoundsHandler = (
    id: number,
    event: PatchJobinterviewround
  ) => {
    this.interviewScheduleApiService
      .updateJobinterviewRounds(id, event)
      .subscribe({
        next: (response) => {
          console.log("Job Interview Rounds updated successfully:", response);
        },
        error: (error) => {
          console.error("Error updating Job Interview Rounds:", error);
        },
      });
  };

  getAllRounds = (jobPostingId: number, eventId: number) => {
    this.calendarModalApiService.GetAllRounds(jobPostingId).subscribe({
      next: (response) => {
        console.log(response);
        const data: Jobinterviewround[] = response.value;
        console.log(data);
        this.roundsIdForBatchCall = data;
        const eventData = this.roundsIdForBatchCall.map((round) => ({
          Id: round.Id,
          EventId: eventId,
        }));
        console.log(eventData);
        this.updateJobInterviewRoundsBatchHandler(eventData);
      },
    });
  };
  updateJobInterviewRoundsBatchHandler = (event: PatchJobinterviewround[]) => {
    this.interviewScheduleApiService
      .updateJobInterviewRoundsBatch(event)
      .subscribe({
        next: (response) => {
          console.log("Job Interview Rounds updated succesdfully:", response);
        },
        error: (error) => {
          console.error("Error updating Job Interview Rounds:", error);
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
