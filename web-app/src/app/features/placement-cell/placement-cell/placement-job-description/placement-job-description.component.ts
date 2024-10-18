import { Component, inject } from "@angular/core";
import { CommonModule, Location } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { MatDialog } from "@angular/material/dialog";
import { JobEligibleStudentsModalComponent } from "src/app/features/company-menu/company-job-description/job-eligible-students-modal/job-eligible-students-modal.component";
import { Router } from "@angular/router";
@Component({
  selector: "app-placement-job-description",
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: "./placement-job-description.component.html",
  styleUrl: "./placement-job-description.component.css",
})
export class PlacementJobDescriptionComponent {
  UserRoleId: number;
  constructor(private location: Location, private router: Router) {
    const storedUserRoleId = sessionStorage.getItem("UserRoleId");
    this.UserRoleId = storedUserRoleId ? parseInt(storedUserRoleId) : 0;
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

  openAddEditJobPosting(id: number) {
    if (id !== undefined) {
      this.router.navigate([
        "/placement-company/placement-company-job-details/add-edit-jobPosting/",
        id,
      ]);
    } else {
      this.router.navigate([
        "/placement-company/placement-company-job-details/add-edit-jobPosting/",
        0,
      ]);
    }
  }
}
