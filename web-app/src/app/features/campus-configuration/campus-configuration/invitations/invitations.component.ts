import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { DialogMessageService } from "src/app/services/dialog-message/dialog-message/dialog-message.service";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { Invitation } from "./invitations-model";
import { InvitationAPIService } from "./api.invitations";

export interface ODataResponse<T> {
  value: T[];
}

@Component({
  selector: "app-invitations",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./invitations.component.html",
  styleUrl: "./invitations.component.css",
})
export class InvitationsComponent {
  constructor(
    private router: Router,
    private dialogService: DialogMessageService,
    private sweetAlertService: SweetAlertService,
    private location: Location,
    private apiInvitationservice: InvitationAPIService
  ) {}
  dataSource = new MatTableDataSource<Invitation>([]);
  displayedColumns: string[] = [
    "Id",
    "InvitationTemplate",
    "Recipients",
    "Cc",
    "Bcc",
    "From",
    // "IsAccepted",
    "Actions",
  ];
  columns = [
    { key: "Id", label: "Id" },
    { key: "InvitationTemplate", label: "Invitation Template" },
    { key: "Recipients", label: "Recipients" },
    { key: "Cc", label: "Cc" },
    { key: "Bcc", label: "Bcc" },
    { key: "From", label: "From" },
    // { key: "IsAccepted", label: "IsAccepted" },
    { key: "Actions", label: "Actions" },
  ];

  openAddEditInvitationForm(id?: number) {
    if (id !== undefined && id !== null) {
      this.router.navigate(["/campus-configuration/invitations", id]);
    } else {
      this.router.navigate(["/campus-configuration/invitations", 0]);
    }
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.loadInvitationData();
  }

  loadInvitationData() {
    this.apiInvitationservice.loadInvitationData().subscribe({
      next: (response: ODataResponse<any>) => {
        console.log("API Response:", response);
        this.dataSource.data = response.value;
      },
      error: (error) => {
        console.error("Error loading Invitation", error);
      },
    });
  }

  async deleteInvitation(id: number) {
    const confirmed = await this.sweetAlertService.confirmDelete(
      "Do you really want to delete this Invitation?"
    );

    if (confirmed) {
      this.apiInvitationservice.deleteInvitation(id).subscribe({
        next: (response: { success: boolean; message: string }) => {
          if (response.success) {
            this.sweetAlertService.success(response.message);
            this.loadInvitationData();
          } else {
            this.sweetAlertService.error(response.message);
          }
        },
        error: (error) => {
          this.sweetAlertService.error(
            "An unexpected error occurred while deleting the Invitation."
          );
          console.error("Error deleting Invitation:", error);
        },
      });
    }
  }
}
