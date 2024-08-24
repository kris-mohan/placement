import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { DialogMessageService } from "src/app/services/dialog-message/dialog-message/dialog-message.service";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { APIService } from "src/app/services/api-services/api-services";
import { companyTableList } from "./companies-model";

export interface ODataResponse<T> {
  value: T[];
}

@Component({
  selector: "app-companies",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./companies.component.html",
  styleUrl: "./companies.component.css",
})
export class CompaniesComponent {
  constructor(
    private router: Router,
    private sweetAlertService: SweetAlertService,
    private location: Location,
    private apiService: APIService
  ) {}
  displayedColumns: string[] = [
    "CompanyId",
    "CompanyName",
    "Location",
    "Actions",
  ];
  columns = [
    { key: "CompanyId", label: "Company Id" },
    { key: "CompanyName", label: "Company Name" },
    { key: "Location", label: "Location" },
    { key: "Actions", label: "Actions" },
  ];
  dataSource = new MatTableDataSource<companyTableList>([]);
  selection = new SelectionModel<companyTableList>(true, []);

  ngOnInit() {
    this.loadCompanies();
  }

  loadCompanies() {
    this.apiService.getCompanyList().subscribe({
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
      "Do you really want to delete this company?"
    );
    if (confirmed) {
      this.dataSource.data = this.dataSource.data.filter(
        (company) => company.CompanyId !== id
      );
      this.sweetAlertService.success("Company deleted successfully!");
    }
  }

  goBack(): void {
    this.location.back();
  }
}
