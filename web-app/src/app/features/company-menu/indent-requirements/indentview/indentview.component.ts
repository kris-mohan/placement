import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { DialogMessageService } from "src/app/services/dialog-message/dialog-message/dialog-message.service";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { Calendarevent } from "src/app/features/campus-configuration/campus-configuration/calendar-events/calendar-events-module";
import { CalendarEventAPIService } from "src/app/features/campus-configuration/campus-configuration/calendar-events/api.calendar.events";
import { IndentData } from "./indentview.component.model";

export interface ODataResponse<T> {
  value: T[];
}

export const INDENT_DATA: IndentData[] = [
  {
    jobId: 1,
    indentId: 1,
    Department: "Assessment",
    Address:
      "An assessment to evaluate specific skills related to the job role.",
    Designation: new Date("2024-09-01"),
    EmailAddress: "Cancelled",
  },
  {
    jobId: 1,
    indentId: 2,
    Department: "Technical Interview",
    Address:
      "A round focused on assessing technical skills and problem-solving abilities.",
    Designation: new Date("2024-08-15"),
    EmailAddress: "Scheduled",
  },
];

@Component({
  selector: "app-indentview",
  standalone: true,
  imports: [AMGModules, CommonModule, SharedModule],
  templateUrl: "./indentview.component.html",
  styleUrl: "./indentview.component.css",
})
export class IndentviewComponent {
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
    "Department",
    "Address",
    "Designation",
    "EmailAddress",
    "Actions",
  ];
  // columns = [
  // { key: "indentId", label: "Round ID" },
  // { key: "Department", label: "Department" },
  // { key: "Address", label: "Address" },
  // { key: "Designation", label: "Designation" },
  // { key: "EmailAddress", label: "Email Address" },
  // { key: "actions", label: "Actions" },
  // ];

  columns: { key: string; label: string }[] = [];
  dataSource = new MatTableDataSource<IndentData>([]);

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

  openAddEditIndentForm(id?: string) {
    if (id !== undefined) {
      this.router.navigate(["/indent-requirement", id]);
    } else {
      this.router.navigate(["/indent-requirement", ""]);
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
