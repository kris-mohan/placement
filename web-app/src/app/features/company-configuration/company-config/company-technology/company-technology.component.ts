import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { AddEditCompanyComponent } from "../companies/add-edit-company/add-edit-company.component";
import { Router } from "@angular/router";
import {
  CompanyTechnologies,
  CompanyTechnologiesUI,
} from "./company-technology-module";
import { CompaniesComponent } from "../companies/companies.component";
import { CompanyTechnologyAPIService } from "./api.company-technology";

export interface ODataResponse<T> {
  value: T[];
}

@Component({
  selector: "app-company-technology",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./company-technology.component.html",
  styleUrl: "./company-technology.component.css",
})
export class CompanyTechnologyComponent {
  dataSource = new MatTableDataSource<CompanyTechnologiesUI>([]);

  constructor(
    private router: Router,
    private location: Location,
    private apiCompanyTechnologyService: CompanyTechnologyAPIService
  ) {
    this.generateColumns();
  }

  displayedColumns: string[] = [
    "Id",
    "CompanyName",
    "TechnologyName",
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

  openAddEditCompanyTechnologyForm(Id?: number) {
    if (Id !== undefined && Id !== null) {
      this.router.navigate(["company-configuration/companyTechnology", Id]);
    } else {
      this.router.navigate(["company-configuration/companyTechnology", 0]);
    }
  }

  goBack(): void {
    this.location.back();
  }

  // ngOnInit() {
  //   this.loadCompanyTechnologyData();
  // }

  // loadCompanyTechnologyData(): void {
  //   this.apiCompanyTechnologyService.loadCompanyTechnologyData().subscribe({
  //     next: (response) => {
  //       const groupedData = response.value.reduce((acc: any, item: any) => {
  //         const companyId = item.Company.Id;
  //         const companyName = item.Company.Name;
  //         const technologyName = item.Technology.Name;

  //         if (!acc[companyId]) {
  //           acc[companyId] = {
  //             Id: companyId,
  //             CompanyName: companyName,
  //             TechnologyNames: [],
  //           };
  //         }
  //         acc[companyId].TechnologyNames.push(technologyName);
  //         return acc;
  //       }, {});

  //       const companyTechnologyGridData: CompanyTechnologiesUI[] =
  //         Object.values(groupedData);

  //       companyTechnologyGridData.forEach((item) => {
  //         item.TechnologyNames = item.TechnologyNames.join(", ");
  //       });

  //       this.dataSource.data = companyTechnologyGridData;
  //     },
  //     error: (error) => {
  //       console.error("Error loading companies and technologies", error);
  //     },
  //   });
  // }
}
