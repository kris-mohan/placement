import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { ODataResponse } from "../roles.component";
import { TabService } from "../../../tabs-service";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { Role } from "../roles-module";
import { RoleAPIService } from "../api.role";

@Component({
  selector: "app-add-edit-role",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./add-edit-role.component.html",
  styleUrl: "./add-edit-role.component.css",
})
export class AddEditRoleComponent {
  roles: Role[] = [];
  addEditRoleForm: FormGroup;
  Id: number | null = null;
  initialFormValues: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService,
    private apiRoleService: RoleAPIService
  ) {
    this.addEditRoleForm = this.fb.group({
      RoleName: "",
      Description: "",
    });
  }

  ngOnInit(): void {
    this.loadRoleData();
    this.getRoleById();
  }

  loadRoleData(): void {
    this.apiRoleService.loadRoleData().subscribe({
      next: (response: ODataResponse<any>) => {
        this.roles = response.value;
        console.log("Role Data Loaded:", response);
      },
      error: (error) => {
        console.error("Error loading Roles", error);
      },
    });
  }

  getRoleById(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("roleId");
      this.Id = id !== null ? +id : null;
      if (this.Id) {
        this.apiRoleService.getRoleDataById(this.Id).subscribe({
          next: (response: ODataResponse<any>) => {
            const role = response.value[0];
            if (role) {
              this.addEditRoleForm.patchValue(role);
              this.initialFormValues = this.addEditRoleForm.value;
            }
          },
          error: (error) => {
            console.error(`Error fetching Role data by ${this.Id}`, error);
          },
        });
      }
    });
  }
  async onSubmit(): Promise<void> {
    const roleData: Partial<any> = this.addEditRoleForm.value;
    const isUpdate = !!this.Id;
    const actionText = isUpdate ? "update" : "add";
    const confirmed = await this.sweetAlertService.confirm(
      `Do you want to ${actionText} this Role?`
    );

    if (confirmed) {
      this.apiRoleService.addUpdateRole(this.Id, roleData).subscribe({
        next: (response: { success: boolean; message: any }) => {
          console.log(response);
          if (response.success) {
            this.sweetAlertService.success(response.message);
            this.router.navigate(["/company-configuration"]);
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
    this.addEditRoleForm.reset(this.initialFormValues);
  }
}
