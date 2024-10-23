import { CommonModule, Location } from "@angular/common";
import { Component, inject } from "@angular/core";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { AddRoundsModalComponent } from "../test-rounds/add-rounds-modal/add-rounds-modal.component";
import { MatDialog } from "@angular/material/dialog";

import { ActivatedRoute, Router } from "@angular/router";
import { TestRoundsComponent } from "../test-rounds/test-rounds.component";
import { TabsCompanyJobDetailsService } from "../../tabs-Company-job-details";
import { PanelTabComponent } from "../panel-tab/panel-tab.component";

@Component({
  selector: "app-add-edit-company-job-details",
  standalone: true,
  imports: [
    SharedModule,
    CommonModule,
    AMGModules,
    NgxMaterialTimepickerModule,
    TestRoundsComponent,
    PanelTabComponent,
  ],
  templateUrl: "./add-edit-company-job-details.component.html",
  styleUrl: "./add-edit-company-job-details.component.css",
})
export class AddEditCompanyJobDetailsComponent {
  readonly dialog = inject(MatDialog);
  constructor(
    private tabService: TabsCompanyJobDetailsService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  openAddRoundsModalPopup(company: any): void {
    this.dialog.open(AddRoundsModalComponent, {
      width: "500px",
      height: "600px",
      data: company,
    });
  }
  onTabChange(event: number): void {
    this.tabService.setActiveTab(event);
  }

  goBack() {
    this.location.back();
  }
  // onReset() {
  //   this.addEditTrainerForm.reset(this.initialFormValues);
  // }
}
