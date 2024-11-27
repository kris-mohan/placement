import { Component, inject, signal } from "@angular/core";
import { CommonModule, Location } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { JobEligibleStudentsModalComponent } from "./job-eligible-students-modal/job-eligible-students-modal.component";
import { MatDialog } from "@angular/material/dialog";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { FunnelChartComponent } from "../../charts/funnel chart/funnel-chart/funnel-chart.component";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CompanyJobDetailsApiService } from "../company-job-details/company-job-details-apiService";
import { Jobposting } from "src/app/services/types/Jobposting";
import { StudentJobsApiSerivce } from "../../student-menu/student-menu/student-jobs/studentJobsApiService";
import { JobEligibleStudentApiService } from "./job-eligible-students-modal/jobEligibleStudentsApiService";
import { Tblstudent } from "src/app/services/types/Tblstudent";
import { JobpostingsEligiblestudent } from "src/app/services/types/JobpostingsEligibleStudent";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { CompanyjobdescriptionApiService } from "../company-job-description/company-job-description-ApiService";

@Component({
  selector: "app-company-job-description",
  standalone: true,
  imports: [SharedModule, CommonModule, AMGModules, FunnelChartComponent],
  templateUrl: "./company-job-description.component.html",
  styleUrl: "./company-job-description.component.css",
})
export class CompanyJobDescriptionComponent {
  Id: number | null = null;
  CompanyId: number;
  StudentId: number;
  CompanyRouteId: number | null = null;
  JobPostRouteId: number | null = null;
  UserRoleId: number;
  selectCollegeControl = new FormControl();
  JobPostingDescription: Jobposting[] = [];

  JobPostingId: number | null = null;
  JobPostingDetailsById = signal<Jobposting[]>([]);
  InvitingStudentsList = signal<Tblstudent[]>([]);

  JobPostingsData = signal<Jobposting[]>([]);

  JobPostingsDescriptionData = signal<Jobposting[]>([]);

  JobEligibleStudentSatusData = signal<JobpostingsEligiblestudent[]>([]);

  StudentStatusOfInvitedJobPostData = signal<JobpostingsEligiblestudent[]>([]);

  applyButtonLabel: string = "Apply";
  applyButtonDisabled: boolean = false;

  RejectButtonLabel: string = "Reject";
  RejectButtonDisabled: boolean = false;

  universityTypes: string[] = [
    "Visvesvaraya Technological University (VTU)",
    "Deemed University",
    "Autonomous University",
  ];

