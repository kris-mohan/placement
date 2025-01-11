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
import { CalendarModalApiService } from "src/app/features/company-menu/calendar-modal/api.calendar-modal";
import { StudentCalendarApiService } from "./student-calendar.component-api-service";
import { InterviewScheduleApiService } from "src/app/features/company-menu/interview-schedule/InterviewScheduleApiService";
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
    private studentCalendarApiService: StudentCalendarApiService,
    private calendarModalApiService: CalendarModalApiService
  ) {
    const storedCompanyId = sessionStorage.getItem("CompanyId");
    this.companyId = storedCompanyId ? parseInt(storedCompanyId) : 0;
    const storedStudentId = sessionStorage.getItem("StudentId");
    this.studentId = storedStudentId ? parseInt(storedStudentId, 10) : 0;

    if (this.studentId > 0) {
      console.log(`StudentId retrieved from sessionStorage: ${this.studentId}`);
      this.getCalendarData(this.studentId);
    } else {
      console.warn("StudentId not found in sessionStorage.");
    }
  }
  selected = model<Date | null>(null);
  currentEvents: EventApi[] = [];
  roundsId: number = 0;
  jobPostingId: number = 0;
  OrgId: number = 0;
  roundsIdForBatchCall: Jobinterviewround[] = [];
  events: any[] = [];

  calendarEvents = signal<calendarEvent[]>([]);
  companyId: number = 0;
  studentId: number = 0;
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
    if (this.studentId > 0) {
      this.getCalendarData(this.studentId);
    }
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
      data: { date: this.newEventDate.date, isEdited: this.isEdited },
      panelClass: "custom-dialog-container",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

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
          jobPostingId: event.event.extendedProps.jobPostingId || 0,
          roundId: event.event.extendedProps.round || "",
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
    });
  }
  // getCalendarData(studentId: number) {
  //   this.studentCalendarApiService.GetCalendarData(studentId).subscribe({
  //     next: (response) => {
  //       console.log(response.value);
  //       const responseList: calendarEvent[] = response.value.map((x) => ({
  //         id: x.Id.toString(),
  //         title: x.JobPostingRound?.Event?.EventType || "",
  //         start: x.JobPostingRound?.Event?.EventStartDateTime
  //           ? new Date(x.JobPostingRound.Event.EventStartDateTime)
  //           : new Date(),
  //         end: x.JobPostingRound?.Event?.EventEndDateTime
  //           ? new Date(x.JobPostingRound.Event.EventEndDateTime)
  //           : new Date(),
  //         extendedProps: {
  //           jobPostingId: x.JobPostingRound?.JobPostingId || 0,
  //           round: x.JobPostingRound?.Id || 0,
  //           OrgId: x.JobPostingRound?.Event?.OrgId || 0,
  //         },
  //       }));
  //       this.calendarOptions.events = responseList;
  //       this.calendarEvents.set(responseList);
  //       this.cdr.markForCheck();
  //       console.log("calendarEvents:", this.calendarEvents());
  //     },
  //     error: (error) => {
  //       console.error("Error fetching Student details:", error);
  //     },
  //   });
  // }
  getCalendarData(studentId: number) {
    this.studentCalendarApiService.GetCalendarData(studentId).subscribe({
      next: (response) => {
        console.log(response.value);
        this.events = response.value.map((x) => ({
          jobTitle: x.JobPostingRound?.JobPosting?.JobRole || "N/A",
          Round: x.JobPostingRound?.Id || "N/A",
          RoundName: x.JobPostingRound?.Name || "N/A",
          eventDate: x.JobPostingRound?.Event?.EventStartDateTime
            ? new Date(x.JobPostingRound.Event.EventStartDateTime)
            : null,
          timings: x.JobPostingRound?.Event
            ? `${new Date(
                x.JobPostingRound.Event.EventStartDateTime
              ).toLocaleTimeString()} - ${
                x.JobPostingRound.Event.EventEndDateTime
                  ? new Date(
                      x.JobPostingRound.Event.EventEndDateTime
                    ).toLocaleTimeString()
                  : "N/A"
              }`
            : "N/A",
          duration: this.calculateDuration(
            x.JobPostingRound?.Event?.EventStartDateTime?.toString() ?? null,
            x.JobPostingRound?.Event?.EventEndDateTime?.toString() ?? null
          ),
        }));

        console.log("Events:", this.events);
        const responseList: calendarEvent[] = response.value.map((x) => ({
          title: x.JobPostingRound?.Event?.EventType || "",
          start: x.JobPostingRound?.Event?.EventStartDateTime
            ? new Date(x.JobPostingRound.Event.EventStartDateTime)
            : new Date(),
          end: x.JobPostingRound?.Event?.EventEndDateTime
            ? new Date(x.JobPostingRound.Event.EventEndDateTime)
            : new Date(),
          jobPostingId: x.JobPostingRound?.JobPostingId || 0,
          round: x.JobPostingRound?.Id || 0,
          OrgId: x.JobPostingRound?.Event?.OrgId || 0,
        }));

        this.calendarOptions.events = responseList;
        this.calendarEvents.set(responseList);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error("Error fetching Student details:", error);
      },
    });
  }

  calculateDuration(start: string | null, end: string | null): string {
    if (!start || !end) {
      return "N/A";
    }
    const startDate = new Date(start);
    const endDate = new Date(end);
    const durationMs = endDate.getTime() - startDate.getTime();
    const durationMinutes = Math.floor(durationMs / 60000);
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    return `${hours}h ${minutes}m`;
  }
}
