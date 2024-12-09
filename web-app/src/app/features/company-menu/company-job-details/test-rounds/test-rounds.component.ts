import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router, ActivatedRoute } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
//import { HiringRound } from "./test-rounds-model";
import { AddRoundsModalComponent } from "./add-rounds-modal/add-rounds-modal.component";
import { MatDialog } from "@angular/material/dialog";
import { TestRoundsApiService } from "./TestRoundsApiService";
import { Jobinterviewround } from "src/app/services/types/Jobinterviewround";

@Component({
  selector: "app-test-rounds",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./test-rounds.component.html",
  styleUrl: "./test-rounds.component.css",
})
export class TestRoundsComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService,
    private location: Location,
    private testRoundsApiService: TestRoundsApiService
  ) {}

  RoundDataSource = signal<Jobinterviewround[]>([]);
  RoundDataById = new MatTableDataSource<Jobinterviewround>([]);

  jobId: number | undefined = undefined;
  JobPostId: number | null = null;
  readonly dialog = inject(MatDialog);

  displayedColumns: string[] = [
    // "Id",
    // "JobPostingId",
    "Name",
    "Description",
    //"Priority",
    "ScheduleDate",
    "Actions",
  ];

  getAllRounds = () => {
    this.route.paramMap.subscribe((params) => {
      console.log("Params in Rounds", params);
      const id = params.get("jobId");
      console.log("Job Id", id);
      this.JobPostId = id !== null ? +id : null;
      this.testRoundsApiService.GetAllRounds(this.JobPostId).subscribe({
        next: (response) => {
          const data: Jobinterviewround[] = response.value.map((round: any) => {
            const startDateTime = round.Event?.EventStartDateTime
              ? new Date(round.Event.EventStartDateTime)
              : null;
            const endDateTime = round.Event?.EventEndDateTime
              ? new Date(round.Event.EventEndDateTime)
              : null;
            round.ScheduleDate =
              startDateTime && endDateTime
                ? `${startDateTime.toLocaleString()} - ${endDateTime.toLocaleString()}`
                : "N/A";
            return round;
          });
          this.RoundDataSource.set(data);
        },
        error: (error) => {
          console.log("Error fetching rounds: ", error);
        },
      });
    });
  };

  async deleteCompany(id: number) {
    // Confirm deletion with the user
    const confirmed = await this.sweetAlertService.confirmDelete(
      "Do you really want to delete this Round?"
    );

    if (confirmed) {
      this.testRoundsApiService.deleteRound(id).subscribe({
        next: (response: { success: boolean; message: string }) => {
          if (response.success) {
            this.sweetAlertService.success(response.message);
            this.getAllRounds();
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

  columns = [
    { key: "Id", label: "Round ID" },
    { key: "JobPostingId", label: "JobPostingId" },
    { key: "Name", label: "Name" },
    { key: "Description", label: "Description" },
    //{ key: "Priority", label: "Priority" },
    { key: "ScheduleDate", label: "Schedule Date" },
    { key: "Actions", label: "Actions" },
  ];

  ngOnInit() {
    this.getAllRounds();
  }

  goBack(): void {
    this.location.back();
  }

  handleAddEditRoundsClick(roundsId: number): void {
    console.log(roundsId);

    const dialogRef = this.dialog.open(AddRoundsModalComponent, {
      data: { roundsId, JobPostingId: this.JobPostId },
      width: "500px",
      height: "600px",
    });
    dialogRef.componentInstance.roundsUpdated.subscribe(() => {
      this.getAllRounds();
    });
  }

  openAddEditRoundsForm(roundsId?: number): void {}
  deleteRound(roundsId?: number): void {}
}
