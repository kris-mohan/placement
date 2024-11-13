import { CommonModule } from "@angular/common";
import { Component, inject, Inject, OnInit, signal } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from "@angular/material/chips";
import { FlexLayoutModule } from "@angular/flex-layout";
import {
  Companydatum,
  PatchCompanyDatum,
  PostCompanydatum,
} from "src/app/services/types/Companydatum";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { EditProfileApiService } from "./api.edit-profile";
import { Industry } from "src/app/services/types/Industry";
// import { LiveAnnouncer } from "@angular/cdk/a11y";

type Sector = {
  Name?: string;
};

@Component({
  selector: "app-edit-profile",
  standalone: true,
  imports: [
    AMGModules,
    CommonModule,
    SharedModule,
    MatChipsModule,
    FlexLayoutModule,
  ],
  templateUrl: "./edit-profile.component.html",
  styleUrl: "./edit-profile.component.css",
})
export class EditProfileComponent implements OnInit {
  addEditCompanyProfile: FormGroup;
  addOnBlur: boolean = false;
  readonly sectorChips = signal<Sector[]>([]);

  industries: Industry[] = [];

  showAllSectors = false;

  types: string[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Companydatum[], // Data passed from the company-profile.component
    private sweetAlertService: SweetAlertService,
    private editProfileApiService: EditProfileApiService
  ) {
    this.addEditCompanyProfile = this.fb.group({
      sector: [""],
      overview: "",
      foundingYear: null,
      companySize: "",
      headquarters: "",
      website: "",
    });
  }
  ngOnInit(): void {
    this.loadInitialData();
    this.initializeForm();
    this.getAllIndustries();
  }
  initializeForm(): void {}

  getAllIndustries = () => {
    this.editProfileApiService.GetAllIndustries().subscribe({
      next: (response) => {
        const data: Industry[] = response.value;
        console.log("Dropdown Industries", data);
        this.industries = data;
      },
    });
  };

  // removeSectorChips(sector: string): void {
  //   console.log("hiii");
  //   const updatedSectors = this.sectorChips.filter((x) => x !== sector);
  //   this.sectorChips = updatedSectors;
  // }

  remove(sector: Sector): void {
    this.sectorChips.update((sectors) => {
      const index = sectors.indexOf(sector);
      if (index < 0) {
        return sectors;
      }
      sectors.splice(index, 1);
      return [...sectors];
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();
    if (value) {
      this.sectorChips.update((sectors) => [...sectors, { Name: value }]);
    }
    event.input.value = "";
  }

  loadInitialData(): void {
    console.log("Incoming Data", this.data[0]);
    console.log(
      this.data[0].Companyindustries,
      typeof this.data[0].Companyindustries
    );

    const industries = this.data[0].Companyindustries;

    const sectors: Sector[] = this.data[0].Companyindustries.map((sector) => ({
      Name: sector.Industry?.Type,
    }));
    this.sectorChips.update(() => sectors);

    const selectedIndustryIds = industries.map((sector) => sector.Industry?.Id);

    
    this.addEditCompanyProfile.patchValue({
      sector: selectedIndustryIds,
      overview: this.data[0].About || "", // Assuming 'About' is in the incoming data
      foundingYear: this.data[0].DateOfRegistration || "", // Assuming 'foundingYear' is directly available
      companySize: this.data[0].CompanySize || "", // Assuming 'CompanySize' is directly available
      headquarters: this.data[0].Address || "", // Assuming 'Address' is the headquarters
      website: this.data[0].Url || "", // Assuming 'Website' is in the incoming data
    });
  }


  async onSubmit() {
    console.log(this.addEditCompanyProfile.value.overview);
    const confirmed = await this.sweetAlertService.confirm(
      "Do you want to update the Company Profile?"
    );
    if (confirmed) {       
      const companyProfile: PatchCompanyDatum = {
        About: this.addEditCompanyProfile.value.overview,
        CompanySize: +this.addEditCompanyProfile.value.companySize,
        HeadQuarters: this.addEditCompanyProfile.value.headquarters,
        Url: this.addEditCompanyProfile.value.website,
        Companyindustries: this.addEditCompanyProfile.value.sector.map(
          (ind: number) => {
            return {
              IndustryId: ind,
              CompanyId: this.data[0].Id,
            };
          }
        ),
      };
      this.editProfileApiService
        .PatchCompanyDetails(this.data[0].Id, companyProfile)
        .subscribe({
          next: (response: { success: boolean; message: any }) => {
            console.log(response);
            if (response.success) {
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
