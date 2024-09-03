import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { companyList } from "src/app/features/placement-cell/placement-cell/company-list-details/company-list-details-model";
import { SharedModule } from "src/app/shared/shared.module";
import {
  CompanyTechnologies,
  Companytechonology,
} from "../company-technology-module";
import { ODataResponse } from "../company-technology.component";
import { TechnologyAPIService } from "../../technologies/api-technology";
import { Technology } from "../../technologies/technologies-module";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { CompanyTechnologyAPIService } from "../api.company-technology";
import { companyTableList } from "../../companies/companies-model";
import { CompanyAPIService } from "../../companies/api.companies";

@Component({
  selector: "app-add-edit-comp-tech",
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: "./add-edit-comp-tech.component.html",
  styleUrl: "./add-edit-comp-tech.component.css",
})
export class AddEditCompTechComponent {
  addEditCompanyTechnologyForm: FormGroup;
  Id: number | null = null;
  companies: companyTableList[] = [];
  technologies: Technology[] = [];
  initialFormValues: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiCompanyService: CompanyAPIService,
    private apiTechonologyService: TechnologyAPIService,
    private sweetAlertService: SweetAlertService,
    private apiCompanyTechnologyService: CompanyTechnologyAPIService
  ) {
    this.addEditCompanyTechnologyForm = this.fb.group({
      CompanyName: "",
      Technologies: [],
    });
  }

  selection = new SelectionModel<Companytechonology>(true, []);

  ngOnInit() {
    this.loadCompanyData();
    this.loadTechnologyData();
    this.getCompanyById();
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

  loadTechnologyData() {
    this.apiTechonologyService.loadTechnologyData().subscribe({
      next: (response: ODataResponse<any>) => {
        console.log("API Response:", response);
        this.technologies = response.value;
      },
      error: (error) => {
        console.error("Error loading technologies", error);
      },
    });
  }

  getCompanyById(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("companyTechnology");
      this.Id = id !== null ? +id : null;
      if (this.Id) {
        this.apiCompanyService.getCompanyDataById(this.Id).subscribe({
          next: (response: ODataResponse<companyTableList>) => {
            const company = response.value[0];
            if (company) {
              this.addEditCompanyTechnologyForm.patchValue(company);
              this.initialFormValues = this.addEditCompanyTechnologyForm.value;
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
    const selectedCompanyId =
      this.addEditCompanyTechnologyForm.value.CompanyName;
    const companyData: CompanyTechnologies = {
      Id: selectedCompanyId,
      Companytechonologies:
        this.addEditCompanyTechnologyForm.value.Technologies.map(
          (techId: number) => ({
            CompanyId: selectedCompanyId,
            TechnologyId: techId,
          })
        ),
    };
    const isUpdate = !!this.Id;
    const actionText = isUpdate ? "update" : "add";
    const confirmed = await this.sweetAlertService.confirm(
      `Do you want to ${actionText} these technology to company?`
    );

    if (confirmed) {
      this.apiCompanyTechnologyService
        .addUpdateCompanyTechnology(selectedCompanyId, companyData)
        .subscribe({
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

  onReset() {
    this.addEditCompanyTechnologyForm.reset(this.initialFormValues);
  }
}
