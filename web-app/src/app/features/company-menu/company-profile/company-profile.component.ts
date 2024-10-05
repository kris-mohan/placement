import { Component } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { MatDialog } from "@angular/material/dialog";
import { FormBuilder } from "@angular/forms";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";

@Component({
  selector: "app-company-profile",
  standalone: true,
  imports: [AMGModules],
  templateUrl: "./company-profile.component.html",
  styleUrl: "./company-profile.component.css",
})
export class CompanyProfileComponent {
  constructor(
    private dialog: MatDialog, // Inject MatDialog instead of NgbModal
    private formBuilder: FormBuilder
  ) {}
  openEditCompanyProfile() {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      width: "150em",
    });
    dialogRef.afterClosed();
  }
}

