import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { AddEditCompanyComponent } from "../companies/add-edit-company/add-edit-company.component";
import { Router } from "@angular/router";
import { companyTableList } from "./company-technolog-model";

export const COMPANyTechnology_DATA: companyTableList[] = [
  {
    slNo: 1,
    id: 1,
    name: "Tech Innovators Inc.",
    url: "https://www.techinnovators.com",
    address: "123 Innovation Drive, Tech City, TX 75001",
    actions: "Edit, Delete",
  },
  {
    slNo: 2,
    id: 2,
    name: "Green Solutions Ltd.",
    url: "https://www.greensolutions.com",
    address: "456 Green Way, Eco Town, CA 94016",
    actions: "Edit, Delete",
  },
  {
    slNo: 3,
    id: 3,
    name: "HealthCare Partners",
    url: "https://www.healthcarepartners.com",
    address: "789 Health St, Wellness City, NY 10001",
    actions: "Edit, Delete",
  },
  {
    slNo: 4,
    id: 4,
    name: "Finance Experts LLC",
    url: "https://www.financeexperts.com",
    address: "321 Wealth Blvd, Money City, FL 33101",
    actions: "Edit, Delete",
  },
  {
    slNo: 5,
    id: 5,
    name: "EduVision Corp.",
    url: "https://www.eduvision.com",
    address: "654 Knowledge Lane, Learning Town, MA 02108",
    actions: "Edit, Delete",
  },
];
@Component({
  selector: "app-company-technology",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./company-technology.component.html",
  styleUrl: "./company-technology.component.css",
})
export class CompanyTechnologyComponent {
  companies = new FormControl("");

  CompaniesList: string[] = [
    "Extra cheese",
    "Mushroom",
    "Onion",
    "Pepperoni",
    "Sausage",
    "Tomato",
  ];
  displayedColumns: string[] = [
    "select",
    "slNo",
    "id",
    "name",
    "url",
    "address",
    "actions",
  ];
  columns = [
    { key: "select", label: "" },
    { key: "slNo", label: "Sl No" },
    { key: "id", label: "Id" },
    { key: "name", label: "Name" },
    { key: "url", label: "URL" },
    { key: "address", label: "Address" },
    { key: "actions", label: "Actions" },
  ];
  dataSource = new MatTableDataSource<companyTableList>(COMPANyTechnology_DATA);
  selection = new SelectionModel<companyTableList>(true, []);
  selectedCompany: AddEditCompanyComponent | null = null;
  isEditCompany = false;

  constructor(private router: Router, private location: Location) {}

  openAddEditCompanyTechnologyForm(Id?: number) {
    if (Id !== undefined && Id !== null) {
      this.router.navigate(["company-configuration", Id]);
    } else {
      this.router.navigate(["company-configuration", 0]);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
