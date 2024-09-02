import { CommonModule, Location } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { Router } from "@angular/router";
import { Role } from "./roles-module";
import { RoleAPIService } from "./api.role";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";

export interface ODataResponse<T> {
  value: T[];
}

@Component({
  selector: "app-roles",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./roles.component.html",
  styleUrl: "./roles.component.css",
})
export class RolesComponent {
  constructor(
    private router: Router,
    private location: Location,
    private apiRoleService: RoleAPIService,
    private sweetAlertService: SweetAlertService
  ) {
    this.generateColumns();
  }
  displayedColumns: string[] = ["Id", "RoleName", "Description", "Actions"];

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
  dataSource = new MatTableDataSource<Role>([]);

  openAddEditRoleForm(roleId?: number) {
    if (roleId != undefined) {
      this.router.navigate(["company-configuration/role", roleId]);
    } else {
      this.router.navigate(["company-configuration/role", 0]);
    }
  }

  ngOnInit() {
    this.loadRoleData();
  }

  loadRoleData() {
    this.apiRoleService.loadRoleData().subscribe({
      next: (response: ODataResponse<any>) => {
        console.log("API Response:", response);
        this.dataSource.data = response.value;
      },
      error: (error) => {
        console.error("Error loading Role", error);
      },
    });
  }

  async deleteRole(id: number) {
    const confirmed = await this.sweetAlertService.confirmDelete(
      "Do you really want to delete this Role?"
    );

    if (confirmed) {
      this.apiRoleService.deleteRole(id).subscribe({
        next: (response: { success: boolean; message: string }) => {
          if (response.success) {
            this.sweetAlertService.success(response.message);
            this.loadRoleData();
          } else {
            this.sweetAlertService.error(response.message);
          }
        },
        error: (error) => {
          this.sweetAlertService.error(
            "An unexpected error occurred while deleting the Role."
          );
          console.error("Error deleting Role:", error);
        },
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
