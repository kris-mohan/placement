import { CommonModule, Location } from "@angular/common";
import { Component, inject } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { MatDialog } from "@angular/material/dialog";
import { AddEditPanelModalComponent } from "./add-edit-panel-modal/add-edit-panel-modal.component";
import { MatTableDataSource } from "@angular/material/table";
import { Jobinterviewpanel } from "src/app/services/types/Jobinterviewpanel";
import { PanelAPIService } from "./panel.apiservice";

@Component({
  selector: "app-panel-tab",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./panel-tab.component.html",
  styleUrl: "./panel-tab.component.css",
})
export class PanelTabComponent {
  constructor(private location: Location, private panelAPIService: PanelAPIService) {}

  readonly dialog = inject(MatDialog);
  columns = [
    { key: "Id", label: "Panel ID" },
    { key: "JobPostingId", label: "Job Posting ID"},
    { key: "PanelName", label: "Panel Name" },
    { key: "Description", label: "Description" },
    { key: "Designation", label: "Designation" },
    //{ key: "JoInterviewRoundId", label: "Job Interview Round ID" },
    { key: "Actions", label: "Actions" },
  ];
  displayedColumns: string[] = [
    "Id",
    "JobPostingId",
    "PanelName",
    "Description",
    "Designation",
    //"JoInterviewRoundId",
    "Actions",
  ];
  JobInterviewPanelDataSource = new MatTableDataSource<Jobinterviewpanel>();

  goBack(): void {
    this.location.back();
  }


  GetAllPanelData = () => {
    this.panelAPIService.GetAllPanelData().subscribe({
      next: (response) => {
        const data: Jobinterviewpanel[] = response.value;
        console.log("Jobinterviewpanel", data);
        this.JobInterviewPanelDataSource.data = data;
        console.log(this.JobInterviewPanelDataSource);
      },
      error: (error) => {
        console.log("Error fetching panels: ", error);
      },
    });
  };

  ngOnInit()
  {
    this.GetAllPanelData();
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
