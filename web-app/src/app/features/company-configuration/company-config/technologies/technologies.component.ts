import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { AddEditTechnologyComponent } from "./add-edit-technology/add-edit-technology.component";
import { Router } from "@angular/router";
import { Technology } from "./technologies-module";
import { TechnologyAPIService } from "./api-technology";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";

export interface ODataResponse<T> {
  value: T[];
}

@Component({
  selector: "app-technologies",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./technologies.component.html",
  styleUrl: "./technologies.component.css",
})
export class TechnologiesComponent {
  constructor(
    private router: Router,
    private location: Location,
    private apiTechnologyService: TechnologyAPIService,
    private sweetAlertService: SweetAlertService
  ) {
    this.generateColumns();
  }

  displayedColumns: string[] = ["Id", "Name", "Description", "Actions"];

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
  dataSource = new MatTableDataSource<Technology>([]);
  selection = new SelectionModel<Technology>(true, []);

  ngOnInit() {
    this.loadTechnologyData();
  }

  loadTechnologyData() {
    this.apiTechnologyService.loadTechnologyData().subscribe({
      next: (response: ODataResponse<any>) => {
        console.log("API Response:", response);
        this.dataSource.data = response.value;
      },
      error: (error) => {
        console.error("Error loading technology", error);
      },
    });
  }
  openAddEditTechnologyForm(technologyId?: number) {
    if (technologyId !== undefined) {
      this.router.navigate(["/company-configuration/technology", technologyId]);
    } else {
      this.router.navigate(["/company-configuration/technology", null]);
    }
  }

  async deleteTechnology(id: number) {
    const confirmed = await this.sweetAlertService.confirmDelete(
      "Do you really want to delete this Technology?"
    );

    if (confirmed) {
      this.apiTechnologyService.deleteTechnology(id).subscribe({
        next: (response: { success: boolean; message: string }) => {
          if (response.success) {
            this.sweetAlertService.success(response.message);
            this.loadTechnologyData();
          } else {
            this.sweetAlertService.error(response.message);
          }
        },
        error: (error) => {
          this.sweetAlertService.error(
            "An unexpected error occurred while deleting the Technology."
          );
        },
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
