import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { ODataResponse } from "../trainers.component";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { TabService } from "src/app/features/company-configuration/tabs-service";
import { TrainerAPIService } from "../api.trainer";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";

@Component({
  selector: "app-add-edit-trainers",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./add-edit-trainers.component.html",
  styleUrl: "./add-edit-trainers.component.css",
})
export class AddEditTrainersComponent {
  addEditTrainerForm: FormGroup;
  Id: number | null = null;
  initialFormValues: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiTrainerService: TrainerAPIService,
    private sweetAlertService: SweetAlertService
  ) {
    this.addEditTrainerForm = this.fb.group({
      Name: "",
      Email: "",
      PhoneNumber: "",
      Password: "",
    });
  }

  ngOnInit(): void {
    this.getTrainerDataById();
  }

  getTrainerDataById(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this.Id = id !== null ? +id : null;
      if (this.Id) {
        this.apiTrainerService.getTrainerDataById(this.Id).subscribe({
          next: (response: ODataResponse<any>) => {
            const trainer = response.value[0];
            if (trainer) {
              this.addEditTrainerForm.patchValue(trainer);
              this.initialFormValues = this.addEditTrainerForm.value;
            }
          },
          error: (error) => {
            console.error(`Error fetching trainer data by ${this.Id}`, error);
          },
        });
      }
    });
  }

  async onSubmit(): Promise<void> {
    const TrainerData: Partial<any> = this.addEditTrainerForm.value;
    const isUpdate = !!this.Id;
    const actionText = isUpdate ? "update" : "add";
    const confirmed = await this.sweetAlertService.confirm(
      `Do you want to ${actionText} this trainer?`
    );

    if (confirmed) {
      this.apiTrainerService.addUpdateTrainer(this.Id, TrainerData).subscribe({
        next: (response: { success: boolean; message: any }) => {
          console.log(response);
          if (response.success) {
            this.router.navigate(["/training-configuration"]);
            this.sweetAlertService.success(response.message);
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

  onReset() {
    this.addEditTrainerForm.reset(this.initialFormValues);
  }
}
