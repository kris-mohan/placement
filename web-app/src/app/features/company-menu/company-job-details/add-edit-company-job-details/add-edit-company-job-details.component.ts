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
import { Campusregistration } from "src/app/services/types/Campusregistration";
import { Batch } from "src/app/services/types/Batch";
import { Course } from "src/app/services/types/Course";
import { Stream } from "src/app/services/types/Stream";
import { SkillType } from "src/app/services/types/SkillType";
import { Skill } from "src/app/services/types/Skill";
import { MatSelectChange } from "@angular/material/select";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Jobposting, PostJobposting } from "src/app/services/types/Jobposting";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { AddeditCompanyJobDetailsApiService } from "./add-edit-company-job-details-ApiService";
import { JobTypes } from "src/app/services/common-dropdowns/JobTypes";
import { ModeOfWorks } from "src/app/services/common-dropdowns/ModeOfWorks";
import { ShiftTypes } from "src/app/services/common-dropdowns/ShiftTypes";

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
  SkillNames = signal<Skill[]>([]);

  selectedSkillTypeIds: number[] = [];
  selectedSkillIds: number[] = [];
  selectedCollegeIds: number[] = [];
  selectedBatchIds: number[] = [];
  selectedCourseIds: number[] = [];
  selectedStreamIds: number[] = [];
  Id: number | null = null;
  sessionCompanyId: number;
  addEditJobPostingForm: FormGroup;

  JobTypes: string[] = JobTypes;
  ModeOfWorks: string[] = ModeOfWorks;
  ShiftTypes: string[] = ShiftTypes;
  // JobTypes = [
  //   "Full-Time",
  //   "Part-Time",
  //   "Temporary",
  //   "Contract",
  //   "Freelance",
  //   "Internship",
  //   "Apprenticeship",
  //   "Consultant",
  //   "Remote",
  //   "Seasonal",
  // ];

  // ModeOfWorks = ["On-Site", "Remote", "Hybrid", "Flexible", "Travel-Based"];

  // ShiftTypes = [
  //   "Day Shift",
  //   "Night Shift",
  //   "Swing Shift",
  //   "Rotating Shift",
  //   "Split Shift",
  //   "Weekend Shift",
  //   "On-Call Shift",
  //   "Fixed Shift",
  //   "Flexible Shift",
  // ];

  Months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  readonly dialog = inject(MatDialog);
  constructor(
    private tabService: TabsCompanyJobDetailsService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
    private addeditCompanyJobDetailsApiService: AddeditCompanyJobDetailsApiService,
    private sweetAlertService: SweetAlertService
  ) {
    const storedCompanyId = sessionStorage.getItem("CompanyId");
    this.sessionCompanyId = storedCompanyId ? parseInt(storedCompanyId) : 0;

    this.addEditJobPostingForm = this.fb.group({
      JobRole: ["", [Validators.required]],
      JobDescription: ["", [Validators.required]],
      ValidTill: [null, [Validators.required]],
      Positions: [0, [Validators.required]],
      QuantityFilled: [0, [Validators.required]],
      Salary: [0, [Validators.required]],
      Location: ["", [Validators.required]],
      Experience: ["", [Validators.required]],
      JobType: ["", [Validators.required]],
      Shift: ["", [Validators.required]],
      ModeOfWork: ["", [Validators.required]],
      DriveDate: [null, [Validators.required]],
      Vacancies: [0, [Validators.required]],
      MinSslcpercentage: [0, [Validators.required]],
      MinPucpercentage: [0, [Validators.required]],
      MinCgpa: [0, [Validators.required]],
      BacklogsAllowed: [0, [Validators.required]],

      MinimumYearExperience: [0, [Validators.required]],
      MaximumYearExperience: [0, [Validators.required]],
      MinimumMonthExperience: [0],
      MaximumMonthExperience: [0],
      IsDeleted: [false],
      IsActive: [true],
      Collegejobpostings: [[]],
      CompanyJobBatches: [[]],
      CompanyJobCourses: [[]],
      CompanyJobStreams: [[]],
      JobpostingSkillTypes: [[]],
      JobpostingSkills: [[]],
      selectedSkillTypeIds: [[]],
      selectedSkillIds: [[]],
      selectedCollegeIds: [[]],
      selectedBatchIds: [[]],
      selectedCourseIds: [[]],
      selectedStreamIds: [[]],
    });
  }

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
    this.GetAllSkills();
    this.GetJobPostingById();
  }

  GetAllSkills = () => {
    this.addeditCompanyJobDetailsApiService.GetSkillsByIds([]).subscribe({
      next: (skill) => {
        const data: SkillType[] = skill.value;
        console.log("Fetched All Skills:", data);
        const allSkills = data.flatMap((skillType) => skillType.Skills || []);
        this.SkillNames.set(allSkills);
      },
      error: (error) => console.error("Error fetching all skills:", error),
    });
  };

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

  onSkillTypeSelectionChange(event: MatSelectChange) {
    const selectedIds = event.value as number[];
    this.GetSkillsBySkillTypeId(selectedIds);
  }

  GetSkillsBySkillTypeId = (ids: number[]) => {
    this.addeditCompanyJobDetailsApiService.GetSkillsByIds(ids).subscribe({
      next: (skill) => {
        const data: SkillType[] = skill.value;
        console.log("Fetched Skills:", data);
        const allSkills = data.flatMap((skillType) => skillType.Skills || []);
        this.SkillNames.set(allSkills);
      },
      error: (error) => console.error("Error fetching skills:", error),
    });
  };

  GetJobPostingById(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this.Id = id !== null ? +id : null;
      if (this.Id) {
        this.addeditCompanyJobDetailsApiService
          .GetJobPostingById(this.Id)
          .subscribe({
            next: (response) => {
              const data: Jobposting = response.value[0];
              if (data) {
                this.addEditJobPostingForm.patchValue(data);

                this.selectedSkillTypeIds = Array.from(
                  new Set(
                    data.JobpostingSkills?.filter(
                      (x) => x.Skill?.SkillTypeId
                    ).map((x) => x.Skill?.SkillTypeId ?? 0) ?? []
                  )
                );

                this.selectedSkillIds =
                  data.JobpostingSkills?.filter((x) => x.SkillId).map(
                    (x) => x.SkillId ?? 0
                  ) ?? [];

                this.selectedCollegeIds =
                  data.Collegejobpostings?.filter((x) => x.CollegeId).map(
                    (x) => x.CollegeId ?? 0
                  ) ?? [];

                this.selectedBatchIds =
                  data.CompanyJobBatches?.filter((x) => x.BatchId).map(
                    (x) => x.BatchId ?? 0
                  ) ?? [];

                this.selectedCourseIds =
                  data.CompanyJobCourses?.filter((x) => x.CourseId).map(
                    (x) => x.CourseId ?? 0
                  ) ?? [];

                this.selectedStreamIds =
                  data.CompanyJobStreams?.filter((x) => x.StreamId).map(
                    (x) => x.StreamId ?? 0
                  ) ?? [];
              }
            },
            error: (error) => {
              console.error(`Error fetching company data by ${this.Id}`, error);
            },
          });
      }
    });
  }

  async onSubmit() {
    const jobPosting: Partial<PostJobposting> =
      this.addEditJobPostingForm.value;
    const isUpdate = !!this.Id;
    const actionText = isUpdate ? "update" : "add";
    const confirmed = await this.sweetAlertService.confirm(
      `Do you want to ${actionText} this JobPosting?`
    );
    if (confirmed) {
      const jobPostingData: PostJobposting = {
        Id: this.Id ?? 0,
        CompanyId: this.sessionCompanyId ?? 0,
        JobRole: jobPosting.JobRole ?? "",
        JobDescription: jobPosting.JobDescription ?? "",
        ValidFrom: jobPosting.ValidFrom ?? null,
        ValidTill: jobPosting.ValidTill ?? null,
        Positions: jobPosting.Positions ?? 0,
        QuantityFilled: jobPosting.QuantityFilled ?? 0,
        Salary: jobPosting.Salary ?? 0,
        Location: jobPosting.Location ?? "",
        JobType: jobPosting.JobType ?? "",
        Shift: jobPosting.Shift ?? "",
        ModeOfWork: jobPosting.ModeOfWork ?? "",
        DriveDate: jobPosting.DriveDate ?? null,
        Vacancies: jobPosting.Vacancies ?? 0,
        MinSslcpercentage: jobPosting.MinSslcpercentage ?? 0,
        MinPucpercentage: jobPosting.MinPucpercentage ?? 0,
        MinCgpa: jobPosting.MinCgpa ?? 0,
        BacklogsAllowed: jobPosting.BacklogsAllowed ?? 0,
        MinimumYearExperience: jobPosting.MinimumYearExperience ?? 0,
        MaximumYearExperience: jobPosting.MaximumYearExperience ?? 0,
        MinimumMonthExperience: jobPosting.MinimumMonthExperience ?? 0,
        MaximumMonthExperience: jobPosting.MaximumMonthExperience ?? 0,
        IsDeleted: 0,
        IsClosed: 0,
        Collegejobpostings: (jobPosting.Collegejobpostings ?? []).map(
          (collegeId) => ({
            JobPostingId: this.Id ?? 0,
            CollegeId: collegeId as number,
          })
        ),

        JobpostingSkills: (jobPosting.JobpostingSkills ?? []).map(
          (skillId) => ({
            JobPostingId: this.Id ?? 0,
            SkillId: skillId as number,
          })
        ),

        CompanyJobBatches: (jobPosting.CompanyJobBatches ?? []).map(
          (batchId) => ({
            JobPostingId: this.Id ?? 0,
            BatchId: batchId as number,
          })
        ),

        CompanyJobCourses: (jobPosting.CompanyJobCourses ?? []).map(
          (courseId) => ({
            JobPostingId: this.Id ?? 0,
            CourseId: courseId as number,
          })
        ),

        CompanyJobStreams: (jobPosting.CompanyJobStreams ?? []).map(
          (streamId) => ({
            JobPostingId: this.Id ?? 0,
            StreamId: streamId as number,
          })
        ),
      };
      this.addeditCompanyJobDetailsApiService
        .addUpdateJobPosting(this.Id, jobPostingData)
        .subscribe({
          next: (response: { success: boolean; message: any }) => {
            console.log(response);
            if (response.success) {
              this.sweetAlertService.success(response.message);
              this.router.navigate(["/company-job-details"]);
            } else {
              this.sweetAlertService.error(response.message);
            }
          },
          error: (error) => {
            this.sweetAlertService.error("An unexpected error occurred.");
          },
        });
    }
  }
}
