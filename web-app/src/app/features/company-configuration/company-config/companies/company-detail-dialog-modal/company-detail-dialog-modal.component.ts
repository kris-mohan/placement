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
import { CompanyDetailDialogModalAPIService } from "./api.company-detail-dialog-modal";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { PostCampusCompany } from "src/app/services/types/CampusCompany";

@Component({
  selector: "app-company-detail-dialog-modal",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule, MatDialogModule],
  templateUrl: "./company-detail-dialog-modal.component.html",
  styleUrl: "./company-detail-dialog-modal.component.css",
})
export class CompanyDetailDialogModalComponent {
  UserRoleId: number;
  CampusId: number;
  constructor(
    public dialogRef: MatDialogRef<CompanyDetailDialogModalComponent>,
    private apiCompanyDetailDialogModalService: CompanyDetailDialogModalAPIService,
    private sweetAlertService: SweetAlertService,
    @Inject(MAT_DIALOG_DATA) public data: companyTableList
  ) {
    const storedUserRoleId = sessionStorage.getItem("userRoleId");
    this.UserRoleId = storedUserRoleId ? parseInt(storedUserRoleId) : 0;
    const storedCampusId = sessionStorage.getItem("CampusId");
    this.CampusId = storedCampusId ? parseInt(storedCampusId) : 0;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  AddCompany(): void {
    const campusCompany: PostCampusCompany = {
      Id: 0,
      CampusId: this.CampusId,
      CompanyId: this.data.Id,
    };
    this.apiCompanyDetailDialogModalService
      .addCampusCompany(campusCompany)
      .subscribe({
        next: (response: { success: boolean; message: any }) => {
          console.log(response);
          if (response.success) {
            this.sweetAlertService.success(response.message);
          } else {
            this.sweetAlertService.error(response.message);
          }
        },
        error: (error) => {
          this.sweetAlertService.error("An unexpected error occurred.");
        },
      });
  }

  clickKnowMore() {}
}
