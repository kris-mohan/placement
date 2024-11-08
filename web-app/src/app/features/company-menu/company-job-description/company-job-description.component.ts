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
  CompanyRouteId: number | null = null;
  JobPostRouteId: number | null = null;
  UserRoleId: number;
  selectCollegeControl = new FormControl();
  JobPostingDescription: Jobposting[] = [];

  JobPostingId: number | null = null;
  JobPostingDetailsById = signal<Jobposting[]>([]);
  InvitingStudentsList = signal<Tblstudent[]>([]);

  JobPostingsDescriptionData = signal<Jobposting[]>([]);

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
    private jobEligibleStudentsApiService: JobEligibleStudentApiService
  ) {
    const storedUserType = sessionStorage.getItem("userRoleId");
    this.UserRoleId = storedUserType ? parseInt(storedUserType) : 0;
    const storedCompanyId = sessionStorage.getItem("CompanyId");
    this.CompanyId = storedCompanyId ? parseInt(storedCompanyId) : 0;
  }
  readonly dialog = inject(MatDialog);

  goBack(): void {
    this.location.back();
  }

  openEligibleStudentsModel(): void {
    this.dialog.open(JobEligibleStudentsModalComponent, {
      width: "90vw",
      height: "80vh",
      data: {
        studentsList: this.InvitingStudentsList(),
        jobPostRouteId: this.JobPostRouteId,
      },
    });
  }

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
        this.studentJobsApiService.GetJobPostingById(jobIdToFetch).subscribe({
          next: (jobPostings) => {
            const data: Jobposting[] = jobPostings.value;
            const mappedData = data.map((jobposting: any) => ({
              ...jobposting,
              ValidTill: this.convertToDateOnly(jobposting.ValidTill),
              ValidFrom: this.convertToDateOnly(jobposting.ValidFrom),
              DriveDate: this.convertToDateOnly(jobposting.DriveDate),
            }));
            this.JobPostingsDescriptionData.set(mappedData);
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

    const query = `/Tblstudent?$expand=Batch,Studentacademics($expand=Course,Stream)&$filter=BatchId in (${batchIds.join(
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

  openAddEditCompanyForm(id: number) {}
}
