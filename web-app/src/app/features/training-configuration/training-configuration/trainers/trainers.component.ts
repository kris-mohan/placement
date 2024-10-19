import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { TrainerAPIService } from "./api.trainer";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { Trainer } from "src/app/services/types/Trainer";

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
  TrainerDataSource = new MatTableDataSource<Trainer>([]);

  openAddEditTrainerForm(trainerId?: number) {
    if (trainerId != undefined) {
      this.router.navigate(["training-configuration/trainers", trainerId]);
    } else {
      this.router.navigate(["training-configuration/trainers", 0]);
    }
  }

  async ngOnInit() {
    this.getTrainerData();
  }

  async getTrainerData() {
    try {
      const response = await this.apiTrainerService.getTrainers();
      const data: Trainer[] = response.value;
      console.log(data);
      this.TrainerDataSource.data = data;
    } catch (error) {
      console.error("Error fetching company details:", error);
    }
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
            this.getTrainerData();
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
