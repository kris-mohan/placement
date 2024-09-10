import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { Industry } from "./industry.module";
import { MatTableDataSource } from "@angular/material/table";
import { IndustryAPIService } from "./api.industry";
import { Router } from "@angular/router";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";

export interface ODataResponse<T> {
  value: T[];
}
@Component({
  selector: "app-industry",
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: "./industry.component.html",
  styleUrl: "./industry.component.css",
})
export class IndustryComponent {
  constructor(
    private router: Router,
    private location: Location,
    private apiIndustrySevice: IndustryAPIService,
    private sweetAlertService: SweetAlertService
  ) {}
  dataSource = new MatTableDataSource<Industry>([]);

  displayedColumns: string[] = ["Type", "Description", "Actions"];
  columns = [
    // { key: "Id", label: "Id" },
    { key: "Type", label: "Industry Type" },
    { key: "Description", label: "Description" },
    { key: "Actions", label: "Actions" },
  ];

  openAddEditIndustryForm(id?: number) {
    if (id !== null && id !== undefined) {
      this.router.navigate(["/company-configuration/industry", id]);
    } else {
      this.router.navigate(["/company-configuration/industry", 0]);
    }
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.loadIndustryData();
  }

  loadIndustryData() {
    this.apiIndustrySevice.loadIndustryData().subscribe({
      next: (response: ODataResponse<Industry>) => {
        console.log("API Response:", response);
        this.dataSource.data = response.value;
      },
      error: (error) => {
        console.error("Error loading Industry", error);
      },
    });
  }

  async deleteIndustry(id: number) {
    const confirmed = await this.sweetAlertService.confirmDelete(
      "Do you really want to delete this Industry?"
    );

    if (confirmed) {
      this.apiIndustrySevice.deleteIndustry(id).subscribe({
        next: (response: { success: boolean; message: string }) => {
          if (response.success) {
            this.sweetAlertService.success(response.message);
            this.loadIndustryData();
          } else {
            this.sweetAlertService.error(response.message);
          }
        },
        error: (error) => {
          this.sweetAlertService.error(
            "An unexpected error occurred while deleting the Industry."
          );
        },
      });
    }
  }
}
