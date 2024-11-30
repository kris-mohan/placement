import { AMGModules } from "src/AMG-Module/AMG-module";
import { CommonModule, Location } from "@angular/common";
import { Component, Inject, inject, signal } from "@angular/core";
import { ThemePalette } from "@angular/material/core";
import { Router, ActivatedRoute } from "@angular/router";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { JobEligibleStudentApiService } from "./jobEligibleStudentsApiService";
import { Tblstudent } from "src/app/services/types/Tblstudent";
import {
  JobpostingsEligiblestudent,
  PostJobpostingsEligiblestudent,
} from "src/app/services/types/JobpostingsEligibleStudent";

export interface ODataResponse<T> {
  value: T[];
}

@Component({
  selector: "app-job-eligible-students-modal",
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: "./job-eligible-students-modal.component.html",
  styleUrl: "./job-eligible-students-modal.component.css",
})
export class JobEligibleStudentsModalComponent {
  CompanyId: number;
  StudentId: number;
  UserRoleId: number;
  ButtonType: string;
  InvitingStudentsList: Tblstudent[] = [];

  JobEligibleStudentSatusData = signal<JobpostingsEligiblestudent[]>([]);
  StudentStatusOfInvitedJobPostData: JobpostingsEligiblestudent[] = [];

  jobPostRouteId: number | null = null;
  readonly dialog = inject(MatDialog);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private jobEligibleStudentApiService: JobEligibleStudentApiService,
    private sweetAlertService: SweetAlertService
  ) {
    this.InvitingStudentsList = data.InvitingJobPostStudentsList;
    this.jobPostRouteId = data.jobPostRouteId;
    this.StudentStatusOfInvitedJobPostData =
      data.StudentStatusOfInvitedJobPostList;
    this.ButtonType = data.buttonType;
    const storedUserType = sessionStorage.getItem("userRoleId");
    this.UserRoleId = storedUserType ? parseInt(storedUserType) : 0;
    const storedCompanyId = sessionStorage.getItem("CompanyId");
    this.CompanyId = storedCompanyId ? parseInt(storedCompanyId) : 0;
    const storedStudentId = sessionStorage.getItem("StudentId");
    this.StudentId = storedStudentId ? parseInt(storedStudentId) : 0;
  }

  displayedColumns: string[] = [
    "StudentID",
    "StudentName",
    "DegreeName",
    "CollegeName",
    "Branch",
    "Batch",
    //"JobeRole",
    "CGPA",
    "Status",
    // "InvitationStatus",
    "resume",
  ];
  columns = [
    { key: "StudentID", label: "Student ID" },
    { key: "StudentName", label: "Student Name" },
    { key: "DegreeName", label: "Degree" },
    { key: "CollegeName", label: "College Name" },
    { key: "Branch", label: "Branch" },
    { key: "Batch", label: "Batch" },
    { key: "JobeRole", label: "Jobe Role" },
    { key: "CGPA", label: "CGPA" },
    { key: "Status", label: "Status" },
    { key: "StatusId", label: "StatusId" },
    // { key: "InvitationStatus", label: "Invitation Status" },
    { key: "resume", label: "Resume" },
  ];

  status: string[] = ["Invite", "Accepted", "Invited", "Rejected", "Pending"];
  // branches: string[] = [
  //   "Computer Science and Engineering",
  //   "Mechanical Engineering",
  //   "Electronics and Communication Engineering",
  // ];
  // batches: number[] = [2019, 2020, 2021, 2022];

  searchControl = new FormControl("");
  branches: string[] = [];
  batches: number[] = [];
  branchControl = new FormControl<string[]>([]);
  batchControl = new FormControl<any[] | null>(null);
  statusControl = new FormControl<string[]>([]);

  EligibleStudentsDetails = new MatTableDataSource<{}>([]);
  appliedStudentsDetails = new MatTableDataSource<{}>([]);
  filteredEligibleStudents = new MatTableDataSource<{}>([]);
  filteredAppliedStudents = new MatTableDataSource<{}>([]);
  ngOnInit() {
    this.getAllEligibleStudents();
    this.GetAppliedStudentList();
    this.getBranches();
    this.getBatches();
    this.filteredEligibleStudents = new MatTableDataSource(
      this.EligibleStudentsDetails.data
    );
    this.filteredAppliedStudents = new MatTableDataSource(
      this.appliedStudentsDetails.data
    );
    this.searchControl.valueChanges.subscribe(() => {
      this.applyFilters();
    });

    this.batchControl.valueChanges.subscribe(() => {
      this.applyFilters();
    });

    this.branchControl.valueChanges.subscribe(() => {
      this.applyFilters();
    });

    this.statusControl.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }
  applyFilters() {
    const searchName = this.searchControl.value?.toLowerCase() || "";
    const selectedBranches = this.branchControl.value || [];
    const selectedBatches = this.batchControl.value || [];
    const selectedStatuses = this.statusControl.value || [];
    const eligibleFiltered = this.EligibleStudentsDetails.data.filter(
      (student: any) => {
        const matchesSearch =
          student.StudentName.toLowerCase().includes(searchName);
        const matchesBatch =
          selectedBatches.length === 0 ||
          selectedBatches.includes(student.Batch);
        const matchesBranch =
          selectedBranches.length === 0 ||
          selectedBranches.includes(student.Branch);
        const matchesStatus =
          selectedStatuses.length === 0 ||
          selectedStatuses.includes(student.Status);
        return matchesSearch && matchesBatch && matchesBranch && matchesStatus;
      }
    );
    this.filteredEligibleStudents.data = eligibleFiltered;

    const appliedFiltered = this.appliedStudentsDetails.data.filter(
      (student: any) => {
        const matchesSearch =
          student.StudentName.toLowerCase().includes(searchName);
        const matchesBatch =
          selectedBatches.length === 0 ||
          selectedBatches.includes(student.Batch);
        const matchesBranch =
          selectedBranches.length === 0 ||
          selectedBranches.includes(student.Branch);
        const matchesStatus =
          selectedStatuses.length === 0 ||
          selectedStatuses.includes(student.Status);
        return matchesSearch && matchesBatch && matchesBranch && matchesStatus;
      }
    );
    this.filteredAppliedStudents.data = appliedFiltered;
  }

  getBatches(): void {
    this.jobEligibleStudentApiService.GetBatches().subscribe({
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
    this.jobEligibleStudentApiService.GetBranches().subscribe({
      next: (branchData) => {
        this.branches = branchData.value.map((branch: any) => branch.FullForm);
        console.log("Available branches:", this.branches);
      },
      error: (error) => {
        console.error("Error fetching branches:", error);
      },
    });
  }
  getChipStyle(action: string): any {
    switch (action) {
      case "Job Post Invited":
        return { "background-color": "#008080", color: "white !important" };
      case "Selected":
        return { "background-color": "#9aee9a", color: "white" };
      case "Job Post Not Sent":
        return { "background-color": "#fb6767", color: "white" };
      case "Rejected":
        return { "background-color": "#fb6767", color: "white" };
      case "Pending":
        return { "background-color": "grey", color: "white" };
      case "Accepted":
        return { "background-color": "#94c8f3", color: "white" };
      case "In-Progress":
        return { "background-color": "#FFFF00", color: "white" };
      default:
        return { "background-color": "#fb6767", color: "white" };
    }
  }

  goBack(): void {
    this.location.back();
  }

  getAllEligibleStudents = () => {
    const data = this.InvitingStudentsList;
    console.log(data);
    const studentDetails = this.InvitingStudentsList.map(
      (studentRecord: Tblstudent) => ({
        StudentID: studentRecord.Id,
        StudentName: `${studentRecord.FirstName} ${studentRecord.LastName}`,
        Branch: studentRecord.Studentacademics[0]?.Course?.FullForm ?? "",
        CollegeName: "",
        DegreeName: studentRecord.Studentacademics[0]?.Stream?.Name ?? "",
        Batch: studentRecord.Batch?.Name ?? "",
        JobeRole: "Developer",
        CGPA: studentRecord.Studentacademics[0]?.Cgpa ?? "",
        Status:
          studentRecord.JobpostingsEligiblestudents[0]?.Status?.Name ??
          "Job Post Not Sent",
        // StatusId: studentRecord.JobpostingsEligiblestudents[0]?.StatusId ?? "",
        resume: "",
      })
    );

    this.EligibleStudentsDetails.data = studentDetails;
  };

  GetAppliedStudentList = () => {
    const data = this.StudentStatusOfInvitedJobPostData;
    console.log(data);
    const studentDetails = this.StudentStatusOfInvitedJobPostData.map(
      (student: JobpostingsEligiblestudent) => ({
        StudentID: student.StudentId,
        StudentName: `${student.Student?.FirstName} ${student.Student?.LastName}`,
        Branch: student.Student?.Studentacademics[0].Course?.FullForm ?? "",
        CollegeName: student.Student?.Org.CollegeName,
        DegreeName: student.Student?.Studentacademics[0]?.Stream?.Name ?? "",
        Batch: student.Student?.Batch?.Name ?? "",
        JobeRole: student.JobPosting.JobRole ?? "",
        CGPA: student.Student?.Studentacademics[0]?.Cgpa ?? "",
        Status: student.Status?.Name,
        StatusId: student.StatusId,
        resume: "",
      })
    );
    this.appliedStudentsDetails.data = studentDetails;
    console.log(this.appliedStudentsDetails);
  };

  InviteJobPostToStudents = async () => {
    const statusId = 6;
    const confirmed = await this.sweetAlertService.confirm(
      `Do you want to invite all students?`
    );
    if (confirmed) {
      const students: PostJobpostingsEligiblestudent[] =
        this.EligibleStudentsDetails.data
          .filter((student: any) => student.StudentID)
          .map((student: any) => {
            return {
              Id: 0,
              StudentId: student.StudentID,
              JobPostingId: this.jobPostRouteId ?? undefined,
              StatusId: statusId,
            };
          });

      this.jobEligibleStudentApiService
        .InviteJobPostToStudents(students)
        .subscribe({
          next: (response: { success: boolean; message: string }) => {
            console.log(response);
            if (response) {
              this.GetStudentJobPostStatus();
              this.sweetAlertService.success(response.message);
            } else {
              this.sweetAlertService.error(response);
            }
          },
          error: () => {
            this.sweetAlertService.error("An unexpected error occurred.");
          },
        });
    }
  };

  GetStudentJobPostStatus = () => {
    const studentIds = this.InvitingStudentsList.map((student) => student.Id);
    this.jobEligibleStudentApiService
      .GetStudentJobPostStatus(studentIds)
      .subscribe({
        next: (response) => {
          const data: JobpostingsEligiblestudent[] = response.value;
          this.JobEligibleStudentSatusData.set(data);
          console.log(this.JobEligibleStudentSatusData());
        },
        error: (error) => {
          console.log("error fetching StudentJobPostStatus ", error);
        },
      });
  };
}
