import { CommonModule, Location } from "@angular/common";
import { Component, inject } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { MatDialog } from "@angular/material/dialog";
import { AddEditPanelModalComponent } from "./add-edit-panel-modal/add-edit-panel-modal.component";
import { MatTableDataSource } from "@angular/material/table";
import { HiringPanel } from "./panel-tab-model";

export const HIRING_PANELS_DATA: HiringPanel[] = [
  {
    jobId: 1,
    panelId: 1,
    panelName: "Assessment",
    description:
      "An assessment to evaluate specific skills related to the job role.",
    role: "Skill Evaluator",
    status: "Cancelled",
    candidateId: 125,
    feedback: "Candidate withdrew from the process.",
  },
  {
    jobId: 1,
    panelId: 2,
    panelName: "Technical Interview",
    description:
      "A round focused on assessing technical skills and problem-solving abilities.",
    role: "Technical Interviewer",
    status: "Scheduled",
    candidateId: 123,
    feedback: "",
  },
  {
    jobId: 1,
    panelId: 3,
    panelName: "HR Interview",
    description: "A round to discuss cultural fit and candidate’s background.",
    role: "HR Interviewer",
    status: "Scheduled",
    candidateId: 123,
    feedback: "",
  },
  {
    jobId: 1,
    panelId: 4,
    panelName: "Final Interview",
    description:
      "A final interview to make the final decision on the candidate.",
    role: "Final Decision Maker",
    status: "Scheduled",
    candidateId: 124,
    feedback: "",
  },

  {
    jobId: 2,
    panelId: 1,
    panelName: "Technical Interview",
    description:
      "A round focused on assessing technical skills and problem-solving abilities.",
    role: "Technical Interviewer",
    status: "Scheduled",
    candidateId: 123,
    feedback: "",
  },
  {
    jobId: 2,
    panelId: 2,
    panelName: "HR Interview",
    description: "A round to discuss cultural fit and candidate’s background.",
    role: "HR Interviewer",
    status: "Scheduled",
    candidateId: 123,
    feedback: "",
  },
  {
    jobId: 2,
    panelId: 3,
    panelName: "Final Interview",
    description:
      "A final interview to make the final decision on the candidate.",
    role: "Final Decision Maker",
    status: "Scheduled",
    candidateId: 124,
    feedback: "",
  },
];

@Component({
  selector: "app-panel-tab",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./panel-tab.component.html",
  styleUrl: "./panel-tab.component.css",
})
export class PanelTabComponent {
  constructor(private location: Location) {}

  readonly dialog = inject(MatDialog);

  columns = [
    { key: "panelId", label: "Panel ID" },
    { key: "panelName", label: "Panel Name" },
    { key: "description", label: "Description" },
    { key: "role", label: "Role" },
    { key: "actions", label: "Actions" },
  ];
  displayedColumns: string[] = [
    "panelId",
    "panelName",
    "description",
    "role",
    "actions",
  ];
  dataSource = new MatTableDataSource<HiringPanel>(HIRING_PANELS_DATA);

  goBack(): void {
    this.location.back();
  }

  handleAddPanelClick(): void {
    this.dialog.open(AddEditPanelModalComponent, {
      width: "500px",
      height: "600px",
    });
  }

  openAddEditPanelForm(roundsId?: number): void {}
  deletePanel(roundsId?: number): void {}
}
