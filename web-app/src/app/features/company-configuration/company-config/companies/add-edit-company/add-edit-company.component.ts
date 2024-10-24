import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { CompanyAPIService } from "../api.companies";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { ActivatedRoute, Router } from "@angular/router";
import { ODataResponse } from "../companies.component";
import {
  Companydatum,
  PostCompanydatum,
} from "src/app/services/types/Companydatum";

@Component({
  selector: "app-add-edit-company",
  standalone: true,
  imports: [AMGModules, SharedModule, CommonModule],
  templateUrl: "./add-edit-company.component.html",
  styleUrl: "./add-edit-company.component.css",
})
export class AddEditCompanyComponent {
  addEditCompanyForm: FormGroup;
  Id: number | null = null;
  initialFormValues: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService,
    private apiCompanyService: CompanyAPIService,
    private location: Location
  ) {
    this.addEditCompanyForm = this.fb.group({
      Url: ["", [Validators.required]],
      Name: ["", [Validators.required]],
      Email: ["", [Validators.required, Validators.email]],
      Address: ["", [Validators.required]],
      PhoneNumber: ["", [Validators.required, Validators.pattern(/^\d+$/)]],
      Gstnumber: ["", [Validators.required]],
      ContactPerson: ["", [Validators.required]],
      AddressLine1: ["", [Validators.required]],
      City: ["", [Validators.required]],
      State: ["", [Validators.required]],
      ZipCode: ["", [Validators.required, Validators.pattern(/^\d+$/)]],
      Country: ["", [Validators.required]],
      ParentCompanyId: [null],
      IsDeleted: [false],
      IsActive: [true],
      DateOfRegistration: [null, [Validators.required]],
      CompanySize: [null, [Validators.required, Validators.min(1)]],
      LogoPath: [""],
      About: [""],
      HeadQuarters: [""],
      VideoPath: [""],
      PresentationPath: [""],
      DocumentPath: [""],
      AudioPath: [""],
    });
  }

  ngOnInit(): void {
    this.getCompanyById();
  }

  onReset() {
    this.addEditCompanyForm.reset(this.initialFormValues);
  }

  getCompanyById(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("companyId");
      this.Id = id !== null ? +id : null;
      if (this.Id) {
        this.apiCompanyService.getCompanyDataById(this.Id).subscribe({
          next: (response: ODataResponse<any>) => {
            const company = response.value[0];
            if (company) {
              this.addEditCompanyForm.patchValue(company);
              this.initialFormValues = this.addEditCompanyForm.value;
            }
          },
          error: (error) => {
            console.error(`Error fetching company data by ${this.Id}`, error);
          },
        });
      }
    });
  }

  async onSubmit() {
    const companyData: Partial<Companydatum> = this.addEditCompanyForm.value;
    const isUpdate = !!this.Id;
    const actionText = isUpdate ? "update" : "add";
    const confirmed = await this.sweetAlertService.confirm(
      `Do you want to ${actionText} this company?`
    );

    if (confirmed) {
      const companydatum: PostCompanydatum = {
        Id: this.Id ?? 0,
        Url: companyData.Url ?? "",
        Name: companyData.Name ?? "",
        Email: companyData.Email ?? "",
        Address: companyData.Address ?? "",
        PhoneNumber: companyData.PhoneNumber ?? "",
        Gstnumber: companyData.Gstnumber ?? "",
        ContactPerson: companyData.ContactPerson ?? "",
        AddressLine1: "",
        City: companyData.City ?? "",
        State: companyData.State ?? "",
        ZipCode: companyData.ZipCode ?? "",
        Country: companyData.Country ?? "",
        ParentCompanyId: 0,
        IsDeleted: 0,
        IsActive: 0,
        DateOfRegistration: companyData.DateOfRegistration ?? null,
        CompanySize: companyData.CompanySize ?? 0,
        LogoPath: companyData.LogoPath ?? "",
        About: companyData.About ?? "",
        HeadQuarters: companyData.HeadQuarters ?? "",
        VideoPath: companyData.VideoPath ?? "",
        PresentationPath: companyData.PresentationPath ?? "",
        DocumentPath: companyData.DocumentPath ?? "",
        AudioPath: companyData.AudioPath ?? "",
        UserRoleId: 0,
        Password: "",
      };
      this.apiCompanyService.addUpdateCompany(this.Id, companydatum).subscribe({
        next: (response: { success: boolean; message: any }) => {
          console.log(response);
          if (response.success) {
            this.sweetAlertService.success(response.message);
            this.router.navigate(["/placement-company"]);
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

  goBack(): void {
    this.location.back();
  }
}
