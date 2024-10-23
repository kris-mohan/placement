import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import { Component, inject } from "@angular/core";
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

  RoundDataSource = new MatTableDataSource<Jobinterviewround>([]);
  RoundDataById = new MatTableDataSource<Jobinterviewround>([]);

  jobId: number | undefined = undefined;
  readonly dialog = inject(MatDialog);

  displayedColumns: string[] = [
    // "Id",
    // "JobPostingId",
    "Name",
    "Description",
    "Priority",
    "Actions",
  ];

  getAllRounds = () => {
    this.testRoundsApiService.GetAllRounds().subscribe({
      next: (response) => {
        const data: Jobinterviewround[] = response.value;
        this.RoundDataSource.data = data;
      },
      error: (error) => {
        console.log("Error fetching rounds: ", error);
      },
    });
  };

  // async getAllRounds() {
  //   try {
  //     const response = await this.testRoundsApiService.GetAllRounds();
  //     const data: Jobinterviewround[] = response.value;
  //     this.RoundDataSource.data = data;
  //     console.log(this.RoundDataSource);
  //   } catch (error) {
  //     console.error("Error fetching rounds: ", error);
  //   }
  // }

  columns = [
    { key: "Id", label: "Round ID" },
    { key: "JobPostingId", label: "JobPostingId" },
    { key: "Name", label: "Name" },
    { key: "Description", label: "Description" },
    { key: "Priority", label: "Priority" },
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
    // if (roundsId > 0) {
    //   this.getRoundsById(roundsId);
    // }

    this.dialog.open(AddRoundsModalComponent, {
      data: roundsId,
      width: "500px",
      height: "600px",
    });
  }

  openAddEditRoundsForm(roundsId?: number): void {}
  deleteRounds(roundsId?: number): void {}
}
