import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { DialogMessageService } from "src/app/services/dialog-message/dialog-message/dialog-message.service";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { CalendarEventAPIService } from "../campus-configuration/campus-configuration/calendar-events/api.calendar.events";
import { MatTableDataSource } from "@angular/material/table";
import { IndentData } from "../company-menu/indent-requirements/indentview/indentview.component.model";
import { ODataResponse } from "../company-menu/indent-requirements/indentview/indentview.component";
import { IndentRequirementsApiService } from "../company-menu/indent-requirements/IndentRequirementsApiService";
import { IndentForm } from "src/app/services/types/IndentForm";

@Component({
  selector: "app-indentplacement",
  standalone: true,
  imports: [AMGModules, CommonModule, SharedModule],
  templateUrl: "./indentplacement.component.html",
  styleUrl: "./indentplacement.component.css",
})
export class IndentplacementComponent {
  UserRoleId: number;
  constructor(
    private router: Router,
    private sweetAlertService: SweetAlertService,
    private APICalendarEventsService: CalendarEventAPIService,
    private IndentApiService: IndentRequirementsApiService
  ) {
    this.generateColumns();
    const storedUserRoleId = sessionStorage.getItem("userRoleId");
    this.UserRoleId = storedUserRoleId ? parseInt(storedUserRoleId) : 0;
  }

  isLoading = true;
  jobSummary = [
    { jobTitle: "Software Engineer", studentsCount: 1 },
    { jobTitle: "Data Scientist", studentsCount: 1 },
    { jobTitle: "Product Manager", studentsCount: 1 },
    { jobTitle: "Web Developer", studentsCount: 1 },
    { jobTitle: "UI/UX Designer", studentsCount: 1 },
  ];
  displayedColumns: string[] = [
    "Department",
    "Address",
    "Designation",
    "EmailAddress",
    "Actions",
  ];

  goToInterviewStudentsDetails(id: number) {
    if (this.UserRoleId === 1 || this.UserRoleId === 2) {
      this.router.navigate(["interview/interview-students-list", id]);
    }
  }
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
  indentdata: IndentForm[] = [];

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

  openAddEditIndentForm(id?: number) {
    if (id !== undefined) {
      this.router.navigate(["Indent-view-placement/Indent-requirement", id]);
    } else {
      this.router.navigate(["Indent-view-placement/Indent-requirement", ""]);
    }
  }

  ngOnInit() {
    this.getAllIndent();
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
  getAllIndent = () => {
    this.IndentApiService.GetAllIndents().subscribe({
      next: (response) => {
        const data: IndentForm[] = response.value;
        this.indentdata = data;
        this.isLoading=false;

    
      },
      error: (error) => {
        console.log("Error fetching rounds: ", error);
      },
    });
  };

  // goBack(): void {
  //   this.location.back();
  // }
}
