import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { Trainer } from "./trainers-module";
import { TrainerAPIService } from "./api.trainer";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";

export interface ODataResponse<T> {
  value: T[];
}

@Component({
  selector: "app-trainers",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./trainers.component.html",
  styleUrl: "./trainers.component.css",
})
export class TrainersComponent {
  constructor(
    private router: Router,
    private location: Location,
    private apiTrainerService: TrainerAPIService,
    private sweetAlertService: SweetAlertService
  ) {
    this.generateColumns();
  }

  displayedColumns: string[] = [
    "Id",
    "Name",
    "Email",
    "PhoneNumber",
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
  dataSource = new MatTableDataSource<Trainer>([]);

  openAddEditTrainerForm(trainerId?: number) {
    if (trainerId != undefined) {
      this.router.navigate(["training-configuration/trainers", trainerId]);
    } else {
      this.router.navigate(["training-configuration/trainers", 0]);
    }
  }

  ngOnInit() {
    this.loadTrainerData();
  }

  loadTrainerData() {
    this.apiTrainerService.loadTrainerData().subscribe({
      next: (response: ODataResponse<any>) => {
        console.log("API Response:", response);
        this.dataSource.data = response.value;
      },
      error: (error) => {
        console.error("Error loading Trainer", error);
      },
    });
  }
  goBack(): void {
    this.location.back();
  }

  async deleteTrainer(id: number) {
    const confirmed = await this.sweetAlertService.confirmDelete(
      "Do you really want to delete this Trainer?"
    );

    if (confirmed) {
      this.apiTrainerService.deleteTrainer(id).subscribe({
        next: (response: { success: boolean; message: string }) => {
          if (response.success) {
            this.sweetAlertService.success(response.message);
            this.loadTrainerData();
          } else {
            this.sweetAlertService.error(response.message);
          }
        },
        error: (error) => {
          this.sweetAlertService.error(
            "An unexpected error occurred while deleting the Trainer."
          );
          console.error("Error deleting Trainer:", error);
        },
      });
    }
  }
}
