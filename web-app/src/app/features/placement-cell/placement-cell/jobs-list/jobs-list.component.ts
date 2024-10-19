import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { JobPostingList } from "./jobs-list-model";

export const JOBPOSTING_DATA: JobPostingList[] = [
  {
    jobId: 1,
    jobTitle: "Software Engineer",
    companyName: "Tech Solutions Inc.",
    location: "San Francisco, CA",
    jobDescription:
      "We are looking for a skilled software engineer to join our team.",
    postedDate: "2024-07-01",
    applicationDeadline: new Date("2024-08-01"),
    applicationUrl: "https://techsolutions.com/careers/software-engineer",
    actions: "readmore, delete",
  },
  {
    jobId: 2,
    jobTitle: "Project Manager",
    companyName: "Innovative Projects Ltd.",
    location: "New York, NY",
    jobDescription:
      "We are seeking an experienced project manager to oversee our projects.",
    postedDate: "2024-07-05",
    applicationDeadline: new Date("2024-08-15"),
    applicationUrl: "https://innovativeprojects.com/careers/project-manager",
    actions: "readmore, delete",
  },
  {
    jobId: 3,
    jobTitle: "Marketing Specialist",
    companyName: "Creative Agency",
    location: "Los Angeles, CA",
    jobDescription:
      "We are looking for a creative marketing specialist to join our team.",
    postedDate: "2024-07-10",
    applicationDeadline: new Date("2024-08-20"),
    applicationUrl: "https://creativeagency.com/careers/marketing-specialist",
    actions: "readmore, delete",
  },
  {
    jobId: 4,
    jobTitle: "Data Analyst",
    companyName: "Data Insights Corp.",
    location: "Chicago, IL",
    jobDescription:
      "We are looking for a data analyst to help us make data-driven decisions.",
    postedDate: "2024-07-15",
    applicationDeadline: new Date("2024-08-25"),
    applicationUrl: "https://datainsights.com/careers/data-analyst",
    actions: "readmore, delete",
  },
];

@Component({
  selector: "app-jobs-list",
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: "./jobs-list.component.html",
  styleUrl: "./jobs-list.component.css",
})
export class JobsListComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService,
    private location: Location
  ) {}

  companyId: number | undefined = undefined;

  displayedColumns: string[] = [
    "slNo",
    "jobId",
    "jobTitle",
    "companyName",
    "location",
    "jobDescription",
    "postedDate",
    "actions",
  ];
  columns = [
    { key: "slNo", label: "Sl No" },
    { key: "jobId", label: "job Id" },
    { key: "jobTitle", label: "job Title" },
    { key: "companyName", label: "company Name" },
    { key: "location", label: "location" },
    { key: "jobDescription", label: "job Description" },
    { key: "postedDate", label: "posted Date" },
    { key: "actions", label: "Actions" },
  ];
  dataSource = new MatTableDataSource<JobPostingList>(JOBPOSTING_DATA);
  selection = new SelectionModel<JobPostingList>(true, []);

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.companyId = Number(params.get("companyId"));
    });
  }

  openEligibleStudentsList(jobId: number) {
    if (this.companyId !== undefined && jobId !== undefined) {
      this.router.navigate(["company-lists", this.companyId, jobId]);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
