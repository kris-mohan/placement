import { CommonModule } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  selector: "app-calendar-modal",
  standalone: true,
  imports: [
    AMGModules,
    CommonModule,
    SharedModule,
    NgxMaterialTimepickerModule,
  ],
  templateUrl: "./calendar-modal.component.html",
  styleUrl: "./calendar-modal.component.css",
})
export class CalendarModalComponent implements OnInit {
  formDataa: FormGroup;
  roles: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<CalendarModalComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formDataa = this.formBuilder.group({
      eventName: ["", Validators.required],
      jobRole: ["", Validators.required],
      // round: ["", Validators.required],
      // panels: ["", Validators.required],
      // venueDetails: ["", Validators.required],
      // startDate: ["", Validators.required],
      endDate: ["", Validators.required],
    });
  }

  loadRoles(): void {
    this.roles = [
      {
        id: 1,
        name: "Software Engineer",
      },
      {
        id: 2,
        name: "Data Analyst",
      },
      {
        id: 3,
        name: "Product Manager",
      },
    ];
  }

  onSave(): void {
    if (this.formDataa.valid) {
      this.dialogRef.close(this.formDataa.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.loadRoles();
  }
}
