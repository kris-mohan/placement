import { Component, Inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { companyTableList } from "../companies-model";
import { CommonModule } from "@angular/common";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  selector: "app-company-detail-dialog-modal",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule, MatDialogModule],
  templateUrl: "./company-detail-dialog-modal.component.html",
  styleUrl: "./company-detail-dialog-modal.component.css",
})
export class CompanyDetailDialogModalComponent {
  UserRoleId: number;
  constructor(
    public dialogRef: MatDialogRef<CompanyDetailDialogModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: companyTableList
  ) {
    const storedUserRoleId = sessionStorage.getItem("userRoleId");
    this.UserRoleId = storedUserRoleId ? parseInt(storedUserRoleId) : 0;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  clickKnowMore() {}
}
