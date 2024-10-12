import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatTableDataSource } from "@angular/material/table";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { roundsDetails } from "./offer-mamanement-details-model";

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
  isLargeScreen() {
    return window.innerWidth > 768; // Customize based on your layout
  }

  dataSource = new MatTableDataSource<roundsDetails>(RoundsData);
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
}
