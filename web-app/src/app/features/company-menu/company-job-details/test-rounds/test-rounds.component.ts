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
    private location: Location
  ) {}

  jobId: number | undefined = undefined;
  readonly dialog = inject(MatDialog);

  displayedColumns: string[] = [
    "roundId",
    "roundName",
    "description",
    "roundDate",
    // "status",
    // "candidateId",
    // "feedback",
    // "priority",
    "actions",
  ];

  columns = [
    { key: "roundId", label: "Round ID" },
    { key: "roundName", label: "Round Name" },
    { key: "description", label: "Description" },
    { key: "roundDate", label: "Round Date" },
    // { key: "status", label: "Status" },
    // { key: "candidateId", label: "Candidate ID" },
    // { key: "feedback", label: "Feedback" },
    { key: "actions", label: "Actions" },
    // { key: "priority", label: "Priority" },
  ];

  priorityOptions = ["1", "2", "3", "4", "5", "6"];

  dataSource = new MatTableDataSource<HiringRound>(HIRING_ROUNDS_DATA);
  selection = new SelectionModel<HiringRound>(true, []);
  filteredRounds: HiringRound[] = [];

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.jobId = Number(params.get("jobId"));
      this.filteredRounds = HIRING_ROUNDS_DATA.filter(
        (round) => round.jobId === this.jobId
      );
      // this.dataSource.data = this.filteredRounds;
    });
  }

  openAddEditRounds(roundsId?: number) {
    if (this.jobId !== undefined && roundsId !== undefined) {
      this.router.navigate([
        "company-job-details/test-rounds",
        this.jobId,
        roundsId,
      ]);
    } else {
      this.router.navigate(["company-job-details/test-rounds", this.jobId, 0]);
    }
  }

  goBack(): void {
    this.location.back();
  }

  handleAddRoundsClick(): void {
    this.dialog.open(AddRoundsModalComponent, {
      width: "500px",
      height: "600px",
    });
  }

  openAddEditRoundsForm(roundsId?: number): void {}
  deleteRounds(roundsId?: number): void {}
}
