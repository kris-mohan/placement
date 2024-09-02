import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { DialogMessageService } from "src/app/services/dialog-message/dialog-message/dialog-message.service";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { Jobposting } from "./job-postings-model";
import { JobPostingAPIService } from "./api.job.posting";

export interface ODataResponse<T> {
  value: T[];
}

@Component({
  selector: "app-job-postings",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./job-postings.component.html",
  styleUrl: "./job-postings.component.css",
})
export class JobPostingsComponent {
  constructor(
    private router: Router,
    private dialogService: DialogMessageService,
    private sweetAlertService: SweetAlertService,
    private location: Location,
    private apiJobPostingService: JobPostingAPIService
  ) {}
  displayedColumns: string[] = [
    "Id",
    "OrgId",
    "CompanyId",
    "JobDescription",
    "ValidFrom",
    "ValidTill",
    "Positions",
    "QuantityFilled",
    "IsClosed",
    "Actions",
  ];
  columns = [
    { key: "Id", label: "Id" },
    { key: "OrgId", label: "OrgId" },
    { key: "CompanyId", label: "Company Name" },
    { key: "JobDescription", label: "Job Description" },
    { key: "ValidFrom", label: "Valid From" },
    { key: "ValidTill", label: "Valid Till" },
    { key: "Positions", label: "Positions" },
    { key: "QuantityFilled", label: "Quantity Filled" },
    { key: "IsClosed", label: "Is Closed" },
    { key: "Actions", label: "Actions" },
  ];
  dataSource = new MatTableDataSource<Jobposting>([]);

  openAddEditJobPostForm(id?: number) {
    if (id !== undefined && id !== null) {
      this.router.navigate(["/campus-configuration/job-postings", id]);
    } else {
      this.router.navigate(["/campus-configuration/job-postings", 0]);
    }
  }

  ngOnInit() {
    this.loadJobPostingData();
  }

  loadJobPostingData() {
    this.apiJobPostingService.loadJobPostingData().subscribe({
      next: (response: ODataResponse<Jobposting>) => {
        console.log("API Response:", response);
        this.dataSource.data = response.value;
      },
      error: (error) => {
        console.error("Error loading Job Posting", error);
      },
    });
  }

  async deleteJobPost(id: number) {
    const confirmed = await this.sweetAlertService.confirmDelete(
      "Do you really want to delete this Job Post?"
    );

    if (confirmed) {
      this.apiJobPostingService.deleteJobPosting(id).subscribe({
        next: (response: { success: boolean; message: string }) => {
          if (response.success) {
            this.sweetAlertService.success(response.message);
            this.loadJobPostingData();
          } else {
            this.sweetAlertService.error(response.message);
          }
        },
        error: (error) => {
          this.sweetAlertService.error(
            "An unexpected error occurred while deleting the Job Post."
          );
          console.error("Error deleting Job Post:", error);
        },
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
