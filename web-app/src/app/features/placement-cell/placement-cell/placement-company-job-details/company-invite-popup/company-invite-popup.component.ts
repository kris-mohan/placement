import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { FormControl } from "@angular/forms";
import { Observable, of } from "rxjs";
import { Template } from "src/app/services/types/Template";
import { PlacementCompanyJobDetailsApiService } from "../placement-company-job-details-apiService";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { TemplateCategory } from "src/app/services/types/TemplateCategory";

@Component({
  selector: "app-company-invite-popup",
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: "./company-invite-popup.component.html",
  styleUrl: "./company-invite-popup.component.css",
})
export class CompanyInvitePopupComponent {
  templates: Template[] = [];
  selectedTemplate: Template | null = null;
  templateSubject: string = "";
  templateBody: string = "";
  templateCategories: TemplateCategory[] = [];
  // showTemplate: boolean = false;

  templateControl = new FormControl();
  constructor(
    private sweetAlertService: SweetAlertService,

    private placementApiService: PlacementCompanyJobDetailsApiService
  ) {}
  ngOnInit(): void {
    this.getTemplates();
    this.templateControl.valueChanges.subscribe(() => {
      this.handleTemplateChange();
    });
  }
  getTemplates(): void {
    this.placementApiService.getTemplates().subscribe({
      next: (response) => {
        this.templateCategories = response.value;
        this.templates = response.value.flatMap(
          (category) => category.Templates
        );
        // this.templates = response.value;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  handleTemplateChange() {
    const template = this.templateControl.value;
    this.selectedTemplate = template;
    this.templateSubject = this.selectedTemplate
      ? this.selectedTemplate.Subject
      : "";
    this.templateBody = this.selectedTemplate ? this.selectedTemplate.Body : "";
  }

  handleSend() {
    const email = {
      To: "vaishnavisacharya14@gmail.com",
      Cc: "vaishnavisacharya14@gmail.com",
      Bcc: "",
      Subject: this.templateSubject,
      Body: this.templateBody,
    };
    this.placementApiService.sendEmail(email).subscribe({
      next: () => {
        console.log("email sent successfully!");
        this.sweetAlertService.success("Email Sent Successfully");
      },
    });
  }
}
