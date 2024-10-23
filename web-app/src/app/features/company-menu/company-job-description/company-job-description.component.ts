import { Component, inject } from "@angular/core";
import { CommonModule, Location } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { JobEligibleStudentsModalComponent } from "./job-eligible-students-modal/job-eligible-students-modal.component";
import { MatDialog } from "@angular/material/dialog";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { FunnelChartComponent } from "../../charts/funnel chart/funnel-chart/funnel-chart.component";
import { FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { CompanyJobDetailsApiService } from "../company-job-details/company-job-details-apiService";
import { Jobposting } from "src/app/services/types/Jobposting";
@Component({
  selector: "app-company-job-description",
  standalone: true,
  imports: [SharedModule, CommonModule, AMGModules, FunnelChartComponent],
  templateUrl: "./company-job-description.component.html",
  styleUrl: "./company-job-description.component.css",
})
export class CompanyJobDescriptionComponent {
  Id: number | null = null;
  UserRoleId: number;
  selectCollegeControl = new FormControl();
  JobPostingDescription: Jobposting[] = [];

  collegesNames: string[] = [
    "East West Institute of Technology",
    "East West School of Architecture",
    "East West First Grade College of Science ",
    "East West College of Management",
    "St. John’s Pharmacy College",
    "East West College of Pharmacy",
    "East West College of Nursing",
    "East West Institute of Polytechnic",
    "East West Polytechnic",
  ];
  selectedCollegeData: number[] = [];
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private companyJobDetailsApiService: CompanyJobDetailsApiService
  ) {
    const storedUserType = sessionStorage.getItem("userRoleId");
    this.UserRoleId = storedUserType ? parseInt(storedUserType) : 0;
  }
  readonly dialog = inject(MatDialog);

  goBack(): void {
    this.location.back();
  }

  openEligibleStudentsModel(): void {
    this.dialog.open(JobEligibleStudentsModalComponent, {
      width: "90vw",
      height: "80vh",
    });
  }

  getCompanyJobDescriptionById(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this.Id = id !== null ? +id : null;
      // if (this.Id) {
      //   this.companyJobDetailsApiService
      //     .GetJobPostingsDataById(this.Id)
      //     .subscribe({
      //       next: (response: <Jobposting>) => {
      //         const course = response.value[0];
      //       },
      //       error: (error) => {
      //         console.error(
      //           `Error fetching Training Course data by ${this.Id}`,
      //           error
      //         );
      //       },
      //     });
      // }
    });
  }

  openStudentJobAdditionalFiltersModal() {}

  openAddEditCompanyForm(id: number) {}
}
