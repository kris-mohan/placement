import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { DialogMessageService } from "src/app/services/dialog-message/dialog-message/dialog-message.service";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { MappingJobPostList } from "./mapping-job-post-model";

export const mappingJobPost_Data: MappingJobPostList[] = [
  {
    slNo: 1,
    id: 101,
    JobPostName: "Software Engineer",
    streams: "Engineering, IT",
    actions: "View, Edit, Delete",
  },
  {
    slNo: 2,
    id: 102,
    JobPostName: "Project Manager",
    streams: "Management, Business",
    actions: "View, Edit, Delete",
  },
  {
    slNo: 3,
    id: 103,
    JobPostName: "Marketing Specialist",
    streams: "Marketing, Sales",
    actions: "View, Edit, Delete",
  },
  {
    slNo: 4,
    id: 104,
    JobPostName: "Data Analyst",
    streams: "Data Science, Analytics",
    actions: "View, Edit, Delete",
  },
  {
    slNo: 5,
    id: 105,
    JobPostName: "UX/UI Designer",
    streams: "Design, User Experience",
    actions: "View, Edit, Delete",
  },
];

@Component({
  selector: "app-mapping-jop-post",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./mapping-jop-post.component.html",
  styleUrl: "./mapping-jop-post.component.css",
})
export class MappingJopPostComponent {
  constructor(
    private router: Router,
    private dialogService: DialogMessageService,
    private sweetAlertService: SweetAlertService,
    private location: Location
  ) {}
  displayedColumns: string[] = [
    "slNo",
    "id",
    "JobPostName",
    "streams",
    "actions",
  ];
  columns = [
    { key: "slNo", label: "Sl No" },
    { key: "id", label: "Id" },
    { key: "JobPostName", label: "JobPostName" },
    { key: "streams", label: "streams" },
    { key: "actions", label: "Actions" },
  ];
  dataSource = new MatTableDataSource<MappingJobPostList>(mappingJobPost_Data);
  selection = new SelectionModel<MappingJobPostList>(true, []);

  openAddEditMappingJobPostForm(id?: number) {
    if (id !== undefined && id !== null) {
      this.router.navigate(["/campus-configuration/mapping-jobs", id]);
    } else {
      this.router.navigate(["/campus-configuration/mapping-jobs", 0]);
    }
  }

  async deleteMappingJobPost(id: number) {
    const confirmed = await this.sweetAlertService.confirmDelete(
      "Do you really want to delete?"
    );
    if (confirmed) {
      this.dataSource.data = this.dataSource.data.filter(
        (company) => company.id !== id
      );
      this.sweetAlertService.success("Deleted successfully!");
    }
  }

  goBack(): void {
    this.location.back();
  }
}
