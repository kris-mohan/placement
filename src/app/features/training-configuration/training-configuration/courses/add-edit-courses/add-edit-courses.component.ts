import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { courseTableList_Data } from "../courses.component";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { TabService } from "src/app/features/company-configuration/tabs-service";

@Component({
  selector: "app-add-edit-courses",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./add-edit-courses.component.html",
  styleUrl: "./add-edit-courses.component.css",
})
export class AddEditCoursesComponent {
  addEditCourseForm: FormGroup;
  CourseId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private tabService: TabService
  ) {
    this.addEditCourseForm = this.fb.group({
      roleId: [null],
      roleName: ["", Validators.required],
      description: ["", Validators.required],
      createdDate: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this.CourseId = id !== null ? +id : null;
      if (this.CourseId) {
        const course = courseTableList_Data.find(
          (t) => t.courseId === this.CourseId
        );
        if (course) {
          this.addEditCourseForm.patchValue(course);
        }
      }
    });
  }

  onSubmit(): void {
    // if (this.addEditTechnologyForm.valid) {
    //   this.formSubmit.emit(this.addEditTechnologyForm.value);
    //   this.router.navigate(["/company-config"]);
    // }
  }
}
