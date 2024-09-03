import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from "@angular/material/dialog";
import { CompanyAPIService } from "../api.companies";
import { companyTableList } from "../companies-model";
import { ODataResponse } from "../companies.component";

@Component({
  selector: "app-import-company-dialog",
  standalone: true,
  imports: [AMGModules, CommonModule, SharedModule],
  templateUrl: "./import-company-dialog.component.html",
  styleUrl: "./import-company-dialog.component.css",
})
export class ImportCompanyDialogComponent {
  companies: companyTableList[] = [];
  filteredCompanies: companyTableList[] = [];
  searchTerm: string = "";

  constructor(private apiCompanyService: CompanyAPIService) {}

  ngOnInit() {
    this.loadCompanies();
  }

  loadCompanies() {
    this.apiCompanyService.loadCompanyData().subscribe({
      next: (response: ODataResponse<companyTableList>) => {
        console.log("API Response:", response);
        this.companies = response.value;
        this.filteredCompanies = this.companies;
      },
      error: (error) => {
        console.error("Error loading companies", error);
      },
    });
  }

  filterCompanies() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredCompanies = this.companies.filter((company) =>
      company.Name.toLowerCase().includes(searchTermLower)
    );
  }

  
}
