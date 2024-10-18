import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { CampusRegistrationAPIService } from "./api.campus.registration";
import { Campusregistration } from "./campus-registration.module";

export interface ODataResponse<T> {
  value: T[];
}

@Component({
  selector: "app-campus-registration",
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: "./campus-registration.component.html",
  styleUrl: "./campus-registration.component.css",
})
export class CampusRegistrationComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService,
    private apiCampusRegistration: CampusRegistrationAPIService
  ) {
    this.addCampusRegistrationForm = this.fb.group({
      CollegeName: "",
      CollegeEmail: "",
      Password: "",
      PlacementOfficerName: "",
      Email: "",
      ContactNumber: "",
      Address: "",
      State: "",
      Country: "",
      ZipCode: "",
    });
  }
  addCampusRegistrationForm: FormGroup;
  Id: number | null = null;
  isPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  toggleConfirmPasswordVisibility() {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }

  onReset() {
    this.addCampusRegistrationForm.reset();
  }

  async onSubmit(): Promise<void> {
    const companyData: Partial<Campusregistration> =
      this.addCampusRegistrationForm.value;
    companyData.ContactNumber = parseInt(
      companyData.ContactNumber as unknown as string
    );
    companyData.UserRoleId = 1;
    const isUpdate = !!this.Id;
    const actionText = isUpdate ? "update" : "add";
    const confirmed = await this.sweetAlertService.confirm(
      `Do you want to register?`
    );

    if (confirmed) {
      this.apiCampusRegistration
        .addUpdateCampusRegistration(this.Id, companyData)
        .subscribe({
          next: (response: { success: boolean; message: any }) => {
            console.log(response);
            if (response.success) {
              this.router.navigate(["/login"]);
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
}
