import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  input,
  OnInit,
  Output,
} from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Technology } from "../technologies-module";
import { TechnologyAPIService } from "../api-technology";
import { ODataResponse } from "../technologies.component";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";

@Component({
  selector: "app-add-edit-technology",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./add-edit-technology.component.html",
  styleUrl: "./add-edit-technology.component.css",
})
export class AddEditTechnologyComponent implements OnInit {
  technologies: Technology[] = [];
  addEditTechnologyForm: FormGroup;
  Id: number | null = null;
  initialFormValues: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiTechnologyService: TechnologyAPIService,
    private sweetAlertService: SweetAlertService
  ) {
    this.addEditTechnologyForm = this.fb.group({
      Name: "",
      Description: "",
    });
  }

  ngOnInit(): void {
    this.loadTechnologyData();
    this.getTechnologyById();
  }

  loadTechnologyData(): void {
    this.apiTechnologyService.loadTechnologyData().subscribe({
      next: (response: ODataResponse<any>) => {
        this.technologies = response.value;
      },
      error: (error) => {},
    });
  }

  getTechnologyById(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("technologyId");
      this.Id = id !== null ? +id : null;
      if (this.Id) {
        this.apiTechnologyService.getTechnologyDataById(this.Id).subscribe({
          next: (response: ODataResponse<any>) => {
            const technology = response.value[0];
            if (technology) {
              this.addEditTechnologyForm.patchValue(technology);
              this.initialFormValues = this.addEditTechnologyForm.value;
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
    const TechnologyData: Partial<any> = this.addEditTechnologyForm.value;
    const isUpdate = !!this.Id;
    const actionText = isUpdate ? "update" : "add";
    const confirmed = await this.sweetAlertService.confirm(
      `Do you want to ${actionText} this Technology?`
    );

    if (confirmed) {
      this.apiTechnologyService
        .addUpdateTechnology(this.Id, TechnologyData)
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
    this.addEditTechnologyForm.reset(this.initialFormValues);
  }
}
