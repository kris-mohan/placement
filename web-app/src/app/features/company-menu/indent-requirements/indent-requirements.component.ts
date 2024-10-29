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
  constructor(
    private router: Router,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.addIndentForm = this.fb.group({
      TrainerName: new FormControl(""),
      Email: new FormControl(""),
      ContactNumber: new FormControl(""),
      Extra: new FormControl(""),
      Extra1: new FormControl(""),
      itemsArray: this.fb.array([]),
    });

    this.itemsArray = this.addIndentForm.get("itemsArray") as FormArray;
  }

  addIndentForm: FormGroup;
  itemsArray: FormArray;

  createItemFormControl(): FormGroup {
    return this.fb.group({
      requiredItem: new FormControl("", Validators.required), // Form control for requiredItem
      description: new FormControl("", Validators.required), // Form control for description
    });
  }

  handleAddGrid(): void {
    this.itemsArray.push(this.createItemFormControl());
  }

  handleDeleteGrid(index: number): void {
    if (index >= 0 && this.itemsArray.length > 0) {
      this.itemsArray.removeAt(index);
    }
  }

  onSubmit() {
    this.location.back();
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
