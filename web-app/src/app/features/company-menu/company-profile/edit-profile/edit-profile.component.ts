import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from "@angular/material/chips";

@Component({
  selector: "app-edit-profile",
  standalone: true,
  imports: [AMGModules, CommonModule, SharedModule],
  templateUrl: "./edit-profile.component.html",
  styleUrl: "./edit-profile.component.css",
})
export class EditProfileComponent {
  // formData: FormGroup;
  sectorChips: string[] = [
    "Internet",
    "Saas",
    "Software Product",
    "Unicorn",
    "Private",
    "Startup",
  ];
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Data passed from the company-profile.component
  ) {}
  ngOnInit(): void {
    this.initializeForm();
    this.loadInitialData();
    this.sectorChips = [
      "Internet",
      "Saas",
      "Software Product",
      "Unicorn",
      "Private",
      "Startup",
    ];
  }
  initializeForm(): void {}
  loadInitialData(): void {
    // Load the data passed in the dialog from the company profile component.
  }
}
