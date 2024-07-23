import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { CompaniesComponent } from "./companies/companies.component";
import { TechnologiesComponent } from "./technologies/technologies.component";
import { RolesComponent } from "./roles/roles.component";
import { CompanyTechnologyComponent } from "./company-technology/company-technology.component";

@Component({
  selector: "app-company-config",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule, CompaniesComponent, TechnologiesComponent, RolesComponent, CompanyTechnologyComponent],
  templateUrl: "./company-config.component.html",
  styleUrl: "./company-config.component.css",
})
export class CompanyConfigComponent {}
