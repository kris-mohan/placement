import { Component } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  FormsModule,
  FormArray,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { CommonModule, Location } from "@angular/common";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatButtonModule } from "@angular/material/button";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { IndentForm } from "src/app/services/types/IndentForm";
import { IndentRequirementsApiService } from "./IndentRequirementsApiService";

@Component({
  selector: "app-indent-requirements",
  standalone: true,
  imports: [
    AMGModules,
    CommonModule,
    SharedModule,
    MatGridListModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: "./indent-requirements.component.html",
  styleUrl: "./indent-requirements.component.css",
})
export class IndentRequirementsComponent {
  [x: string]: any;
  constructor(
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
    private sweetAlertService: SweetAlertService,
    private IndentRequirementapi: IndentRequirementsApiService
  ) {
    this.addIndentForm = this.fb.group({
      CompanyName: new FormControl(""),
      ContactPersonDesignation: new FormControl(""),
      Email: new FormControl(""),
      PhoneNumber: new FormControl(""),
      Extra1: new FormControl(""),
      IndentFormDynamicFields: this.fb.array([]),
    });

    this.IndentFormDynamicFields = this.addIndentForm.get(
      "IndentFormDynamicFields"
    ) as FormArray;
  }

  addIndentForm: FormGroup;
  IndentFormDynamicFields: FormArray;

  createItemFormControl(): FormGroup {
    return this.fb.group({
      Name: new FormControl("", Validators.required), // Form control for requiredItem
      Value: new FormControl("", Validators.required), // Form control for description
    });
  }

  handleAddGrid(): void {
    this.IndentFormDynamicFields.push(this.createItemFormControl());
  }

  handleDeleteGrid(index: number): void {
    if (index >= 0 && this.IndentFormDynamicFields.length > 0) {
      this.IndentFormDynamicFields.removeAt(index);
    }
  }

  async onSubmit() {
    debugger;
    const companyData: Partial<IndentForm> = this.addIndentForm.value;
    // const isUpdate = !!this.roundId;
    // const actionText = isUpdate ? "update" : "add";
    const confirmed = await this.sweetAlertService.confirm(
      `Do you want to add this indent?`
    );

    if (confirmed) {
      const companydatum: any = {
        Id: 0,
        CompanyName: companyData.CompanyName ?? "",
        ContactPersonDesignation: companyData.ContactPersonDesignation ?? "",
        Email: companyData.Email ?? "",
        PhoneNumber: companyData.PhoneNumber ?? "",
        IndentFormDynamicFields: companyData.IndentFormDynamicFields ?? [],
      };
      this.IndentRequirementapi.CreateIndent(companydatum).subscribe({
        next: (response: { success: boolean; message: any }) => {
          console.log(response);
          if (response.success) {
            this.sweetAlertService.success(response.message);
            this.router.navigate(["/indent-view"]);
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

  onSubmitDiv() {
    this.location.back();
  }
  onReset() {
    this.location.back();
  }

  goBack(): void {
    this.location.back();
  }
}
