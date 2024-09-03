import { Component, inject } from "@angular/core";
import { Router, withDebugTracing } from "@angular/router";
import { APIService } from "src/app/services/api-services/api-services";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { companyTableList } from "./companies-model";
import { MatTableDataSource } from "@angular/material/table";
import { CommonModule, Location } from "@angular/common";
import { CompanyAPIService } from "./api.companies";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { ImportCompanyDialogComponent } from "./import-company-dialog/import-company-dialog.component";
import { MatDialog } from "@angular/material/dialog";

export interface ODataResponse<T> {
  value: T[];
}

@Component({
  selector: "app-companies",
  standalone: true,
  imports: [AMGModules, CommonModule, SharedModule],
  templateUrl: "./companies.component.html",
  styleUrl: "./companies.component.css",
})
export class CompaniesComponent {
  readonly dialog = inject(MatDialog);
  constructor(
    private router: Router,
    private sweetAlertService: SweetAlertService,
    private location: Location,
    private apiCompanyService: CompanyAPIService // private dialog: MatDialog
  ) {}
  displayedColumns: string[] = [
    "Url",
    "Name",
    "ContactPerson",
    "City",
    "ZipCode",
    "Actions",
  ];
  columns = [
    { key: "Url", label: "Url" },
    { key: "Name", label: "Name" },
    { key: "ContactPerson", label: "Contact Person" },
    { key: "City", label: "City" },
    { key: "ZipCode", label: "ZipCode" },
    { key: "Actions", label: "Actions" },
  ];
  dataSource = new MatTableDataSource<companyTableList>([]);

  ngOnInit() {
    this.loadCompanies();
  }

  loadCompanies() {
    this.apiCompanyService.loadCompanyData().subscribe({
      next: (response: ODataResponse<companyTableList>) => {
        console.log("API Response:", response);
        this.dataSource.data = response.value;
      },
      error: (error) => {
        console.error("Error loading companies", error);
      },
    });
  }

  openAddEditCompanyForm(id?: number) {
    if (id !== null && id !== undefined) {
      this.router.navigate(["/company-configuration/company", id]);
    } else {
      this.router.navigate(["/company-configuration/company", 0]);
    }
  }

  async deleteCompany(id: number) {
    const confirmed = await this.sweetAlertService.confirmDelete(
      "Do you really want to delete this Company?"
    );

    if (confirmed) {
      this.apiCompanyService.deleteCompany(id).subscribe({
        next: (response: { success: boolean; message: string }) => {
          if (response.success) {
            this.sweetAlertService.success(response.message);
            this.loadCompanies();
          } else {
            this.sweetAlertService.error(response.message);
          }
        },
        error: (error) => {
          this.sweetAlertService.error(
            "An unexpected error occurred while deleting the Company."
          );
          console.error("Error deleting Company:", error);
        },
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  openImportCompanyDialog() {
    this.dialog.open(ImportCompanyDialogComponent);
  }
}
