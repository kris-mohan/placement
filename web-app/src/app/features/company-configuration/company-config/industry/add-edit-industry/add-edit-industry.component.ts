import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { IndustryAPIService } from "../api.industry";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { ActivatedRoute, Router } from "@angular/router";
import { ODataResponse } from "../industry.component";
import { Industry } from "../industry.module";
import { Technology } from "../../technologies/technologies-module";
import { TechnologyAPIService } from "../../technologies/api-technology";

@Component({
  selector: "app-add-edit-industry",
  standalone: true,
  imports: [SharedModule, AMGModules],
  templateUrl: "./add-edit-industry.component.html",
  styleUrl: "./add-edit-industry.component.css",
})
export class AddEditIndustryComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService,
    private apiIndustryService: IndustryAPIService
  ) {
    this.addEditIndustryForm = this.fb.group({
      Type: "",
      Description: "",
    });
  }

  addEditIndustryForm: FormGroup;
  Id: number | null = null;
  Industries: Industry[] = [];
  Technologies: Technology[] = [];

  ngOnInit() {
    this.loadIndustryData();
    this.loadIndustryDataById();
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

  loadIndustryDataById(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("industryId");
      this.Id = id !== null ? +id : null;
      if (this.Id) {
        this.apiIndustryService.getIndustryDataById(this.Id).subscribe({
          next: (response: ODataResponse<any>) => {
            const technology = response.value[0];
            if (technology) {
              this.addEditIndustryForm.patchValue(technology);
            }
          },
          error: (error) => {
            console.error(
              `Error fetching technology data by ${this.Id}`,
              error
            );
          },
        });
      }
    });
  }

  async onSubmit(): Promise<void> {
    const IndustryData: Partial<any> = this.addEditIndustryForm.value;
    const isUpdate = !!this.Id;
    const actionText = isUpdate ? "update" : "add";
    const confirmed = await this.sweetAlertService.confirm(
      `Do you want to ${actionText} this Industry?`
    );

    if (confirmed) {
      this.apiIndustryService
        .addUpdateIndustry(this.Id, IndustryData)
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
    this.addEditIndustryForm.reset();
  }
}
