import { Component, inject } from "@angular/core";
import { CommonModule, Location } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { JobEligibleStudentsModalComponent } from "./job-eligible-students-modal/job-eligible-students-modal.component";
import { MatDialog } from "@angular/material/dialog";
@Component({
  selector: "app-company-job-description",
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: "./company-job-description.component.html",
  styleUrl: "./company-job-description.component.css",
})
export class CompanyJobDescriptionComponent {
  userType: number;
  constructor(private location: Location) {
    const storedUserType = sessionStorage.getItem("userType");
    this.userType = storedUserType ? parseInt(storedUserType) : 0;
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
}
