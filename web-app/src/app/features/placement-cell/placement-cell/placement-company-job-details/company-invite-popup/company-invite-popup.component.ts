import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { FormControl } from "@angular/forms";
import { Observable, of } from "rxjs";
import { Template } from "src/app/services/types/Template";
import { PlacementCompanyJobDetailsApiService } from "../placement-company-job-details-apiService";

@Component({
  selector: "app-company-invite-popup",
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: "./company-invite-popup.component.html",
  styleUrl: "./company-invite-popup.component.css",
})
export class CompanyInvitePopupComponent {
  templates: Template[] = [];

  templateControl = new FormControl();
  constructor(
    private placementApiService: PlacementCompanyJobDetailsApiService
  ) {}
  ngOnInit(): void {
    this.getTemplates();
  }
  getTemplates(): void {
    this.placementApiService.getTemplates().subscribe({
      next: (response) => {

        console.log(response, "template");
        this.templates= response.value;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  handleSend() {}
}
