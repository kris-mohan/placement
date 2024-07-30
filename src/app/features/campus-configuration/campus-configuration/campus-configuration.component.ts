import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { MatTabGroup } from "@angular/material/tabs";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { AppComponent } from "src/app/app.component";
import { SharedModule } from "src/app/shared/shared.module";
import { TabService } from "../../company-configuration/tabs-service";
import { CalendarEventsComponent } from "./calendar-events/calendar-events.component";
import { InvitationsComponent } from "./invitations/invitations.component";
import { JobPostingsComponent } from "./job-postings/job-postings.component";
import { TabsCampusConfigurationService } from "../tabs-campus-config-service";
import { MappingJopPostComponent } from "./mapping-jop-post/mapping-jop-post.component";

@Component({
  selector: "app-campus-configuration",
  standalone: true,
  imports: [
    AppComponent,
    AMGModules,
    SharedModule,
    CommonModule,
    CalendarEventsComponent,
    InvitationsComponent,
    JobPostingsComponent,
    MappingJopPostComponent,
  ],
  templateUrl: "./campus-configuration.component.html",
  styleUrl: "./campus-configuration.component.css",
})
export class CampusConfigurationComponent {
  @ViewChild("tabGroupCampusConfig") tabGroup!: MatTabGroup;

  constructor(private tabService: TabsCampusConfigurationService) {}

  ngAfterViewInit(): void {
    this.tabGroup.selectedIndex = this.tabService.getActiveTab();
  }

  onTabChange(event: number): void {
    this.tabService.setActiveTab(event);
  }
}
