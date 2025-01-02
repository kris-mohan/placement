import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { Trainerschedule } from "./schedules-module";
import { TrainerScheduleAPIService } from "./api.schedules";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import * as XLSX from "xlsx";

export interface ODataResponse<T> {
  value: T[];
}

@Component({
  selector: "app-schedules",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./schedules.component.html",
  styleUrl: "./schedules.component.css",
})
export class SchedulesComponent {
  constructor(
    private router: Router,
    private location: Location,
    private apiTrainerScheduleservice: TrainerScheduleAPIService,
    private sweetAlertService: SweetAlertService
  ) {
    // this.generateColumns();
  }

  displayedColumns: string[] = [
    "Id",
    "ScheduleType",
    "StartDate",
    "EndDate",
    "CompanyId",
    "SchoolId",
    "CourseId",
    "TrainerId",
    "Actions",
    // "StudentId",
  ];
  columns = [
    { key: "Id", label: "Id" },
    { key: "ScheduleType", label: "Schedule Type" },
    { key: "StartDate", label: "Start Date" },
    { key: "EndDate", label: "End Date" },
    { key: "CompanyId", label: "Company Name" },
    { key: "SchoolId", label: "School Name" },
    { key: "CourseId", label: "Course Name" },
    { key: "TrainerId", label: "Trainer Name" },
    // { key: "StudentId", label: "Student Name" },
    { key: "Actions", label: "Actions" },
  ];

  dataSource = new MatTableDataSource<Trainerschedule>([]);

  openAddEditScheduleForm(scheduleId?: number) {
    if (scheduleId != undefined) {
      this.router.navigate(["training-configuration/schedules", scheduleId]);
    } else {
      this.router.navigate(["training-configuration/schedules", 0]);
    }
  }
  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.loadTrainerScheduleData();
  }

  loadTrainerScheduleData() {
    this.apiTrainerScheduleservice.loadTrainerScheduleData().subscribe({
      next: (response: ODataResponse<any>) => {
        console.log("API Response:", response);
        this.dataSource.data = response.value;
      },
      error: (error) => {
        console.error("Error loading Trainer Schedule", error);
      },
    });
  }

  async deleteTrainerSchedule(id: number) {
    const confirmed = await this.sweetAlertService.confirmDelete(
      "Do you really want to delete this trainer schedule?"
    );

    if (confirmed) {
      this.apiTrainerScheduleservice.deleteTrainerSchedule(id).subscribe({
        next: (response: { success: boolean; message: string }) => {
          if (response.success) {
            this.sweetAlertService.success(response.message);
            this.loadTrainerScheduleData();
          } else {
            this.sweetAlertService.error(response.message);
          }
        },
        error: (error) => {
          this.sweetAlertService.error(
            "An unexpected error occurred while deleting the trainer schedule."
          );
          console.error("Error deleting trainer schedule:", error);
        },
      });
    }
  }
  isDataAvailable(): boolean {
    return this.dataSource.data && this.dataSource.data.length > 0;
  }
  exportToExcel(): void {
    const exportData = this.dataSource.data.map((item) => {
      return {
        Id: item.Id,
        "Schedule Type": item.ScheduleType,
        "Start Date": item.StartDate,
        "End Date": item.EndDate,
        "Company Id": item.CompanyId,
        "School Id": item.SchoolId,
        "Course Id": item.CourseId,
        "Trainer Id": item.TrainerId,
      };
    });
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Calendar Events");
    XLSX.writeFile(wb, "calendar_events.xlsx");
  }
}
