import { CommonModule } from "@angular/common";
import { Component, inject, Inject, OnInit, signal } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from "@angular/material/chips";
import { FlexLayoutModule } from "@angular/flex-layout";
// import { LiveAnnouncer } from "@angular/cdk/a11y";

type Sector = {
  Name: string;
};

@Component({
  selector: "app-edit-profile",
  standalone: true,
  imports: [
    AMGModules,
    CommonModule,
    SharedModule,
    MatChipsModule,
    FlexLayoutModule,
  ],
  templateUrl: "./edit-profile.component.html",
  styleUrl: "./edit-profile.component.css",
})
export class EditProfileComponent implements OnInit {
  formData: FormGroup;
  addOnBlur: boolean = false;
  readonly sectorChips = signal<Sector[]>([]);

  showAllSectors = false;

  types: string[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditProfileComponent> // @Inject(MAT_DIALOG_DATA) public data: any // Data passed from the company-profile.component
  ) {
    this.formData = this.fb.group({
      sector: [""],
      overview: [""],
    });
  }
  ngOnInit(): void {
    this.loadInitialData();
    this.initializeForm();
  }
  initializeForm(): void {}

  // removeSectorChips(sector: string): void {
  //   console.log("hiii");
  //   const updatedSectors = this.sectorChips.filter((x) => x !== sector);
  //   this.sectorChips = updatedSectors;
  // }

  remove(sector: Sector): void {
    this.sectorChips.update((sectors) => {
      const index = sectors.indexOf(sector);
      if (index < 0) {
        return sectors;
      }

      sectors.splice(index, 1);
      return [...sectors];
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();
    if (value) {
      this.sectorChips.update((sectors) => [...sectors, { Name: value }]);
    }
    event.input.value = "";
  }

  loadInitialData(): void {
    this.sectorChips.update(() => {
      return [
        {
          Id: 1,
          Name: "Internet",
        },
        {
          Id: 2,
          Name: "Saas",
        },
        {
          Id: 3,
          Name: "Software Product",
        },
        {
          Id: 4,
          Name: "Unicorn",
        },
        {
          Id: 5,
          Name: "Private",
        },
        {
          Id: 6,
          Name: "Startup",
        },
      ];
    });

    this.types = ["Private", "Public", "Other"];
    // Load the data passed in the dialog from the company profile component.
  }
}
