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
@Component({
  selector: "app-add-edit-panel-modal",
  standalone: true,
  imports: [
    MatDialogModule,
    AMGModules,
    SharedModule,
    CommonModule,
    PanelTabComponent,
  ],

  templateUrl: "./add-edit-panel-modal.component.html",
  styleUrl: "./add-edit-panel-modal.component.css",
})
export class AddEditPanelModalComponent {
  UserRoleId: number;
  panelId: number | null = null;
  constructor(
    public dialogRef: MatDialogRef<AddEditPanelModalComponent>,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: companyTableList
  ) {
    const storedUserRoleId = sessionStorage.getItem("UserRoleId");
    this.UserRoleId = storedUserRoleId ? parseInt(storedUserRoleId) : 0;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("roundsId");
      this.panelId = id !== null ? +id : null;
      if (this.panelId) {
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
