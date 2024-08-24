import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { TrainerTableList_Data } from "../trainers.component";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { TabService } from "src/app/features/company-configuration/tabs-service";

@Component({
  selector: "app-add-edit-trainers",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./add-edit-trainers.component.html",
  styleUrl: "./add-edit-trainers.component.css",
})
export class AddEditTrainersComponent {
  addEditTrainerForm: FormGroup;
  TrainerId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.addEditTrainerForm = this.fb.group({
      roleId: [null],
      roleName: ["", Validators.required],
      description: ["", Validators.required],
      createdDate: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this.TrainerId = id !== null ? +id : null;
      if (this.TrainerId) {
        const technology = TrainerTableList_Data.find(
          (t) => t.trainerId === this.TrainerId
        );
        if (technology) {
          this.addEditTrainerForm.patchValue(technology);
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
