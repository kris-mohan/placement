import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { CompanyRegistrationAPIService } from "./api.company.registration";
import { CompanyRegistration } from "./company-registration.module";

export interface ODataResponse<T> {
  value: T[];
}

@Component({
  selector: "app-company-registration",
  standalone: true,
  imports: [SharedModule, AMGModules, CommonModule],
  templateUrl: "./company-registration.component.html",
  styleUrl: "./company-registration.component.css",
})
export class CompanyRegistrationComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService,
    private apiCompanyRegistration: CompanyRegistrationAPIService
  ) {
    this.addcompanyRegistrationForm = this.fb.group({
      CompanyName: "",
      Email: "",
      Location: "",
      Password: "",
      PhoneNumber: "",
      ContactPerson: "",
    });
  }

  addcompanyRegistrationForm: FormGroup;
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
    this.addcompanyRegistrationForm.reset();
  }

  async onSubmit(): Promise<void> {
    const companyData: Partial<CompanyRegistration> =
      this.addcompanyRegistrationForm.value;
    companyData.UserType = 2;
    const isUpdate = !!this.Id;
    const actionText = isUpdate ? "update" : "add";
    const confirmed = await this.sweetAlertService.confirm(
      `Do you want to register?`
    );

    if (confirmed) {
      this.apiCompanyRegistration
        .addUpdateCompanyRegistration(this.Id, companyData)
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
