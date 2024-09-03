import { Component } from "@angular/core";
import { IndustryAPIService } from "../industry/api.industry";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { CommonModule, Location } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { CompanyIndustry, CompanyIndustryUI } from "./company-industry.module";
import { CompanyindustryAPIService } from "./api.company.industries";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";

export interface ODataResponse<T> {
  value: T[];
}

@Component({
  selector: "app-industry-technology",
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: "./company-industry.component.html",
  styleUrl: "./company-industry.component.css",
})
export class CompanyIndustryComponent {
  constructor(
    private router: Router,
    private location: Location,
    private apiIndustrySevice: IndustryAPIService,
    private apiCompanyIndustryService: CompanyindustryAPIService,
    private sweetAlertService: SweetAlertService
  ) {
    this.generateColumns();
  }
  dataSource = new MatTableDataSource<CompanyIndustryUI>([]);

  displayedColumns: string[] = ["Id", "CompanyName", "Industries", "Actions"];
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
  openAddEditCompanyIndustryForm(id?: number) {
    if (id !== null && id !== undefined) {
      this.router.navigate(["/company-configuration/companyIndustry", id]);
    } else {
      this.router.navigate(["/company-configuration/companyIndustry", 0]);
    }
  }

  ngOnInit() {
    this.loadCompanyIndsutryData();
  }

  loadCompanyIndsutryData(): void {
    this.apiCompanyIndustryService.loadCompanyindustryData().subscribe({
      next: (response) => {
        const groupedData = response.value.reduce((acc: any, item: any) => {
          const companyId = item.Company.Id;
          const companyName = item.Company.Name;
          const IndsutryName = item.Industry.Type;

          if (!acc[companyId]) {
            acc[companyId] = {
              Id: companyId,
              CompanyName: companyName,
              IndustryTypes: [],
            };
          }
          acc[companyId].IndustryTypes.push(IndsutryName);
          return acc;
        }, {});

        const companyIndustryGridData: CompanyIndustryUI[] =
          Object.values(groupedData);

        companyIndustryGridData.forEach((item) => {
          item.Industries = item.IndustryTypes.join(", ");
        });

        this.dataSource.data = companyIndustryGridData;
      },
      error: (error) => {
        console.error("Error loading companies and industries", error);
      },
    });
  }

  goBack(): void {
    this.location.back();
  }

  async deleteCompanyIndsutry(id: number) {
    const confirmed = await this.sweetAlertService.confirmDelete(
      "Do you really want to delete this Company Indsutry?"
    );

    if (confirmed) {
      this.apiCompanyIndustryService.deleteCompanyindustry(id).subscribe({
        next: (response: { success: boolean; message: string }) => {
          if (response.success) {
            this.sweetAlertService.success(response.message);
            this.loadCompanyIndsutryData();
          } else {
            this.sweetAlertService.error(response.message);
          }
        },
        error: (error) => {
          this.sweetAlertService.error(
            "An unexpected error occurred while deleting the Company Indsutry."
          );
          console.error("Error deleting Invitation:", error);
        },
      });
    }
  }
}
