import { CommonModule, Location } from "@angular/common";
import { Component, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatTableDataSource } from "@angular/material/table";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { OfferManagementDetailsApiService } from "./api.offer-management-details";
import { ActivatedRoute } from "@angular/router";
import { Jobposting } from "src/app/services/types/Jobposting";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";

export type columnData = {
  SlNo: number;
  RoundNo: number;
  RoundName: string;
  Marks: number | null;
  Feedback: string;
};
interface InterviewDetails {
  collegeName: string;
  studentName: string;
  branch: string;
  stream: string;
  jobId: number;
  batch: number | string;
  jobRole: string;
}
@Component({
  selector: "app-offer-management-details",
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    SharedModule,
    AMGModules,
  ],
  templateUrl: "./offer-management-details.component.html",
  styleUrl: "./offer-management-details.component.css",
})
export class OfferManagementDetailsComponent {
  UserRoleId: number;
  isOfferAccepted = signal(false);
  constructor(
    private location: Location,
    private offerManagementDetailsApiService: OfferManagementDetailsApiService,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService
  ) {
    const storedUserRoleId = sessionStorage.getItem("userRoleId");
    this.UserRoleId = storedUserRoleId ? parseInt(storedUserRoleId) : 0;
  }

  JobPostingId: number | null = null;
  StudentId: number | null = null;
  interviewDetails: InterviewDetails | null = null;
  Id: number | null = null;
  ngOnInit() {
    this.getStudentOfferStatus();
    this.getInterviewDetails();
    this.getInterviewDetailsbystudent();
  }

  getStudentOfferStatus() {
    this.route.paramMap.subscribe((params) => {
      const jobPostingId = params.get("jobPostingId");
      const studentId = params.get("studentId");
      if (jobPostingId && studentId) {
        this.offerManagementDetailsApiService
          .GetStudentJobOfferStatus(+jobPostingId, +studentId)
          .subscribe({
            next: (response) => {
              const data = response.value[0];
              if (data) {
                this.isOfferAccepted.set(data.HasAcceptedOffer === 1);
              }
              console.log("student Details", this.interviewDetails);
            },
            error: (err) => {
              console.error("Error fetching interview details:", err);
            },
          });
      }
    });
  }

  isLargeScreen() {
    return window.innerWidth > 768;
  }

  detailsDataSource = new MatTableDataSource<columnData>();
  displayedColumns: string[] = [
    "SlNo",
    "RoundNo",
    "RoundName",
    "Marks",
    "Feedback",
  ];
  columns = [
    { key: "SlNo", label: "Sl. No" },
    { key: "RoundNo", label: "Round No" },
    { key: "RoundName", label: "Round Name" },
    { key: "Marks", label: "Marks" },
    { key: "Feedback", label: "Feedback" },
  ];
  goBack(): void {
    this.location.back();
  }

  getInterviewDetails = () => {
    this.route.paramMap.subscribe((params) => {
      const jobPostingId = params.get("jobPostingId");
      const studentId = params.get("studentId");
      const id = params.get("id");
      this.JobPostingId = jobPostingId !== null ? +jobPostingId : null;
      this.StudentId = studentId !== null ? +studentId : null;
      this.Id = id !== null ? +id : null;
      if (
        this.JobPostingId !== null &&
        this.StudentId !== null &&
        this.Id !== null
      ) {
        this.offerManagementDetailsApiService
          .GetInterviewDetails(this.JobPostingId, this.StudentId)
          .subscribe({
            next: (response) => {
              const data: Jobposting[] = response.value;
              console.log("Details", data);
              const transformedData: columnData[] = [];

              data.forEach((jobPosting) => {
                jobPosting.Jobinterviewrounds.forEach((item) => {
                  item.JobpostStudentrounds.forEach((round, index) => {
                    transformedData.push({
                      SlNo: index + 1,
                      RoundNo: item.Priority ?? 0,
                      RoundName: item.Name || "",
                      Marks: round.Score || null,
                      Feedback: round.Feedback || "",
                    });
                  });
                });
              });

              console.log("Transformed Details", transformedData);
              this.detailsDataSource.data = transformedData;
            },
            error: (error) => {
              console.log("Error fetching rounds: ", error);
            },
          });
      }
    });
  };

  getInterviewDetailsbystudent = () => {
    this.route.paramMap.subscribe((params) => {
      const jobPostingId = params.get("jobPostingId");
      const studentId = params.get("studentId");
      const id = params.get("id");
      this.JobPostingId = jobPostingId !== null ? +jobPostingId : null;
      this.StudentId = studentId !== null ? +studentId : null;
      this.Id = id !== null ? +id : null;
      if (
        this.JobPostingId !== null &&
        this.StudentId !== null &&
        this.Id !== null
      ) {
        this.offerManagementDetailsApiService
          .GetInterviewDetailsbystudent(this.JobPostingId, this.StudentId)
          .subscribe({
            next: (response) => {
              const data = response.value[0];
              if (data) {
                const student =
                  data.Jobinterviewrounds[0]?.JobpostStudentrounds[0]?.Student;
                const collegeName =
                  data.Collegejobpostings[0]?.College?.CollegeName;
                this.interviewDetails = {
                  collegeName: collegeName ?? "",
                  studentName: student?.FirstName ?? "",
                  branch: student?.Studentacademics[0]?.Course?.FullForm ?? "",
                  stream: student?.Studentacademics[0]?.Stream?.Name ?? "",
                  jobId: data.Id,
                  batch: student?.Batch?.Name ?? "",
                  jobRole: data.JobRole ?? "",
                };
              }
              console.log("student Details", this.interviewDetails);
            },
            error: (err) => {
              console.error("Error fetching interview details:", err);
            },
          });
      }
    });
  };

  acceptOffer = async () => {
    const confirmed = await this.sweetAlertService.confirm(
      "Do you want to accept this offer?"
    );
    if (confirmed && this.JobPostingId && this.StudentId && this.Id) {
      this.offerManagementDetailsApiService
        .updateOfferStatus(this.JobPostingId, this.StudentId, 1, this.Id)
        .subscribe({
          next: (response: { success: boolean; message: any }) => {
            this.getInterviewDetails();
            if (response.success) {
              this.isOfferAccepted.set(true);
              this.sweetAlertService.success("Offer accepted successfully.");
            } else {
              this.sweetAlertService.error(
                response.message || "Error accepting the offer."
              );
            }
          },
          error: (err) => {
            console.error("Error accepting the offer:", err);
            this.sweetAlertService.error(
              "An unexpected error occurred while accepting the offer."
            );
          },
        });
    }
  };

  rejectOffer = async () => {
    const confirmed = await this.sweetAlertService.confirm(
      "Do you want to reject this offer?"
    );
    if (confirmed && this.JobPostingId && this.StudentId && this.Id) {
      this.offerManagementDetailsApiService
        .updateOfferStatus(this.JobPostingId, this.StudentId, 2, this.Id)
        .subscribe({
          next: (response: { success: boolean; message: any }) => {
            this.getInterviewDetails();
            if (response.success) {
              this.sweetAlertService.success("Offer rejected successfully.");
            } else {
              this.sweetAlertService.error(
                response.message || "Error rejecting the offer."
              );
            }
          },
          error: (err) => {
            console.error("Error rejecting the offer:", err);
            this.sweetAlertService.error(
              "An unexpected error occurred while rejecting the offer."
            );
          },
        });
    }
  };
}
