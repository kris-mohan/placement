import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { InvitationAPIService } from "../api.invitations";

@Component({
  selector: "app-add-edit-invitations",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./add-edit-invitations.component.html",
  styleUrl: "./add-edit-invitations.component.css",
})
export class AddEditInvitationsComponent {
  addEditInvitationForm: FormGroup;
  Id: number | null = null;
  invitationTemplates: Array<{ id: number; name: string }> = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sweetAlertService: SweetAlertService,
    private apiInvitationService: InvitationAPIService
  ) {
    this.addEditInvitationForm = this.fb.group({
      InvitationTemplateId: null,
      Recipients: "",
      Cc: "",
      Bcc: "",
      From: "",
      // IsAccepted: null,
    });
  }

  ngOnInit(): void {
    this.invitationTemplates = [
      { id: 1, name: "Event Invitation" },
      { id: 2, name: "Meeting Invitation" },
      { id: 3, name: "Conference Invitation" },
      { id: 4, name: "Party Invitation" },
      { id: 5, name: "Workshop Invitation" },
    ];
    // this.loadInvitationData();
  }

  async onSubmit(): Promise<void> {
    const roleData: Partial<any> = this.addEditInvitationForm.value;
    const isUpdate = !!this.Id;
    const actionText = isUpdate ? "update" : "add";
    const confirmed = await this.sweetAlertService.confirm(
      `Do you want to ${actionText} this Invitation?`
    );

    if (confirmed) {
      this.apiInvitationService
        .addUpdateInvitation(this.Id, roleData)
        .subscribe({
          next: (response: { success: boolean; message: any }) => {
            console.log(response);
            if (response.success) {
              this.sweetAlertService.success(response.message);
              this.router.navigate(["/campus-configuration"]);
            } else {
              this.sweetAlertService.error(response.message);
            }
          },
          error: (error) => {
            this.sweetAlertService.error("An unexpected error occurred.");
          },
        });
    }
  }

  onReset() {
    this.addEditInvitationForm.reset();
  }
}
