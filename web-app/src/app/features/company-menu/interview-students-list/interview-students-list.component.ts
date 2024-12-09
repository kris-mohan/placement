import { CommonModule, Location } from "@angular/common";
import { Component, inject, OnInit, signal } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ActivatedRoute, Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { InterviewStudentListApiService } from "./InterviewStudentListApiService";
import { Jobposting } from "src/app/services/types/Jobposting";
import { map, Observable } from "rxjs";
import { StepperOrientation } from "@angular/material/stepper";
import { BreakpointObserver } from "@angular/cdk/layout";
import { FormControl, FormGroup } from "@angular/forms";
import { interviewApiService } from "../interview/api.interview";
import { SharedModule } from "src/app/shared/shared.module";
import { JobpostStudentround } from "src/app/services/types/JobpostStudentround";
import { JobpostingsEligiblestudent } from "src/app/services/types/JobpostingsEligibleStudent";
import { Jobinterviewround } from "src/app/services/types/Jobinterviewround";

@Component({
  selector: "app-interview-students-list",
  standalone: true,
  imports: [AMGModules, CommonModule, FlexLayoutModule, SharedModule],
  templateUrl: "./interview-students-list.component.html",
  styleUrl: "./interview-students-list.component.css",
})
export class InterviewStudentsListComponent implements OnInit {
  // allDetails: Jobinterviewround[] = [];
  roundDetails: Jobinterviewround | null = null;
  filteredInterviewStudents = signal<JobpostStudentround[]>([]);
  JobPostingId: string | null = "0";
  JobInterviewRoundId: string | null = "0";
  branches: string[] = [];
  batches: string[] = [];
  branchSearch: string = "";
  batchSearch: string = "";
  branchControl = new FormControl<string[] | null>(null);
  batchControl = new FormControl<string[] | null>(null);
  studentNameControl = new FormControl("");
  usnControl = new FormControl("");
  statusControl: string = "";
  JobpostingsEligiblestudentData = signal<JobpostingsEligiblestudent[]>([]);
  JobpostingsAcceptedStudentData = signal<JobpostingsEligiblestudent[]>([]);
  JobpostingsInterviewStudentData = signal<Jobinterviewround[]>([]);
  currentRoundIndex: number = 0;

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private interviewStudentListApiService: InterviewStudentListApiService,
    private InterviewService: interviewApiService
  ) {
    const breakpointObserver = inject(BreakpointObserver);
    this.stepperOrientation = breakpointObserver
      .observe("(min-width: 800px)")
      .pipe(map(({ matches }) => (matches ? "horizontal" : "vertical")));
  }

  ngOnInit(): void {
    this.JobPostingId = this.route.snapshot.paramMap.get("jobId");
    this.JobInterviewRoundId =
      this.route.snapshot.paramMap.get("interviewRoundId");
    console.log(this.JobPostingId);
    this.getAllStudents();
    this.getBranches();
    this.getBatches();
    this.branchControl.valueChanges.subscribe(() => this.applyFilters());
    this.batchControl.valueChanges.subscribe(() => this.applyFilters());
    this.studentNameControl.valueChanges.subscribe(() => this.applyFilters());
    this.usnControl.valueChanges.subscribe(() => this.applyFilters());
  }
  applyFilters() {
    const selectedBranches = this.branchControl.value || [];
    const selectedBatches = this.batchControl.value || [];
    const studentNameFilter =
      this.studentNameControl.value?.toLowerCase() || "";
    const usnFilter = this.usnControl.value?.toLowerCase() || "";
    const filteredData = this.roundDetails?.JobpostStudentrounds.filter(
      (studentRound) => {
        const student = studentRound.Student;

        const branchMatch =
          selectedBranches.length === 0 ||
          selectedBranches.includes(
            student?.Studentacademics?.[0]?.Course?.FullForm || ""
          );

        const batchMatch =
          selectedBatches.length === 0 ||
          selectedBatches.includes(student?.Batch?.Name || "");
        const nameMatch =
          studentNameFilter === "" ||
          student?.FirstName?.toLowerCase().includes(studentNameFilter) ||
          student?.LastName?.toLowerCase().includes(studentNameFilter);
        const usnMatch =
          usnFilter === "" ||
          student?.RollNo?.toLowerCase().includes(usnFilter);

        return branchMatch && batchMatch && nameMatch && usnMatch;
      }
    );

    if (filteredData) {
      this.filteredInterviewStudents.set(filteredData);
    }
    this.GetJobpostingsAcceptedStudents();
    this.GetAllJobInterviewStudentsData();
  }

  goBack(): void {
    this.location.back();
  }

  getAllStudents = () => {
    console.log(this.JobPostingId);
    const id = this.JobPostingId ? parseInt(this.JobPostingId) : 0;
    console.log(id);
    this.interviewStudentListApiService
      .GetAllJobInterviewStudentsData(id)
      .subscribe({
        next: (response) => {
          const data: Jobinterviewround = response.value[0];
          // const data: Jobposting[] = response.value;
          console.log("All Students", data);
          this.roundDetails = data;
          // console.log(this.allDetails);
          // const currentRoundIndex =
          //   this.allDetails[0]?.Jobinterviewrounds.findIndex(
          //     (round) =>
          //       round.Id ===
          //       (this.JobInterviewRoundId
          //         ? parseInt(this.JobInterviewRoundId)
          //         : 0)
          //   );
          // this.currentRoundIndex =
          //   currentRoundIndex !== -1 ? currentRoundIndex : 0;
          this.applyFilters();
        },
        error: (error) => {
          console.error(error);
        },
      });
  };

  GetJobpostingsAcceptedStudents = () => {
    const id = this.JobPostingId ? parseInt(this.JobPostingId) : 0;
    this.interviewStudentListApiService
      .GetJobpostingsAcceptedStudents(id)
      .subscribe({
        next: (response) => {
          const data: JobpostingsEligiblestudent[] = response.value;
          this.JobpostingsEligiblestudentData.set(data);
          this.JobpostingsAcceptedStudentData.set(
            data.filter((d) => d.Status?.Id === 5)
          );
        },
      });
  };

  GetAllJobInterviewStudentsData = () => {
    const id = this.JobInterviewRoundId
      ? parseInt(this.JobInterviewRoundId)
      : 0;
    this.interviewStudentListApiService
      .GetAllJobInterviewStudentsData(id)
      .subscribe({
        next: (response) => {
          const data: Jobinterviewround[] = response.value;
          this.JobpostingsInterviewStudentData.set(data);
        },
      });
  };
  getBatches(): void {
    this.InterviewService.GetBatches().subscribe({
      next: (batchData) => {
        this.batches = batchData.value.map((batch: any) => batch.Name);
        console.log("Available batches:", this.batches);
      },
      error: (error) => {
        console.error("Error fetching batches:", error);
      },
    });
  }

  getBranches(): void {
    this.InterviewService.GetBranches().subscribe({
      next: (branchData) => {
        this.branches = branchData.value.map((branch: any) => branch.FullForm);
        console.log("Available branches:", this.branches);
      },
      error: (error) => {
        console.error("Error fetching branches:", error);
      },
    });
  }
  filteredBranches(): string[] {
    if (!this.branchSearch.trim()) return this.branches;
    return this.branches.filter((branch) =>
      branch.toLowerCase().includes(this.branchSearch.toLowerCase())
    );
  }

  filteredBatches(): string[] {
    if (!this.batchSearch.trim()) return this.batches;
    return this.batches.filter((batch) =>
      batch.toLowerCase().includes(this.batchSearch.toLowerCase())
    );
  }
  onStepChange(index: number): void {
    this.currentRoundIndex = index;
    // console.log(this.currentRoundIndex);
    // console.log(
    //   this.allDetails[0]?.Jobinterviewrounds[this.currentRoundIndex]
    //     .JobpostStudentrounds
    // );
  }

  openInterviewMarksDetails(studentId?: number, JobPostingRoundId?: number) {
    this.router.navigate([
      "/interview/interview-students-list/student-result-information",
      this.JobPostingId,
      JobPostingRoundId,
      studentId,
      this.currentRoundIndex,
    ]);
  }
}
