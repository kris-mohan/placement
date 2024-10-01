import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  selector: "app-calendar-modal",
  standalone: true,
  imports: [AMGModules, CommonModule, SharedModule],
  templateUrl: "./calendar-modal.component.html",
  styleUrl: "./calendar-modal.component.css",
})
export class CalendarModalComponent {
  formDataa: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<CalendarModalComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formDataa = this.formBuilder.group({
      title: ["", Validators.required],
      category: ["", Validators.required],
    });
  }
  onSave(): void {
    if (this.formDataa.valid) {
      this.dialogRef.close(this.formDataa.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
