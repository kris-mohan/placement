import { Component } from "@angular/core";
import { ScheduleTableList_Data } from "../schedules.component";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { TabService } from "src/app/features/company-configuration/tabs-service";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { CommonModule } from "@angular/common";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";

@Component({
  selector: "app-add-edit-schedules",
  standalone: true,
  imports: [
    AMGModules,
    SharedModule,
    CommonModule,
    NgxMaterialTimepickerModule,
  ],
  templateUrl: "./add-edit-schedules.component.html",
  styleUrl: "./add-edit-schedules.component.css",
})
export class AddEditSchedulesComponent {
  addEditScheduleForm: FormGroup;
  ScheduleId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private tabService: TabService
  ) {
    this.addEditScheduleForm = this.fb.group({
      roleId: [null],
      roleName: ["", Validators.required],
      description: ["", Validators.required],
      createdDate: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this.ScheduleId = id !== null ? +id : null;
      if (this.ScheduleId) {
        const schedule = ScheduleTableList_Data.find(
          (t) => t.scheduleId === this.ScheduleId
        );
        if (schedule) {
          this.addEditScheduleForm.patchValue(schedule);
        }
      }
    });
  }

  onSubmit(): void {
    // if (this.addEditTechnologyForm.valid) {
    //   this.formSubmit.emit(this.addEditTechnologyForm.value);
    //   this.router.navigate(["/company-config"]);
    // }
  }
}
