import { Component } from "@angular/core";
import { JOBPOSTING_DATA } from "../job-postings.component";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { AMGModules } from "src/AMG-Module/AMG-module";

@Component({
  selector: "app-add-edit-job-postings",
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: "./add-edit-job-postings.component.html",
  styleUrl: "./add-edit-job-postings.component.css",
})
export class AddEditJobPostingsComponent {
  addEditJobPostForm: FormGroup;
  jobId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.addEditJobPostForm = this.fb.group({
      technologyId: [null],
      name: ["", Validators.required],
      description: ["", Validators.required],
      category: ["", Validators.required],
      version: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this.jobId = id !== null ? +id : null;
      if (this.jobId) {
        const technology = JOBPOSTING_DATA.find((t) => t.jobId === this.jobId);
        if (technology) {
          this.addEditJobPostForm.patchValue(technology);
        }
      }
    });
  }
}
