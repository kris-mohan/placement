import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { mappingJobPost_Data } from "../mapping-jop-post.component";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-add-edit-mapping-job-post",
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: "./add-edit-mapping-job-post.component.html",
  styleUrl: "./add-edit-mapping-job-post.component.css",
})
export class AddEditMappingJobPostComponent {
  addEditCompanyTechnologyForm: FormGroup;
  compTechnologyId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.addEditCompanyTechnologyForm = this.fb.group({
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
      this.compTechnologyId = id !== null ? +id : null;
      if (this.compTechnologyId) {
        const technology = mappingJobPost_Data.find(
          (t) => t.id === this.compTechnologyId
        );
        if (technology) {
          this.addEditCompanyTechnologyForm.patchValue(technology);
        }
      }
    });
  }
}
