import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { MatTabGroup } from "@angular/material/tabs";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { AppComponent } from "src/app/app.component";
import { SharedModule } from "src/app/shared/shared.module";
import { TabsTrainingConfigurationService } from "../tabs-training-configuartion-service";
import { TrainersComponent } from "./trainers/trainers.component";
import { SchedulesComponent } from "./schedules/schedules.component";
import { CoursesComponent } from "./courses/courses.component";

@Component({
  selector: "app-training-configuration",
  standalone: true,
  imports: [AppComponent, AMGModules, SharedModule, CommonModule, TrainersComponent, SchedulesComponent, CoursesComponent],
  templateUrl: "./training-configuration.component.html",
  styleUrl: "./training-configuration.component.css",
})
export class TrainingConfigurationComponent {
  @ViewChild("tabGroupTrainingConfig") tabGroup!: MatTabGroup;

  constructor(private tabService: TabsTrainingConfigurationService) {}

  ngAfterViewInit(): void {
    this.tabGroup.selectedIndex = this.tabService.getActiveTab();
  }

  onTabChange(event: number): void {
    this.tabService.setActiveTab(event);
  }
}