  colleges: string[] = [
    "East West Institute of Technology",
    "East West College of Engineering",
    "East West School of Architecture",
    "East West First Grade College of Science ",
    "East West College of Management",
    "East West College of Management",
    "St. John’s Pharmacy College",
    "East West College of Pharmacy",
    "East West College of Nursing",
    "East West Institute of Polytechnic",
    "East West Polytechnic",
    "East West Pre-University",
    "East West Pre-University College",
  ];
  selectedCollegeData: number[] = [];
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private studentJobsApiService: StudentJobsApiSerivce,
    private router: Router,
    private jobEligibleStudentsApiService: JobEligibleStudentApiService,
    private companyjobdescriptionApiService: CompanyjobdescriptionApiService,
    private sweetAlertService: SweetAlertService
  ) {
    const storedUserType = sessionStorage.getItem("userRoleId");
    this.UserRoleId = storedUserType ? parseInt(storedUserType) : 0;
    const storedCompanyId = sessionStorage.getItem("CompanyId");
    this.CompanyId = storedCompanyId ? parseInt(storedCompanyId) : 0;
    const storedStudentId = sessionStorage.getItem("StudentId");
    this.StudentId = storedStudentId ? parseInt(storedStudentId) : 0;
  }
  readonly dialog = inject(MatDialog);

  goBack(): void {
    this.location.back();
  }

  openEligibleStudentsModel(type: string): void {
    this.dialog.open(JobEligibleStudentsModalComponent, {
      width: "90vw",
      height: "80vh",
      data: {
        InvitingJobPostStudentsList: this.InvitingStudentsList(),
        jobPostRouteId: this.JobPostRouteId,
        StudentStatusOfInvitedJobPostList:
          this.StudentStatusOfInvitedJobPostData(),
        buttonType: type,
      },
    });
  }
  getjobDescription = () => {
    this.companyjobdescriptionApiService.Getjobdescription().subscribe({
      next: (response) => {
        const data: Jobposting[] = response.value;
        // this.JobPostingsData.set([data[0]]);
        // console.log(this.JobPostingsData());
      },
      error: (error) => {
        console.log("Error fetching rounds: ", error);
      },
    });
  };

  getCompanyJobDescriptionById(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      const jobPostRouteId = params.get("jobId");
      const companyRouteId = params.get("companyId");
      this.CompanyRouteId = companyRouteId !== null ? +companyRouteId : null;
      this.JobPostRouteId = jobPostRouteId !== null ? +jobPostRouteId : null;
      this.Id = id !== null ? +id : null;

      const jobIdToFetch =
        this.UserRoleId === 1 ? this.JobPostRouteId : this.Id;

      if (jobIdToFetch !== null) {
        this.companyjobdescriptionApiService
          .getCompanyJobDescriptionById(jobIdToFetch)
          .subscribe({
            next: (jobPostings) => {
              const data: Jobposting[] = jobPostings.value;
              const mappedData = data.map((jobposting: any) => ({
                ...jobposting,
                ValidTill: this.convertToDateOnly(jobposting.ValidTill),
                ValidFrom: this.convertToDateOnly(jobposting.ValidFrom),
                DriveDate: this.convertToDateOnly(jobposting.DriveDate),
                CollegeName:
                  jobposting.Collegejobpostings[0]?.College?.CollegeName,
                BatchName: jobposting.CompanyJobBatches[0]?.Batch?.Name,
                StreamName: jobposting.CompanyJobStreams[0]?.Stream?.Name,
                CourseName: jobposting.CompanyJobCourses[0]?.Course?.Name,
              }));
              this.JobPostingsDescriptionData.set(mappedData);
              this.JobPostingsData.set([mappedData[0]]);
              console.log("Company Name:", this.JobPostingsDescriptionData());
            },
            error: (error) => {
              console.error("Error fetching jobPostings:", error);
            },
          });
      }
    });
  }

  GetJobPostingById = () => {
    this.route.paramMap.subscribe((params) => {
      const jobPostRouteId = params.get("jobId");
      const companyRouteId = params.get("companyId");
      this.CompanyRouteId = companyRouteId !== null ? +companyRouteId : null;
      this.JobPostRouteId = jobPostRouteId !== null ? +jobPostRouteId : null;
      if (this.JobPostRouteId !== null && this.CompanyRouteId !== null) {
        this.jobEligibleStudentsApiService
          .GetJobPostingDetailsById(this.CompanyRouteId, this.JobPostRouteId)
          .subscribe({
            next: (response) => {
              const data: Jobposting[] = response.value;
              this.JobPostingDetailsById.set(data);
              console.log(this.JobPostingDetailsById());
              this.GetAllInvitingStudents();
            },
            error: (error) => {
              console.error("Error fetching Job Posting By Id details:", error);
            },
          });
      }
    });
  };

  GetAllInvitingStudents = () => {
    const jobPosting = this.JobPostingDetailsById()[0];
    const batchIds = jobPosting.CompanyJobBatches?.map((b) => b.BatchId) ?? [];
    const courseIds =
      jobPosting.CompanyJobCourses?.map((c) => c.CourseId) ?? [];
    const streamIds =
      jobPosting.CompanyJobStreams?.map((s) => s.StreamId) ?? [];
    const tenthMarks = jobPosting.MinSslcpercentage;
    const twelthMarks = jobPosting.MinPucpercentage;
    const cgpa = jobPosting.MinCgpa;

    const query = `/Tblstudent?$expand=Batch,JobpostingsEligiblestudents($expand=Status),Studentacademics($expand=Course,Stream)&$filter=BatchId in (${batchIds.join(
      ","
    )}) and Studentacademics/any(s: (s/CourseId in (${courseIds.join(
      ","
    )}) and s/StreamId in (${streamIds.join(
      ","
    )}) and s/TenthMarks ge ${tenthMarks} and s/TwelthMarks ge ${twelthMarks} and s/Cgpa ge ${cgpa}))`;

    this.jobEligibleStudentsApiService.GetAllInvitingStudents(query).subscribe({
      next: (response) => {
        const data: Tblstudent[] = response.value;
        this.InvitingStudentsList.set(data);
        console.log(this.InvitingStudentsList());
      },
      error: (error) => {
        console.error("Error fetching eligible students:", error);
      },
    });
  };

  ngOnInit() {
    this.getCompanyJobDescriptionById();
    this.GetJobPostingById();
    this.GetJobPostStudentStatus();
    this.GetStudentStatusOfInvitedJobPost();
    // this.getjobDescription();
  }

  convertToDateOnly(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  }

  openAddEditJobPostingForm() {
    if (this.Id !== undefined) {
      this.router.navigate([
        "/company-job-details/add-edit-jobPosting/",
        this.Id,
      ]);
    } else {
      this.router.navigate(["/company-job-details/add-edit-jobPosting/", 0]);
    }
  }

  async DeleteJobPosting() {
    const confirmed = await this.sweetAlertService.confirmDelete(
      "Do you really want to delete this Job posting?"
    );

    if (confirmed) {
      this.route.paramMap.subscribe((params) => {
        const jobId = params.get("id");
        const JobID = jobId !== null ? +jobId : null;
        if (JobID !== null) {
          this.jobEligibleStudentsApiService.deleteJobPosting(JobID).subscribe({
            next: (response: { success: boolean; message: string }) => {
              if (response.success) {
                this.sweetAlertService.success(response.message);
                this.router.navigate(["/company-job-details/"]);
              } else {
                this.sweetAlertService.error(response.message);
              }
            },
            error: (error) => {
              this.sweetAlertService.error(
                "An unexpected error occurred while deleting the Trainer."
              );
              console.error("Error deleting Trainer:", error);
            },
          });
        }
      });
    }
  }

  GetStudentStatusOfInvitedJobPost = () => {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      const jobPostRouteId = params.get("jobId");
      const companyRouteId = params.get("companyId");
      this.CompanyRouteId = companyRouteId !== null ? +companyRouteId : null;
      this.JobPostRouteId = jobPostRouteId !== null ? +jobPostRouteId : null;
      this.Id = id !== null ? +id : null;

      const jobIdToFetch =
        this.UserRoleId === 1 ? this.JobPostRouteId : this.Id;
      if (jobIdToFetch !== null) {
        const statusId = 5;
        this.jobEligibleStudentsApiService
          .GetstudentStatusOfInvitedJobPost(jobIdToFetch, statusId)
          .subscribe({
            next: (response) => {
              const data: JobpostingsEligiblestudent[] = response.value;
              this.StudentStatusOfInvitedJobPostData.set(data);
              console.log(
                "GetStudentStatusOfInvitedJobPost",
                this.StudentStatusOfInvitedJobPostData()
              );
            },
            error: (err) => {
              console.log("Error fetching StudentJobPostStatus", err);
            },
          });
      }
    });
  };

  GetJobPostStudentStatus = async () => {
    this.route.paramMap.subscribe((params) => {
      const jobPostRouteId = params.get("id");
      this.JobPostRouteId = jobPostRouteId !== null ? +jobPostRouteId : null;
      if (this.JobPostRouteId !== null && this.StudentId !== null)
        this.jobEligibleStudentsApiService
          .GetAllJobPostToStudentToApply(this.StudentId, this.JobPostRouteId)
          .subscribe({
            next: (response) => {
              const data: JobpostingsEligiblestudent[] = response.value;
              this.JobEligibleStudentSatusData.set(data);

              const jobPost = this.JobEligibleStudentSatusData()[0];
              if (jobPost.StatusId === 5) {
                this.applyButtonLabel = jobPost?.Status?.Name || "";
                this.applyButtonDisabled = true;
                this.RejectButtonDisabled = true;
              } else if (jobPost.StatusId === 8) {
                this.RejectButtonLabel = jobPost?.Status?.Name || "";
                this.RejectButtonDisabled = true;
                this.applyButtonDisabled = true;
              } else {
                this.applyButtonLabel = "Apply";
                this.applyButtonDisabled = false;
              }
            },
            error: (err) => {
              console.log("Error fetching StudentJobPostStatus", err);
            },
          });
    });
  };

  ApplyJobPostByStudent = async () => {
    const confirmed = await this.sweetAlertService.confirm(
      `Do you want to Apply for this job posting?`
    );
    if (confirmed) {
      const id = this.JobEligibleStudentSatusData()[0].Id;
      const statusId = 5;
      this.jobEligibleStudentsApiService
        .ApplyJobPostByStudent(id, statusId)
        .subscribe({
          next: (response: { success: boolean; message: string }) => {
            if (response) {
              this.sweetAlertService.success(
                "You have applied for this job post successfully!"
              );
            }
            this.GetJobPostStudentStatus();
          },
          error: (err) => {
            console.log("Error updating job post status", err);
          },
        });
    }
  };

  rejectJobPostByStudent = async () => {
    const confirmed = await this.sweetAlertService.confirm(
      `Do you want to Reject for this job posting?`
    );
    if (confirmed) {
      const id = this.JobEligibleStudentSatusData()[0].Id;
      const statusId = 8;
      this.jobEligibleStudentsApiService
        .ApplyJobPostByStudent(id, statusId)
        .subscribe({
          next: (response: { success: boolean; message: string }) => {
            if (response) {
              this.sweetAlertService.success(
                "Ohh no!!...You have rejected for this job post"
              );
            }
            this.GetJobPostStudentStatus();
          },
          error: (err) => {
            console.log("Error updating job post status", err);
          },
        });
    }
  };

  openAddEditCompanyForm(id: number) {}
}
