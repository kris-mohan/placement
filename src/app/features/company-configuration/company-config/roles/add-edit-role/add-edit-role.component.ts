import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { AppComponent } from "src/app/app.component";
import { SharedModule } from "src/app/shared/shared.module";
import { ROLES_DATA } from "../roles.component";
import { TabService } from "../../../tabs-service";

@Component({
  selector: "app-add-edit-role",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./add-edit-role.component.html",
  styleUrl: "./add-edit-role.component.css",
})
export class AddEditRoleComponent {
  addEditRoleForm: FormGroup;
  RoleId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private tabService: TabService
  ) {
    this.addEditRoleForm = this.fb.group({
      roleId: [null],
      roleName: ["", Validators.required],
      description: ["", Validators.required],
      createdDate: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this.RoleId = id !== null ? +id : null;
      if (this.RoleId) {
        const technology = ROLES_DATA.find((t) => t.roleId === this.RoleId);
        if (technology) {
          this.addEditRoleForm.patchValue(technology);
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
