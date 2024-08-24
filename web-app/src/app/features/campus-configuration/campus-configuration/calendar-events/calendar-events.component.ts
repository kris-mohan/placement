import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { DialogMessageService } from "src/app/services/dialog-message/dialog-message/dialog-message.service";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { CalendarEventList } from "./calendar-events-model";

export const CALENDAREVENT_DATA: CalendarEventList[] = [
  {
    slNo: 1,
    calendarEventId: "E001",
    title: "Team Meeting",
    startDate: new Date("2024-08-01T10:00:00"),
    endDate: new Date("2024-08-01T11:00:00"),
    location: "Conference Room A",
    description:
      "Monthly team meeting to discuss project updates and milestones.",
  },
  {
    slNo: 2,
    calendarEventId: "E002",
    title: "Client Presentation",
    startDate: new Date("2024-08-02T14:00:00"),
    endDate: new Date("2024-08-02T15:00:00"),
    location: "Client Office",
    description: "Presentation of the new project proposal to the client.",
  },
  {
    slNo: 3,
    calendarEventId: "E003",
    title: "Workshop",
    startDate: new Date("2024-08-05T09:00:00"),
    endDate: new Date("2024-08-05T12:00:00"),
    location: "Main Auditorium",
    description: "Workshop on new software development methodologies.",
  },
  {
    slNo: 4,
    calendarEventId: "E004",
    title: "Project Deadline",
    startDate: new Date("2024-08-10T00:00:00"),
    endDate: new Date("2024-08-10T23:59:59"),
    location: "Office",
    description: "Final deadline for the current project.",
  },
  {
    slNo: 5,
    calendarEventId: "E005",
    title: "Networking Event",
    startDate: new Date("2024-08-15T18:00:00"),
    endDate: new Date("2024-08-15T20:00:00"),
    location: "Downtown Hotel",
    description: "Networking event with industry professionals.",
  },
];

@Component({
  selector: "app-calendar-events",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./calendar-events.component.html",
  styleUrl: "./calendar-events.component.css",
})
export class CalendarEventsComponent {
  constructor(
    private router: Router,
    private dialogService: DialogMessageService,
    private sweetAlertService: SweetAlertService,
    private location: Location
  ) {}

  displayedColumns: string[] = [
    "select",
    "slNo",
    "calendarEventId",
    "title",
    "startDate",
    "endDate",
    "location",
    "description",
    "actions",
  ];
  columns = [
    { key: "select", label: "" },
    { key: "slNo", label: "Sl No" },
    { key: "calendarEventId", label: "Calendar Event Id" },
    { key: "title", label: "Title" },
    { key: "startDate", label: "Start Date" },
    { key: "endDate", label: "End Date" },
    { key: "location", label: "Location" },
    { key: "description", label: "Description" },
    { key: "actions", label: "Actions" },
  ];
  dataSource = new MatTableDataSource<CalendarEventList>(CALENDAREVENT_DATA);
  selection = new SelectionModel<CalendarEventList>(true, []);

  openAddEditCalendarEventsForm(id?: string) {
    if (id !== undefined) {
      this.router.navigate(["/campus-configuration/calendar-events", id]);
    } else {
      this.router.navigate(["/campus-configuration/calendar-events", ""]);
    }
  }

  async deleteCalendarEvent(id: string) {
    const confirmed = await this.sweetAlertService.confirmDelete(
      "Do you really want to delete this Calendar Event?"
    );
    if (confirmed) {
      this.dataSource.data = this.dataSource.data.filter(
        (cal) => cal.calendarEventId !== id
      );
      this.sweetAlertService.success("Calendar Event deleted successfully!");
    }
  }

  goBack(): void {
    this.location.back();
  }
}
