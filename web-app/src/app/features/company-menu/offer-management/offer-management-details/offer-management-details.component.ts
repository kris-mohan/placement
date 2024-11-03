import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatTableDataSource } from "@angular/material/table";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { roundsDetails } from "./offer-mamanement-details-model";
import { OfferManagementDetailsApiService } from "./api.offer-management-details";
import { Jobinterviewround } from "src/app/services/types/Jobinterviewround";
import { ActivatedRoute } from "@angular/router";

export const RoundsData: roundsDetails[] = [
  {
    SlNo: 1,
    RoundNo: 1,
    RoundName: "First Round",
    PeriodOfRequirement: "January 2024 - March 2024",
    Marks: 85,
    Feedback: "Great performance, keep it up!",
  },
  {
    SlNo: 2,
    RoundNo: 2,
    RoundName: "Second Round",
    PeriodOfRequirement: "April 2024 - June 2024",
    Marks: 78,
    Feedback: "Good effort, but there's room for improvement.",
  },
  {
    SlNo: 3,
    RoundNo: 3,
    RoundName: "Third Round",
    PeriodOfRequirement: "July 2024 - September 2024",
    Marks: 90,
    Feedback: "Excellent work, exceeded expectations!",
  },
  {
    SlNo: 4,
    RoundNo: 4,
    RoundName: "Final Round",
    PeriodOfRequirement: "October 2024 - December 2024",
    Marks: 70,
    Feedback: "Satisfactory, but needs more attention to detail.",
  },
];

export type columnData = {
  SlNo: number;
  RoundNo: string;
  RoundName: string;
  PeriodOfRequirement: Date | null;
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

  ngOnInit() {
    this.getAllDetails();
  }
  isLargeScreen() {
    return window.innerWidth > 768; // Customize based on your layout
  }

  detailsDataSource = new MatTableDataSource<columnData>();
  displayedColumns: string[] = [
    "SlNo",
    "RoundNo",
    "RoundName",
    "PeriodOfRequirement",
    "Marks",
    "Feedback",
  ];
  columns = [
    { key: "SlNo", label: "Sl. No" },
    { key: "RoundNo", label: "Round No" },
    { key: "RoundName", label: "Round Name" },
    { key: "PeriodOfRequirement", label: "Period Of Requirement" },
    { key: "Marks", label: "Marks" },
    { key: "Feedback", label: "Feedback" },
  ];
  goBack(): void {
    this.location.back();
  }
  getAllDetails = () => {
    const jobPostingId = this.route.snapshot.paramMap.get("id");
    if (jobPostingId) {
      const id = parseInt(jobPostingId);
      this.offerManagementDetailsApiService.GetAllDetails(id).subscribe({
        next: (response) => {
          const data: Jobinterviewround[] = response.value;
          console.log("Details", data);
          // Transform data to fit your table's structure
          const transformedData: columnData[] = data.map((item, index) => {
            return {
              SlNo: index + 1, // or whatever property represents the serial number
              RoundNo: item.Name || "", // Assuming Name corresponds to Round Number
              RoundName: item.Description || "", // Assuming you have a description
              PeriodOfRequirement:
                item.JobpostStudentrounds[0].RoundDate || null, // Format this as needed
              Marks: item.JobpostStudentrounds[0].Score || null, // Assuming Score corresponds to Marks
              Feedback: item.JobpostStudentrounds[0].Feedback || "", // Feedback field
            };
          });

          console.log("Transformed Details", transformedData);
          this.detailsDataSource.data = transformedData;
        },
        error: (error) => {
          console.log("Error fetching rounds: ", error);
        },
      });
    }
  };
}
