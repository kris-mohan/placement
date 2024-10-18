import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { JobEligibleStudentsModalComponent } from './job-eligible-students-modal/job-eligible-students-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { AMGModules } from 'src/AMG-Module/AMG-module';
import { FunnelChartComponent } from '../../charts/funnel chart/funnel-chart/funnel-chart.component';
import { FormControl } from '@angular/forms';
@Component({
  selector: "app-company-job-description",
  standalone: true,
  imports: [SharedModule, CommonModule, AMGModules, FunnelChartComponent],
  templateUrl: "./company-job-description.component.html",
  styleUrl: "./company-job-description.component.css",
})
export class CompanyJobDescriptionComponent {
  UserRoleId: number;
  selectCollegeControl = new FormControl();
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
  constructor(private location: Location) {
    const storedUserType = sessionStorage.getItem("UserRoleId");
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

  openStudentJobAdditionalFiltersModal() {}

  openAddEditCompanyForm(id: number) {}
}
