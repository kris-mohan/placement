import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { Trainingcourse } from "./courses-module";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { TrainingCourseAPIService } from "./api.course";

export interface ODataResponse<T> {
  value: T[];
}

@Component({
  selector: "app-courses",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./courses.component.html",
  styleUrl: "./courses.component.css",
})
export class CoursesComponent {
  constructor(
    private router: Router,
    private location: Location,
    private sweetAlertService: SweetAlertService,
    private apiTrainingCourse: TrainingCourseAPIService
  ) {
    this.generateColumns();
  }

  displayedColumns: string[] = [
    "Name",
    "Description",
    "ValidTill",
    "ValidFrom",
    "Actions",
  ];
  columns: { key: string; label: string }[] = [];

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
  dataSource = new MatTableDataSource<Trainingcourse>([]);

  openAddEditCourseForm(courseId?: number) {
    if (courseId != undefined) {
      this.router.navigate(["training-configuration/courses", courseId]);
    } else {
      this.router.navigate(["training-configuration/courses", 0]);
    }
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.loadTrainingCourseData();
  }

  loadTrainingCourseData() {
    this.apiTrainingCourse.loadTrainingCourseData().subscribe({
      next: (response: ODataResponse<any>) => {
        console.log("API Response:", response);
        this.dataSource.data = response.value;
      },
      error: (error) => {
        console.error("Error loading Training Course", error);
      },
    });
  }

  async deleteTrainingCourse(id: number) {
    const confirmed = await this.sweetAlertService.confirmDelete(
      "Do you really want to delete this Course?"
    );

    if (confirmed) {
      this.apiTrainingCourse.deleteTrainingCourse(id).subscribe({
        next: (response: { success: boolean; message: string }) => {
          if (response.success) {
            this.sweetAlertService.success(response.message);
            this.loadTrainingCourseData();
          } else {
            this.sweetAlertService.error(response.message);
          }
        },
        error: (error) => {
          this.sweetAlertService.error(
            "An unexpected error occurred while deleting the Course."
          );
          console.error("Error deleting Course:", error);
        },
      });
    }
  }
}
