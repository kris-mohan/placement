import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { AddEditCompanyComponent } from "../companies/add-edit-company/add-edit-company.component";
import { AddEditRoleComponent } from "./add-edit-role/add-edit-role.component";
import { Router } from "@angular/router";

export interface RoleTableList {
  slNo: number;
  roleId: number;
  roleName: string;
  description: string;
  createdDate: string;
  actions: string;
}

export const ROLES_DATA: RoleTableList[] = [
  {
    slNo: 1,
    roleId: 1,
    roleName: "Administrator",
    description: "Full access to all system functionalities.",
    createdDate: "2024-01-01",
    actions: "Edit, Delete",
  },
  {
    slNo: 2,
    roleId: 2,
    roleName: "Editor",
    description: "Can edit and manage content, but cannot delete.",
    createdDate: "2024-01-01",
    actions: "Edit, Delete",
  },
  {
    slNo: 3,
    roleId: 3,
    roleName: "Viewer",
    description: "Can only view content without any modification rights.",
    createdDate: "2024-01-01",
    actions: "Edit",
  },
  {
    slNo: 4,
    roleId: 4,
    roleName: "Guest",
    description: "Limited access to view certain public content.",
    createdDate: "2024-01-01",
    actions: "None",
  },
  {
    slNo: 5,
    roleId: 5,
    roleName: "Moderator",
    description: "Can moderate content and manage user interactions.",
    createdDate: "2024-01-01",
    actions: "Edit, Delete",
  },
];

@Component({
  selector: "app-roles",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./roles.component.html",
  styleUrl: "./roles.component.css",
})
export class RolesComponent {
  displayedColumns: string[] = [
    "select",
    "slNo",
    "roleId",
    "roleName",
    "description",
    "createdDate",
    "actions",
  ];

  columns = [
    { key: "select", label: "" },
    { key: "slNo", label: "Sl No" },
    { key: "roleId", label: "roleId" },
    { key: "roleName", label: "roleName" },
    { key: "description", label: "description" },
    { key: "createdDate", label: "createdDate" },
    { key: "actions", label: "Actions" },
  ];

  dataSource = new MatTableDataSource<RoleTableList>(ROLES_DATA);
  selection = new SelectionModel<RoleTableList>(true, []);
  selectedRole: AddEditRoleComponent | null = null;
  isEditRole = false;

  constructor(private router: Router, private location: Location) {}

  openAddEditRoleForm(roleId?: number) {
    if (roleId != undefined) {
      this.router.navigate(["company-configuration/addEditRole", roleId]);
    } else {
      this.router.navigate(["company-configuration/addEditRole", "new"]);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
