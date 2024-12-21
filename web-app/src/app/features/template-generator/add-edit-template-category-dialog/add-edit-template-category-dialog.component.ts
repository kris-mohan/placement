import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { TemplateCategory } from "src/app/services/types/TemplateCategory";
import { SharedModule } from "src/app/shared/shared.module";
import { ErrorNotification } from "src/app/utilities/AlertMessage/AlertMessage";

@Component({
  selector: "app-add-edit-template-category-dialog",
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MatCardModule,
    AMGModules,
    SharedModule,
    CommonModule,
  ],
  templateUrl: "./add-edit-template-category-dialog.component.html",
  styleUrl: "./add-edit-template-category-dialog.component.css",
})
export class AddEditTemplateCategoryDialogComponent {
  Name: string = "";
  Description: string = "";
  isEditMode: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddEditTemplateCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: TemplateCategory
  ) {
    console.log("Modal Popup initial data", data);
    if (data?.Name) {
      this.Name = data?.Name;
      this.Description = data?.Description;
      this.isEditMode = true;
    }
  }

  onSave() {
    if (this.Name.trim()) {
      const updatedData: TemplateCategory = {
        Id: this.data?.Id ?? 0,
        Name: this.Name,
        Description: this.Description,
        CreatedAt: this.data?.CreatedAt,
        UpdatedAt: this.data?.UpdatedAt,
        Templates: [],
      };
      this.dialogRef.close(updatedData);
    } else {
      ErrorNotification("Please fill in the required fields.");
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
