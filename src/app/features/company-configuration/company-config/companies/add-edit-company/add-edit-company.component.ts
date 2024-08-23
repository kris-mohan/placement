import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
// import { COMPANIES_DATA } from "../companies.component";
import { CommonModule } from "@angular/common";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { ODataResponse } from "../companies.component";
import { APIService } from "src/app/services/api-services/api-services";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { companyTableList } from "../companies-model";

@Component({
  selector: "app-add-edit-company",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./add-edit-company.component.html",
  styleUrl: "./add-edit-company.component.css",
})
export class AddEditCompanyComponent {
  addEditCompanyForm: FormGroup;
  companyId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiservice: APIService,
    private sweetAlertService: SweetAlertService
  ) {
    this.addEditCompanyForm = this.fb.group({
      CompanyName: ["", Validators.required],
      Location: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this.companyId = id !== null ? +id : null;
      if (this.companyId) {
        this.apiservice
          .getCompanyById(this.companyId)
          .subscribe((response: ODataResponse<companyTableList>) => {
            const company = response.value[0];
            if (company) {
              this.addEditCompanyForm.patchValue(company);
            }
          });
      }
    });
  }

  async onSubmit(): Promise<void> {
    if (this.addEditCompanyForm.valid) {
      const companyData: Partial<companyTableList> =
        this.addEditCompanyForm.value;
      const action = this.companyId ? "update" : "add";
      const confirmed = await this.sweetAlertService.confirm(
        `Do you want to ${action} this company?`
      );
      if (confirmed) {
        this.apiservice
          .addOrUpdateCompany(this.companyId, companyData)
          .subscribe(() => {
            this.router.navigate(["/company-configuration"]);
            this.sweetAlertService.success(`Company ${action}d successfully!`);
          });
      }
    }
  }

  onReset(): void {
    this.addEditCompanyForm.reset();
  }
}
