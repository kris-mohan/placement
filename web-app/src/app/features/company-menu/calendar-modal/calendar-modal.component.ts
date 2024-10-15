import { CommonModule } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
// import { MatDatepickerModule } from "@angular/material/datepicker";

@Component({
  selector: "app-calendar-modal",
  standalone: true,
  imports: [
    AMGModules,
    CommonModule,
    SharedModule,
    NgxMaterialTimepickerModule,
    // MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: "./calendar-modal.component.html",
  styleUrl: "./calendar-modal.component.css",
})
export class CalendarModalComponent implements OnInit {
  formDataa: FormGroup;
  roles: any[] = [];
  toggle: boolean = false;
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
      startTime: ["", Validators.required],
      endDate: [""],
      endTime: ["", Validators.required],
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

  onToggleChange(event: MatCheckboxChange){
    this.toggle = event.checked;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.loadRoles();
  }
}
