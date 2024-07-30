import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { COMPANyTechnology_DATA } from "../company-technology.component";

@Component({
  selector: "app-add-edit-comp-tech",
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: "./add-edit-comp-tech.component.html",
  styleUrl: "./add-edit-comp-tech.component.css",
})
export class AddEditCompTechComponent {
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
        const technology = COMPANyTechnology_DATA.find(
          (t) => t.id === this.compTechnologyId
        );
        if (technology) {
          this.addEditCompanyTechnologyForm.patchValue(technology);
        }
      }
    });
  }
}
