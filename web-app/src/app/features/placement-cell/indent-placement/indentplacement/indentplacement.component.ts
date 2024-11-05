import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { DialogMessageService } from "src/app/services/dialog-message/dialog-message/dialog-message.service";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { CalendarEventAPIService } from "../../../campus-configuration/campus-configuration/calendar-events/api.calendar.events";
import { MatTableDataSource } from "@angular/material/table";
import { IndentData } from "../../../company-menu/indent-requirements/indentview/indentview.component.model";
import { ODataResponse } from "../../../company-menu/indent-requirements/indentview/indentview.component";
import { IndentPlacementApiService } from "../IndentPlacementApiService";
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
    private indentApiService: IndentPlacementApiService
  ) {
    this.generateColumns();
    const storedUserRoleId = sessionStorage.getItem("userRoleId");
    this.UserRoleId = storedUserRoleId ? parseInt(storedUserRoleId) : 0;
  }

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

  selectedUniversityType: string = '';
  selectedCollegeName: string = '';
  filteredColleges: string[] = [];

  IndentData: IndentForm[] = [];

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

  columns: { key: string; label: string }[] = [];
  dataSource = new MatTableDataSource<IndentForm>([]);

  generateColumns(): void {
    this.displayedColumns.forEach((column) => {
      this.columns.push({
        key: column,
        label: this.formatLabel(column),
      });
    });
  }

  // onUniversityTypeChange(event: any) {
  //   const selectedUniversity = event.value;
  //   this.filteredColleges = this.colleges[selectedUniversity];
  // }

  onCollegeNameChange(event: any) {
    this.selectedCollegeName = event.value;
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
    //this.getAllIndents();
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

  // goBack(): void {
  //   this.location.back();
  // }

  getAllIndents = () => {
    this.indentApiService.GetAllIndents().subscribe({
      next: (response) => {
        const data: IndentForm[] = response.value;
        this.dataSource.data = data.map((indent: IndentForm) => ({
          Id: indent.Id,
          CompanyName: indent.CompanyName,
          ContactPersonName: indent.ContactPersonName,
          ContactPersonDesignation: indent.ContactPersonDesignation || '',
          PhoneNumber: indent.PhoneNumber || '',
          Email: indent.Email || '',
          IndentFormDynamicFields: indent.IndentFormDynamicFields,
          RequiredItem: '',
          Quatity: '',
          studentsCleared: 0,
          studentsRejected: 0,
          roundName: '',
        }));
      },
      error: (error) => {
        console.log('Error fetching indents: ', error);
      },
    });
  };

  convertToDateOnly(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  }
}
