import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { INVITATION_DATA } from "../invitations.component";

@Component({
  selector: "app-add-edit-invitations",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./add-edit-invitations.component.html",
  styleUrl: "./add-edit-invitations.component.css",
})
export class AddEditInvitationsComponent {
  addEditInvitationForm: FormGroup;
  inviteId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.addEditInvitationForm = this.fb.group({
      technologyId: [null],
      name: ["", Validators.required],
      description: ["", Validators.required],
      category: ["", Validators.required],
      version: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this.inviteId = id !== null ? +id : null;
      if (this.inviteId) {
        const invitation = INVITATION_DATA.find(
          (t) => t.invitationid === this.inviteId
        );
        if (invitation) {
          this.addEditInvitationForm.patchValue(invitation);
        }
      }
    });
  }
}
