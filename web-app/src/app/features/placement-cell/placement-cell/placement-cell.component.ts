import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { JobsListComponent } from "./jobs-list/jobs-list.component";
import { TabsPlacementCellService } from "../tabs-placement-cell-service";
import { MatTabGroup } from "@angular/material/tabs";
import { CompanyJobDetailsComponent } from "../../company-menu/company-job-details/company-job-details.component";
import { CompanyListDetailsComponent } from "./company-list-details/company-list-details.component";

@Component({
  selector: "app-placement-cell",
  standalone: true,
  imports: [
    SharedModule,
    CommonModule,
    AMGModules,
    CompanyListDetailsComponent,
  ],
  templateUrl: "./placement-cell.component.html",
  styleUrl: "./placement-cell.component.css",
})
export class PlacementCellComponent {
  @ViewChild("activePlacementCellIndex") tabGroup!: MatTabGroup;

  constructor(private tabService: TabsPlacementCellService) {}

  ngAfterViewInit(): void {
    this.tabGroup.selectedIndex = this.tabService.getActiveTab();
  }

  onTabChange(event: number): void {
    this.tabService.setActiveTab(event);
  }
}
