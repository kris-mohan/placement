import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatTableDataSource } from "@angular/material/table";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { OfferManagementDetailsApiService } from "./api.offer-management-details";
import { ActivatedRoute } from "@angular/router";
import { Jobposting } from "src/app/services/types/Jobposting";

export type columnData = {
  SlNo: number;
  RoundNo: number;
  RoundName: string;
  Marks: number | null;
  Feedback: string;
};

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
  constructor(
    private location: Location,
    private offerManagementDetailsApiService: OfferManagementDetailsApiService,
    private route: ActivatedRoute
  ) {}

  JobPostingId: number | null = null;
  StudentId: number | null = null;
  interviewDetails: any[] = [];
  ngOnInit() {
    this.getInterviewDetails();
  }
  isLargeScreen() {
    return window.innerWidth > 768; // Customize based on your layout
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
      this.JobPostingId = jobPostingId !== null ? +jobPostingId : null;
      this.StudentId = studentId !== null ? +studentId : null;
      if (this.JobPostingId !== null && this.StudentId !== null) {
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
      this.JobPostingId = jobPostingId !== null ? +jobPostingId : null;
      this.StudentId = studentId !== null ? +studentId : null;

      // if (this.JobPostingId !== null && this.StudentId !== null) {
      //   this.offerManagementDetailsApiService
      //     .GetInterviewDetailsbystudent(this.JobPostingId, this.StudentId)
      //     .subscribe({
      //       next: (response) => {
      //         const data: Jobposting[] = response.value;
      //         const transformedData = response.value.flatMap((jobPosting) =>
      //           jobPosting.Jobinterviewrounds.flatMap((round) =>
      //             round.JobpostStudentrounds.map((studentRound) => ({
      //               CollegeName: studentRound.Student?.OrgId || "N/A",
      //               StudentName: studentRound.Student?.FirstName,
      //               Branch:
      //                 studentRound.Student?.Studentacademics?.[0]?.Course
      //                   ?.Name || "N/A",
      //               Batch: studentRound.Student?.Batch?.Name || "N/A",
      //               JobId: jobPosting.Id,
      //               JobRole: jobPosting.JobRole,
      //             }))
      //           )
      //         );
      //         this.interviewDetails = transformedData;
      //         console.log("Transformed Details", transformedData);
      //       },
      //       error: (error) => {
      //         console.log("Error fetching rounds: ", error);
      //       },
      //     });
      // }
    });
  };
}
