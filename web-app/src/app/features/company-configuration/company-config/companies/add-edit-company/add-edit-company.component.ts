import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { CompanyAPIService } from "../api.companies";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { ActivatedRoute, Router } from "@angular/router";
import { ODataResponse } from "../companies.component";

@Component({
  selector: "app-add-edit-company",
  standalone: true,
  imports: [AMGModules, SharedModule, CommonModule],
  templateUrl: "./add-edit-company.component.html",
  styleUrl: "./add-edit-company.component.css",
})
export class AddEditCompanyComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService,
    private apiCompanyService: CompanyAPIService
  ) {
    this.addEditCompanyForm = this.fb.group({
      Url: "",
      Name: "",
      ContactPerson: "",
      City: "",
      ZipCode: "",
    });
  }
  addEditCompanyForm: FormGroup;
  Id: number | null = null;

  ngOnInit(): void {
    this.getCompanyById();
  }

  onReset() {
    this.addEditCompanyForm.reset();
  }

  getCompanyById(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("companyId");
      this.Id = id !== null ? +id : null;
      if (this.Id) {
        this.apiCompanyService.getCompanyDataById(this.Id).subscribe({
          next: (response: ODataResponse<any>) => {
            const Company = response.value[0];
            if (Company) {
              this.addEditCompanyForm.patchValue(Company);
            }
          },
          error: (error) => {
            console.error(`Error fetching Company data by ${this.Id}`, error);
          },
        });
      }
    });
  }

  async onSubmit(): Promise<void> {
    const companyData: Partial<any> = this.addEditCompanyForm.value;
    const isUpdate = !!this.Id;
    const actionText = isUpdate ? "update" : "add";
    const confirmed = await this.sweetAlertService.confirm(
      `Do you want to ${actionText} this company?`
    );

    if (confirmed) {
      this.apiCompanyService.addUpdateCompany(this.Id, companyData).subscribe({
        next: (response: { success: boolean; message: any }) => {
          console.log(response);
          if (response.success) {
            this.router.navigate(["/company-configuration"]);
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
