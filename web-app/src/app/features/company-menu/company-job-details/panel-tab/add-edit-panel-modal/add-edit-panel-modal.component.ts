import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { companyTableList } from "src/app/features/company-configuration/company-config/companies/companies-model";
import { SharedModule } from "src/app/shared/shared.module";
import { PanelTabComponent } from "../panel-tab.component";
import { TestRoundsComponent } from "../../test-rounds/test-rounds.component";
import { Jobinterviewround } from "src/app/services/types/Jobinterviewround";
import { TestRoundsApiService } from "../../test-rounds/TestRoundsApiService";

@Component({
  selector: "app-add-edit-panel-modal",
  standalone: true,
  imports: [
    MatDialogModule,
    AMGModules,
    SharedModule,
    CommonModule,
    PanelTabComponent,
    TestRoundsComponent
  ],

  templateUrl: "./add-edit-panel-modal.component.html",
  styleUrl: "./add-edit-panel-modal.component.css",
})
export class AddEditPanelModalComponent {
  UserRoleId: number;
  panelId: number | null = null;
  //HiringRound: any;
  constructor(
    public dialogRef: MatDialogRef<AddEditPanelModalComponent>,
    private route: ActivatedRoute,
    private testRoundsApiService: TestRoundsApiService,
    @Inject(MAT_DIALOG_DATA) public data: companyTableList
  ) {
    const storedUserRoleId = sessionStorage.getItem("userRoleId");
    this.UserRoleId = storedUserRoleId ? parseInt(storedUserRoleId) : 0;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("roundId");
      this.panelId = id !== null ? +id : null;
      if (this.panelId) {
      }
    });
  }
  RoundDataSource: Jobinterviewround[] = [];

  GetAllRounds = () => {
    this.testRoundsApiService.GetAllRounds().subscribe({
      next: (response) => {
        const data: Jobinterviewround[] = response.value;
        console.log("rounds", data);
        this.RoundDataSource = data;
         console.log(this.RoundDataSource);
      },
      error: (error) => {
        console.log("Error fetching rounds: ", error);
      },
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
  