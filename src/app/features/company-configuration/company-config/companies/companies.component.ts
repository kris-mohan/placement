import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";

export interface companyTableList {
  slNo: number;
  id: number;
  name: string;
  url: string;
  address: string;
  actions: string;
}
const COMPANIES_DATA: companyTableList[] = [
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
  selector: "app-companies",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./companies.component.html",
  styleUrl: "./companies.component.css",
})
export class CompaniesComponent {
  displayedColumns: string[] = [
    "select",
    "slNo",
    "id",
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
  dataSource = new MatTableDataSource<companyTableList>(COMPANIES_DATA);
  selection = new SelectionModel<companyTableList>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: companyTableList): string {
    if (!row) {
      return `${this.isAllSelected() ? "deselect" : "select"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.slNo + 1
    }`;
  }
}
