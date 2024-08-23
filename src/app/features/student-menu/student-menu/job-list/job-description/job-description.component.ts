import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { AddEditCompanyJobDetailsComponent } from "src/app/features/company-menu/company-job-details/add-edit-company-job-details/add-edit-company-job-details.component";
import { APIService } from "src/app/services/api-services/api-services";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  selector: "app-job-description",
  standalone: true,
  imports: [
    CommonModule,
    AMGModules,
    SharedModule,
    AddEditCompanyJobDetailsComponent,
  ],
  templateUrl: "./job-description.component.html",
  styleUrl: "./job-description.component.css",
})
export class JobDescriptionComponent {
  constructor(
    private router: Router,
    private sweetAlertService: SweetAlertService,
    private location: Location,
    private route: ActivatedRoute,
    private apiService: APIService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const jobId = params.get("jobId");
      if (jobId) {
      }
    });
  }
  goBack(): void {
    this.location.back();
  }
}
