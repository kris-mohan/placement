import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";

export interface TrainerTableList {
  slNo: number;
  trainerId: number;
  trainerName: string;
  description: string;
  createdDate: string;
  actions: string;
}

export const TrainerTableList_Data: TrainerTableList[] = [
  {
    slNo: 1,
    trainerId: 201,
    trainerName: "John Smith",
    description:
      "Expert in JavaScript and Angular with over 10 years of experience.",
    createdDate: "2024-07-01",
    actions: "View, Edit, Delete",
  },
  {
    slNo: 2,
    trainerId: 202,
    trainerName: "Jane Doe",
    description:
      "Specializes in data science and machine learning, with a focus on Python.",
    createdDate: "2024-07-05",
    actions: "View, Edit, Delete",
  },
  {
    slNo: 3,
    trainerId: 203,
    trainerName: "Mike Johnson",
    description:
      "Experienced project manager with PMP certification and a background in agile methodologies.",
    createdDate: "2024-07-10",
    actions: "View, Edit, Delete",
  },
  {
    slNo: 4,
    trainerId: 204,
    trainerName: "Emily Davis",
    description:
      "Graphic designer with a strong portfolio in UX/UI design and Adobe Creative Suite expertise.",
    createdDate: "2024-07-15",
    actions: "View, Edit, Delete",
  },
  {
    slNo: 5,
    trainerId: 205,
    trainerName: "David Martinez",
    description:
      "Cybersecurity specialist with hands-on experience in network security and ethical hacking.",
    createdDate: "2024-07-20",
    actions: "View, Edit, Delete",
  },
];

@Component({
  selector: "app-trainers",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./trainers.component.html",
  styleUrl: "./trainers.component.css",
})
export class TrainersComponent {
  displayedColumns: string[] = [
    "select",
    "slNo",
    "trainerId",
    "trainerName",
    "description",
    "createdDate",
    "actions",
  ];

  columns = [
    { key: "select", label: "" },
    { key: "slNo", label: "Sl No" },
    { key: "trainerId", label: "trainerId" },
    { key: "trainerName", label: "trainerName" },
    { key: "description", label: "description" },
    { key: "createdDate", label: "createdDate" },
    { key: "actions", label: "Actions" },
  ];

  dataSource = new MatTableDataSource<TrainerTableList>(TrainerTableList_Data);
  selection = new SelectionModel<TrainerTableList>(true, []);

  constructor(private router: Router, private location: Location) {}

  openAddEditTrainerForm(trainerId?: number) {
    if (trainerId != undefined) {
      this.router.navigate([
        "training-configuration/addEditTrainer",
        trainerId,
      ]);
    } else {
      this.router.navigate(["training-configuration/addEditTrainer", "new"]);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
