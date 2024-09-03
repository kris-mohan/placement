import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { ODataResponse } from "../courses.component";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { TrainingCourseAPIService } from "../api.course";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { NgxMomentDateModule } from "@angular-material-components/moment-adapter";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import * as moment from "moment";
@Component({
  selector: "app-add-edit-courses",
  standalone: true,
  imports: [
    CommonModule,
    AMGModules,
    SharedModule,
    NgxMomentDateModule,
    NgxMaterialTimepickerModule,
  ],
  templateUrl: "./add-edit-courses.component.html",
  styleUrl: "./add-edit-courses.component.css",
})
export class AddEditCoursesComponent {
  addEditCourseForm: FormGroup;
  Id: number | null = null;
  initialFormValues: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiTrainingCourse: TrainingCourseAPIService,
    private sweetAlertService: SweetAlertService
  ) {
    this.addEditCourseForm = this.fb.group({
      Name: "",
      Description: "",
      ValidFrom: "",
      ValidTill: "",
    });
  }

  ngOnInit(): void {
    this.getTrainingCourseById();
  }

  getTrainingCourseById(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this.Id = id !== null ? +id : null;
      if (this.Id) {
        this.apiTrainingCourse.getTrainingCourseDataById(this.Id).subscribe({
          next: (response: ODataResponse<any>) => {
            const course = response.value[0];
            if (course) {
              this.addEditCourseForm.patchValue(course);
              this.initialFormValues = this.addEditCourseForm.value;
            }
          },
          error: (error) => {
            console.error(
              `Error fetching Training Course data by ${this.Id}`,
              error
            );
          },
        });
      }
    });
  }

  async onSubmit(): Promise<void> {
    const courseData: Partial<any> = this.addEditCourseForm.value;
    if (courseData["ValidFrom"]) {
      courseData["ValidFrom"] = moment(courseData["ValidFrom"]).format(
        "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
      );
    }
    if (courseData["ValidTill"]) {
      courseData["ValidTill"] = moment(courseData["ValidTill"]).format(
        "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
      );
    }
    const isUpdate = !!this.Id;
    const actionText = isUpdate ? "update" : "add";
    const confirmed = await this.sweetAlertService.confirm(
      `Do you want to ${actionText} this course?`
    );

    if (confirmed) {
      this.apiTrainingCourse
        .addUpdateTrainingCourse(this.Id, courseData)
        .subscribe({
          next: (response: { success: boolean; message: any }) => {
            console.log(response);
            if (response.success) {
              this.router.navigate(["/training-configuration"]);
              this.sweetAlertService.success(response.message);
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

  onReset() {
    this.addEditCourseForm.reset(this.initialFormValues);
  }
}
