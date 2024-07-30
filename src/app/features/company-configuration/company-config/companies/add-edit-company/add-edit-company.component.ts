import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { COMPANIES_DATA } from "../companies.component";
import { CommonModule } from "@angular/common";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  selector: "app-add-edit-company",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./add-edit-company.component.html",
  styleUrl: "./add-edit-company.component.css",
})
export class AddEditCompanyComponent {
  addEditCompanyForm: FormGroup;
  companyId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.addEditCompanyForm = this.fb.group({
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
      this.companyId = id !== null ? +id : null;
      if (this.companyId) {
        const technology = COMPANIES_DATA.find((t) => t.id === this.companyId);
        if (technology) {
          this.addEditCompanyForm.patchValue(technology);
        }
      }
    });
  }
}
