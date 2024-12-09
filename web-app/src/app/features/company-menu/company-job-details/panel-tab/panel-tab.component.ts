import { CommonModule, Location } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { MatDialog } from "@angular/material/dialog";
import { AddEditPanelModalComponent } from "./add-edit-panel-modal/add-edit-panel-modal.component";
import { MatTableDataSource } from "@angular/material/table";
import { Jobinterviewpanel } from "src/app/services/types/Jobinterviewpanel";
import { PanelAPIService } from "./panel.apiservice";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-panel-tab",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./panel-tab.component.html",
  styleUrl: "./panel-tab.component.css",
})
export class PanelTabComponent {
  constructor(
    private router: Router,
    private location: Location,
    private panelAPIService: PanelAPIService,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService
  ) {}
  jobId: number | undefined = undefined;
  JobPostId: number | null = null;
  readonly dialog = inject(MatDialog);
  columns = [
    { key: "Id", label: "Panel ID" },
    { key: "JobPostingId", label: "Job Posting ID" },
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
  JobInterviewPanelDataSource = signal<Jobinterviewpanel[]>([]);

  goBack(): void {
    this.location.back();
  }

  GetAllPanelData = () => {
    this.route.paramMap.subscribe((params) => {
      console.log("Params in Panels", params);
      const id = params.get("jobId");
      console.log("Job Id", id);
      this.JobPostId = id !== null ? +id : null;
      this.panelAPIService.GetAllPanelData(this.JobPostId).subscribe({
        next: (response) => {
          const data: Jobinterviewpanel[] = response.value;
          console.log("Jobinterviewpanel", data);
          this.JobInterviewPanelDataSource.set(data);
          console.log(this.JobInterviewPanelDataSource);
        },
        error: (error) => {
          console.log("Error fetching panels: ", error);
        },
      });
    });
  };
  loadRounds() {
    this.route.paramMap.subscribe((params) => {
      console.log("Params in Panels", params);
      const id = params.get("jobId");
      console.log("Job Id", id);
      this.JobPostId = id !== null ? +id : null;
      this.panelAPIService.GetAllPanelData(this.JobPostId).subscribe({
        next: (response) => {
          const data: Jobinterviewpanel[] = response.value;
          console.log("Jobinterviewpanel", data);
          this.JobInterviewPanelDataSource.set(data);
          console.log(this.JobInterviewPanelDataSource);
        },
        error: (error) => {
          console.log("Error fetching panels: ", error);
        },
      });
    });
  }

  async deleteCompany(id: number) {
    // Confirm deletion with the user
    const confirmed = await this.sweetAlertService.confirmDelete(
      "Do you really want to delete this Company?"
    );

    if (confirmed) {
      this.panelAPIService.DeletePanel(id).subscribe({
        next: (response: { success: boolean; message: string }) => {
          if (response.success) {
            this.sweetAlertService.success(response.message);
            this.loadRounds();
          } else {
            this.sweetAlertService.error(response.message);
          }
        },
        error: (error) => {
          this.sweetAlertService.error(
            "An unexpected error occurred while deleting the Company."
          );
          console.error("Error deleting Company:", error);
        },
      });
    }
  }
  ngOnInit() {
    this.GetAllPanelData();
  }
  handleAddPanelClick(PanelId: number): void {
    console.log(PanelId);
    const dialogRef = this.dialog.open(AddEditPanelModalComponent, {
      data: { PanelId, JobPostingId: this.JobPostId },
      width: "500px",
      height: "600px",
    });
    dialogRef.componentInstance.panelsUpdated.subscribe(() => {
      this.GetAllPanelData();
    });
  }

  openAddEditPanelForm(PanelId?: number): void {}
  deletePanel(PanelId?: number): void {}
}
