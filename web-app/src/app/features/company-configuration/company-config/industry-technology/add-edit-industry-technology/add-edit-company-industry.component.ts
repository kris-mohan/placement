import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { TechnologyAPIService } from "../../technologies/api-technology";
import { IndustryAPIService } from "../../industry/api.industry";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Industry } from "../../industry/industry.module";
import { Technology } from "../../technologies/technologies-module";
import { ODataResponse } from "../company-industry.component";
import { CompanyAPIService } from "../../companies/api.companies";
import { companyTableList } from "../../companies/companies-model";
import { CompanyindustryAPIService } from "../api.company.industries";
import { companyIndustries } from "../company-industry.module";

@Component({
  selector: "app-add-edit-industry-technology",
  standalone: true,
  imports: [SharedModule, CommonModule, AMGModules],
  templateUrl: "./add-edit-company-industry.component.html",
  styleUrl: "./add-edit-company-industry.component.css",
})
export class AddEditcompanyIndustryComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService,
    private apiIndustryService: IndustryAPIService,
    private apiCompanyService: CompanyAPIService,
    private apiCompanyindustryService: CompanyindustryAPIService
  ) {
    this.addEditCompanyIndsutryForm = this.fb.group({
      CompanyName: "",
      Industries: [],
    });
  }

  addEditCompanyIndsutryForm: FormGroup;
  Id: number | null = null;
  Industries: Industry[] = [];
  companies: companyTableList[] = [];

  ngOnInit() {
    this.loadIndustryData();
    this.loadCompanyData();
    this.loadCompanyIndustryDataById();
  }

  loadIndustryData() {
    this.apiIndustryService.loadIndustryData().subscribe({
      next: (response: ODataResponse<any>) => {
        console.log("API Response:", response);
        this.Industries = response.value;
      },
      error: (error) => {
        console.error("Error loading Industries", error);
      },
    });
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

  loadCompanyIndustryDataById() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("companyIndustryId");
      this.Id = id !== null ? +id : null;
      if (this.Id) {
        this.apiCompanyindustryService
          .getCompanyindustryDataById(this.Id)
          .subscribe({
            next: (response: ODataResponse<any>) => {
              const companyIndustryData = response.value[0];
              if (companyIndustryData) {
                this.addEditCompanyIndsutryForm.patchValue({
                  CompanyName: companyIndustryData.CompanyId,
                  Industries: companyIndustryData.Industries.map(
                    (industry: any) => industry.IndustryId
                  ),
                });
              }
            },
            error: (error) => {
              console.error(
                `Error fetching company industry data by ${this.Id}`,
                error
              );
            },
          });
      }
    });
  }

  async onSubmit(): Promise<void> {
    const selectedCompanyId = this.addEditCompanyIndsutryForm.value.CompanyName;
    const companyData: companyIndustries = {
      Id: selectedCompanyId,
      CompanyIndustries: this.addEditCompanyIndsutryForm.value.Industries.map(
        (industryId: number) => ({
          CompanyId: selectedCompanyId,
          IndustryId: industryId,
        })
      ),
    };
    const isUpdate = !!this.Id;
    const actionText = isUpdate ? "update" : "add";
    const confirmed = await this.sweetAlertService.confirm(
      `Do you want to ${actionText} this CompanyIndsutry?`
    );

    if (confirmed) {
      this.apiCompanyindustryService
        .addUpdateCompanyindustry(selectedCompanyId, companyData)
        .subscribe({
          next: (response: { success: boolean; message: any }) => {
            console.log(response);
            if (response.success) {
              this.sweetAlertService.success(response.message);
              this.router.navigate(["/company-configuration"]);
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
    this.addEditCompanyIndsutryForm.reset();
  }
}
