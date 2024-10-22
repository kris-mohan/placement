import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router, ActivatedRoute } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { HiringRound } from "./test-rounds-model";
import { AddRoundsModalComponent } from "./add-rounds-modal/add-rounds-modal.component";
import { MatDialog } from "@angular/material/dialog";
import { TestRoundsApiService } from "./TestRoundsApiService";
import { Jobinterviewround } from "src/app/services/types/Jobinterviewround";

export const HIRING_ROUNDS_DATA: HiringRound[] = [
  {
    jobId: 1,
    roundId: 1,
    roundName: "Assessment",
    description:
      "An assessment to evaluate specific skills related to the job role.",
    roundDate: new Date("2024-09-01"),
    status: "Cancelled",
    candidateId: 125,
    feedback: "Candidate withdrew from the process.",
  },
  {
    jobId: 1,
    roundId: 2,
    roundName: "Technical Interview",
    description:
      "A round focused on assessing technical skills and problem-solving abilities.",
    roundDate: new Date("2024-08-15"),
    status: "Scheduled",
    candidateId: 123,
    feedback: "",
  },
  {
    jobId: 1,
    roundId: 3,
    roundName: "HR Interview",
    description: "A round to discuss cultural fit and candidate’s background.",
    roundDate: new Date("2024-08-20"),
    status: "Scheduled",
    candidateId: 123,
    feedback: "",
  },
  {
    jobId: 1,
    roundId: 4,
    roundName: "Final Interview",
    description:
      "A final interview to make the final decision on the candidate.",
    roundDate: new Date("2024-08-25"),
    status: "Scheduled",
    candidateId: 124,
    feedback: "",
  },

  {
    jobId: 2,
    roundId: 1,
    roundName: "Technical Interview",
    description:
      "A round focused on assessing technical skills and problem-solving abilities.",
    roundDate: new Date("2024-08-15"),
    status: "Scheduled",
    candidateId: 123,
    feedback: "",
  },
  {
    jobId: 2,
    roundId: 2,
    roundName: "HR Interview",
    description: "A round to discuss cultural fit and candidate’s background.",
    roundDate: new Date("2024-08-20"),
    status: "Scheduled",
    candidateId: 123,
    feedback: "",
  },
  {
    jobId: 2,
    roundId: 3,
    roundName: "Final Interview",
    description:
      "A final interview to make the final decision on the candidate.",
    roundDate: new Date("2024-08-25"),
    status: "Scheduled",
    candidateId: 124,
    feedback: "",
  },
];

// interface ODataResponse<T> {
//   value: T[];
// }

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
  // dataSource = new MatTableDataSource<HiringRound>(HIRING_ROUNDS_DATA);
  // selection = new SelectionModel<HiringRound>(true, []);
  // filteredRounds: HiringRound[] = [];

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
        console.log("rounds", data);
        this.RoundDataSource.data = data;
        console.log(this.RoundDataSource);
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

    // this.route.paramMap.subscribe((params) => {
    //   this.jobId = Number(params.get("jobId"));
    //   this.filteredRounds = HIRING_ROUNDS_DATA.filter(
    //     (round) => round.jobId === this.jobId
    //   );
    //   // this.dataSource.data = this.filteredRounds;
    // });
  }

  // openAddEditRounds(roundsId?: number) {
  //   if (this.jobId !== undefined && roundsId !== undefined) {
  //     this.router.navigate([
  //       "company-job-details/test-rounds",
  //       this.jobId,
  //       roundsId,
  //     ]);
  //   } else {
  //     this.router.navigate(["company-job-details/test-rounds", this.jobId, 0]);
  //   }
  // }

  goBack(): void {
    this.location.back();
  }

  // handleAddRoundsClick(): void {
  //   this.dialog.open(AddRoundsModalComponent, {
  //     width: "500px",
  //     height: "600px",
  //   });
  // }

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
