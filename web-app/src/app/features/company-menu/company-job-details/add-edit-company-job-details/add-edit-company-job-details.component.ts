import { CommonModule, Location } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { AddRoundsModalComponent } from "../test-rounds/add-rounds-modal/add-rounds-modal.component";
import { MatDialog } from "@angular/material/dialog";

import { ActivatedRoute, Router } from "@angular/router";
import { TestRoundsComponent } from "../test-rounds/test-rounds.component";
import { TabsCompanyJobDetailsService } from "../../tabs-Company-job-details";
import { PanelTabComponent } from "../panel-tab/panel-tab.component";
import { AddeditCompanyJobDetailsApiService } from "./add-edit-company-job-details-ApiService";
import { Campusregistration } from "src/app/services/types/Campusregistration";
import { Batch } from "src/app/services/types/Batch";
import { Course } from "src/app/services/types/Course";
import { Stream } from "src/app/services/types/Stream";
import { SkillType } from "src/app/services/types/SkillType";
import { Skill } from "src/app/services/types/Skill";

@Component({
  selector: "app-add-edit-company-job-details",
  standalone: true,
  imports: [
    SharedModule,
    CommonModule,
    AMGModules,
    NgxMaterialTimepickerModule,
    TestRoundsComponent,
    PanelTabComponent,
  ],
  templateUrl: "./add-edit-company-job-details.component.html",
  styleUrl: "./add-edit-company-job-details.component.css",
})
export class AddEditCompanyJobDetailsComponent {
  collegeNames = signal<Campusregistration[]>([]);
  BatchesNames = signal<Batch[]>([]);
  CoursesNames = signal<Course[]>([]);
  StreamNames = signal<Stream[]>([]);
  SkillTypeNames = signal<SkillType[]>([]);
  SkillNames = signal<SkillType[]>([]);

  selectedSkillTypeIds: number[] = [];

  readonly dialog = inject(MatDialog);
  constructor(
    private tabService: TabsCompanyJobDetailsService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private addeditCompanyJobDetailsApiService: AddeditCompanyJobDetailsApiService
  ) {}

  openAddRoundsModalPopup(company: any): void {
    this.dialog.open(AddRoundsModalComponent, {
      width: "500px",
      height: "600px",
      data: company,
    });
  }
  onTabChange(event: number): void {
    this.tabService.setActiveTab(event);
  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.GetAllCollegeName();
    this.GetAllBatchName();
    this.GetAllCoursesName();
    this.GetAllStreamName();
    this.GetAllSkillTypesName();
  }

  GetAllCollegeName = () => {
    this.addeditCompanyJobDetailsApiService.GetAllCollegeNames().subscribe({
      next: (collegeName) => {
        const data: Campusregistration[] = collegeName.value;
        this.collegeNames.set(data);
      },
    });
  };

  GetAllBatchName = () => {
    this.addeditCompanyJobDetailsApiService.GetAllBatches().subscribe({
      next: (batch) => {
        const data: Batch[] = batch.value;
        this.BatchesNames.set(data);
      },
    });
  };

  GetAllCoursesName = () => {
    this.addeditCompanyJobDetailsApiService.GetAllCourses().subscribe({
      next: (batch) => {
        const data: Course[] = batch.value;
        this.CoursesNames.set(data);
      },
    });
  };

  GetAllStreamName = () => {
    this.addeditCompanyJobDetailsApiService.GetAllStreams().subscribe({
      next: (stream) => {
        const data: Stream[] = stream.value;
        this.StreamNames.set(data);
      },
    });
  };

  GetAllSkillTypesName = () => {
    this.addeditCompanyJobDetailsApiService.GetAllSkills().subscribe({
      next: (skill) => {
        const data: SkillType[] = skill.value;
        this.SkillTypeNames.set(data);
      },
    });
  };

  onSkillTypeSelectionChange(event: number[]) {
    this.GetSkillsBySkillTypeId(event);
  }

  GetSkillsBySkillTypeId = (ids: number[]) => {
    this.addeditCompanyJobDetailsApiService.GetSkillsByIds(ids).subscribe({
      next: (skill) => {
        const data: SkillType[] = skill.value;
        console.log("Fetched Skills:", data);
        this.SkillNames.set(data);
      },
      error: (error) => console.error("Error fetching skills:", error),
    });
  };
}
