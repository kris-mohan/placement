import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { DialogMessageService } from "src/app/services/dialog-message/dialog-message/dialog-message.service";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { Calendarevent } from "./calendar-events-module";
import { CalendarEventAPIService } from "./api.calendar.events";

export interface ODataResponse<T> {
  value: T[];
}
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
    private location: Location,
    private APICalendarEventsService: CalendarEventAPIService
  ) {
    this.generateColumns();
  }

  displayedColumns: string[] = [
    "Id",
    "EventStartDateTime",
    "EventEndDateTime",
    "EventType",
    "EventDescription",
    "OrgId",
    "CompanyId",
    "Actions",
  ];
  columns: { key: string; label: string }[] = [];
  dataSource = new MatTableDataSource<Calendarevent>([]);

  generateColumns(): void {
    this.displayedColumns.forEach((column) => {
      this.columns.push({
        key: column,
        label: this.formatLabel(column),
      });
    });
  }

  formatLabel(key: string): string {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  }

  openAddEditCalendarEventsForm(id?: string) {
    if (id !== undefined) {
      this.router.navigate(["/campus-configuration/calendar-events", id]);
    } else {
      this.router.navigate(["/campus-configuration/calendar-events", ""]);
    }
  }

  ngOnInit() {
    this.loadCalendarEventData();
  }

  loadCalendarEventData() {
    this.APICalendarEventsService.loadCalendarEventData().subscribe({
      next: (response: ODataResponse<any>) => {
        console.log("API Response:", response);
        this.dataSource.data = response.value;
      },
      error: (error) => {
        console.error("Error loading Calendar Event", error);
      },
    });
  }

  async deleteCalendarEvent(id: number) {
    const confirmed = await this.sweetAlertService.confirmDelete(
      "Do you really want to delete this Calendar Event?"
    );

    if (confirmed) {
      this.APICalendarEventsService.deleteCalendarEvent(id).subscribe({
        next: (response: { success: boolean; message: string }) => {
          if (response.success) {
            this.sweetAlertService.success(response.message);
            this.loadCalendarEventData();
          } else {
            this.sweetAlertService.error(response.message);
          }
        },
        error: (error) => {
          this.sweetAlertService.error(
            "An unexpected error occurred while deleting the Calendar Event."
          );
          console.error("Error deleting Calendar Event:", error);
        },
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
