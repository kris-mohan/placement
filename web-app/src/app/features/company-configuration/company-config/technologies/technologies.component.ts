import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { AddEditTechnologyComponent } from "./add-edit-technology/add-edit-technology.component";
import { Router } from "@angular/router";
import { TechnologyTableList } from "./technologies-model";

export const TECHNOLOGIES_DATA: TechnologyTableList[] = [
  {
    slNo: 1,
    comnpanyId: 1,
    technologyId: 1,
    name: "Angular",
    description: "A framework for building web applications",
    category: "Frontend",
    version: "12.0",
    actions: "Edit, Delete",
  },
  {
    slNo: 2,
    comnpanyId: 1,
    technologyId: 2,
    name: "React",
    description: "A library for building user interfaces",
    category: "Frontend",
    version: "17.0",
    actions: "Edit, Delete",
  },
  {
    slNo: 3,
    comnpanyId: 1,
    technologyId: 3,
    name: "Vue.js",
    description: "A progressive framework for building user interfaces",
    category: "Frontend",
    version: "3.0",
    actions: "Edit, Delete",
  },
  {
    slNo: 4,
    comnpanyId: 2,
    technologyId: 4,
    name: "Node.js",
    description:
      "A runtime for building server-side applications with JavaScript",
    category: "Backend",
    version: "14.0",
    actions: "Edit, Delete",
  },
  {
    slNo: 5,
    comnpanyId: 2,
    technologyId: 5,
    name: "Express.js",
    description: "A web application framework for Node.js",
    category: "Backend",
    version: "4.17",
    actions: "Edit, Delete",
  },
  {
    slNo: 6,
    comnpanyId: 2,
    technologyId: 6,
    name: "Django",
    description: "A high-level Python web framework",
    category: "Backend",
    version: "3.2",
    actions: "Edit, Delete",
  },
  {
    slNo: 7,
    comnpanyId: 2,
    technologyId: 7,
    name: "Flask",
    description: "A micro web framework written in Python",
    category: "Backend",
    version: "2.0",
    actions: "Edit, Delete",
  },
  {
    slNo: 8,
    comnpanyId: 3,
    technologyId: 8,
    name: "Spring Boot",
    description:
      "A framework for building production-ready applications in Java",
    category: "Backend",
    version: "2.5",
    actions: "Edit, Delete",
  },
  {
    slNo: 9,
    comnpanyId: 3,
    technologyId: 9,
    name: "Laravel",
    description: "A PHP framework for web artisans",
    category: "Backend",
    version: "8.0",
    actions: "Edit, Delete",
  },
  {
    slNo: 10,
    comnpanyId: 3,
    technologyId: 10,
    name: "Ruby on Rails",
    description: "A server-side web application framework written in Ruby",
    category: "Backend",
    version: "6.1",
    actions: "Edit, Delete",
  },
];

@Component({
  selector: "app-technologies",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./technologies.component.html",
  styleUrl: "./technologies.component.css",
})
export class TechnologiesComponent {
  constructor(private router: Router, private location: Location) {}

  displayedColumns: string[] = [
    "select",
    "slNo",
    "technologyId",
    "name",
    "description",
    "category",
    "version",
    "actions",
  ];

  columns = [
    { key: "select", label: "" },
    { key: "slNo", label: "Sl No" },
    { key: "technologyId", label: "Technology Id" },
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
    { key: "category", label: "Category" },
    { key: "version", label: "Version" },
    { key: "actions", label: "Actions" },
  ];

  dataSource = new MatTableDataSource<TechnologyTableList>(TECHNOLOGIES_DATA);
  selection = new SelectionModel<TechnologyTableList>(true, []);
  selectedTechnology: AddEditTechnologyComponent | null = null;
  isEditTechnology = false;

  openAddEditTechnologyForm(technologyId?: number) {
    if (technologyId !== undefined) {
      this.router.navigate(["/company-configuration/technology", technologyId]);
    } else {
      this.router.navigate(["/company-configuration/technology", null]);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
