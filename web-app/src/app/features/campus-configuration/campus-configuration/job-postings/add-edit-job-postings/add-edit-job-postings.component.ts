import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { companyTableList } from "src/app/features/company-configuration/company-config/companies/companies-model";
import { CompanyAPIService } from "src/app/features/company-configuration/company-config/companies/api.companies";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { ODataResponse } from "src/app/features/company-configuration/company-config/companies/companies.component";
import { RoleAPIService } from "src/app/features/company-configuration/company-config/roles/api.role";
import { Role } from "src/app/features/company-configuration/company-config/roles/roles-module";
import { Jobposting } from "../job-postings-model";
import { JobPostingAPIService } from "../api.job.posting";

@Component({
  selector: "app-add-edit-job-postings",
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: "./add-edit-job-postings.component.html",
  styleUrl: "./add-edit-job-postings.component.css",
})
export class AddEditJobPostingsComponent {
  addEditJobPostForm: FormGroup;
  Id: number | null = null;
  companies: companyTableList[] = [];
  Roles: Role[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiCompanyService: CompanyAPIService,
    private sweetAlertService: SweetAlertService,
    private apiRoleService: RoleAPIService,
    private apiJobPostingService: JobPostingAPIService
  ) {
    this.addEditJobPostForm = this.fb.group({
      OrgId: null,
      CompanyId: null,
      JobRole: "",
      JobDescription: "",
      ValidFrom: "",
      ValidTill: "",
      Positions: null,
      QuantityFilled: null,
      IsClosed: null,
    });
  }

  ngOnInit() {
    this.loadCompanyData();
    this.jobPostDataById();
    this.loadRoleData();
  }

  onReset() {
    this.addEditJobPostForm.reset();
  }

  loadCompanyData() {
    this.apiCompanyService.loadCompanyData().subscribe({
      next: (response: ODataResponse<any>) => {
        console.log("API Response:", response);
        this.companies = response.value;
      },
      error: (error) => {
        console.error("Error loading companies", error);
      },
    });
  }

  loadRoleData() {
    this.apiRoleService.loadRoleData().subscribe({
      next: (response: ODataResponse<any>) => {
        console.log("API Response:", response);
        this.Roles = response.value;
        console.log(response.value);
      },
      error: (error) => {
        console.error("Error loading Roles", error);
      },
    });
  }

  jobPostDataById(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this.Id = id !== null ? +id : null;
      if (this.Id) {
        this.apiJobPostingService.getJobPostingDataById(this.Id).subscribe({
          next: (response: ODataResponse<Jobposting>) => {
            const Jobposting = response.value[0];
            if (Jobposting) {
              this.addEditJobPostForm.patchValue(Jobposting);
            }
          },
          error: (error) => {
            console.error(`Error fetching company data by ${this.Id}`, error);
          },
        });
      }
    });
  }

  async onSubmit(): Promise<void> {
    const formValues = this.addEditJobPostForm.value;
    formValues.Positions = parseInt(formValues.Positions);
    formValues.QuantityFilled = parseInt(formValues.QuantityFilled);

    const jobPostingData: Partial<any> = formValues;
    const isUpdate = !!this.Id;
    const actionText = isUpdate ? "update" : "add";
    const confirmed = await this.sweetAlertService.confirm(
      `Do you want to ${actionText} this Job Posting?`
    );

    if (confirmed) {
      this.apiJobPostingService
        .addUpdateJobPosting(this.Id, jobPostingData)
        .subscribe({
          next: (response: { success: boolean; message: any }) => {
            console.log(response);
            if (response.success) {
              this.sweetAlertService.success(response.message);
              this.router.navigate(["/campus-configuration"]);
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
