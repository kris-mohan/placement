import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { CompaniesComponent } from "./companies/companies.component";
import { TechnologiesComponent } from "./technologies/technologies.component";
import { RolesComponent } from "./roles/roles.component";
import { CompanyTechnologyComponent } from "./company-technology/company-technology.component";
import { TabService } from "../tabs-service";
import { MatTabGroup } from "@angular/material/tabs";

@Component({
  selector: "app-company-config",
  standalone: true,
  imports: [
    CommonModule,
    AMGModules,
    SharedModule,
    CompaniesComponent,
    TechnologiesComponent,
    RolesComponent,
    CompanyTechnologyComponent,
  ],
  templateUrl: "./company-config.component.html",
  styleUrl: "./company-config.component.css",
})
export class CompanyConfigComponent implements AfterViewInit {
  @ViewChild("tabGroup") tabGroup!: MatTabGroup;

  constructor(private tabService: TabService) {}

  ngAfterViewInit(): void {
    this.tabGroup.selectedIndex = this.tabService.getActiveTab();
  }

  onTabChange(event: number): void {
    this.tabService.setActiveTab(event);
  }
}
