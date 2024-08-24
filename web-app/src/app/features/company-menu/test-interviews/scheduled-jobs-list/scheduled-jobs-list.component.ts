import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router, ActivatedRoute } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { APIService } from "src/app/services/api-services/api-services";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { JobPostingList } from "./sceduled-jobs-list-model";



export const JOBPOSTING_DATA: JobPostingList[] = [
  {
    jobId: 1,
    jobTitle: "Software Engineer",
    jobDescription:
      "We are looking for a skilled software engineer to join our team.",
    postedDate: "2024-07-01",
    applicationDeadline: new Date("2024-08-01"),
    applicationUrl: "https://techsolutions.com/careers/software-engineer",
  },
  {
    jobId: 2,
    jobTitle: "Project Manager",
    jobDescription:
      "We are seeking an experienced project manager to oversee our projects.",
    postedDate: "2024-07-05",
    applicationDeadline: new Date("2024-08-15"),
    applicationUrl: "https://innovativeprojects.com/careers/project-manager",
  },
  {
    jobId: 3,
    jobTitle: "Marketing Specialist",
    jobDescription:
      "We are looking for a creative marketing specialist to join our team.",
    postedDate: "2024-07-10",
    applicationDeadline: new Date("2024-08-20"),
    applicationUrl: "https://creativeagency.com/careers/marketing-specialist",
  },
  {
    jobId: 4,
    jobTitle: "Data Analyst",
    jobDescription:
      "We are looking for a data analyst to help us make data-driven decisions.",
    postedDate: "2024-07-15",
    applicationDeadline: new Date("2024-08-25"),
    applicationUrl: "https://datainsights.com/careers/data-analyst",
  },
  {
    jobId: 5,
    jobTitle: "UX/UI Designer",
    jobDescription:
      "We are looking for a UX/UI designer with experience in mobile app design.",
    postedDate: "2024-07-20",
    applicationDeadline: new Date("2024-08-30"),
    applicationUrl: "https://designstudio.com/careers/ux-ui-designer",
  },
];

@Component({
  selector: "app-scheduled-jobs-list",
  standalone: true,
  imports: [AMGModules, CommonModule, SharedModule],
  templateUrl: "./scheduled-jobs-list.component.html",
  styleUrl: "./scheduled-jobs-list.component.css",
})
export class ScheduledJobsListComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService,
    private location: Location,
    private apiService: APIService
  ) {}

  displayedColumns: string[] = [
    "jobId",
    "jobTitle",
    "jobDescription",
    "postedDate",
    "applicationDeadline",
    "applicationUrl",
    "actions",
  ];

  columns = [
    { key: "jobId", label: "Job ID" },
    { key: "jobTitle", label: "Job Title " },
    { key: "jobDescription", label: "Job Description" },
    { key: "postedDate", label: "Posted Date" },
    { key: "applicationDeadline", label: "Application Deadline" },
    { key: "applicationUrl", label: "Application Url" },
    { key: "actions", label: "Actions" },
  ];

  dataSource = new MatTableDataSource<JobPostingList>(JOBPOSTING_DATA);
  selection = new SelectionModel<JobPostingList>(true, []);
  collegeId: number | undefined = undefined;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.collegeId = Number(params.get("collegeId"));
    });
  }
  openScheduledStudentsList(jobId?: number) {
    if (jobId !== undefined && this.collegeId !== null) {
      this.router.navigate(["test-interviews", this.collegeId, jobId]);
    } else {
      this.router.navigate(["test-interviews", this.collegeId, 0]);
    }
  }
  goBack(): void {
    this.location.back();
  }
}
