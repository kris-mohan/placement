import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { PlacementFileUploadAPIService } from "./placement-upload-fileApiService";
import { EligibleStudentsListComponent } from "../../eligible-students-list/eligible-students-list.component";

@Component({
  selector: "app-placement-upload-file",
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: "./placement-upload-file.component.html",
  styleUrl: "./placement-upload-file.component.css",
})
export class PlacementUploadFileComponent {
  readonly dialog = inject(MatDialog);
  formData: FormGroup;
  selectedFile: File[] = [];
  constructor(
    private sweetAlertService: SweetAlertService,
    private placementFileUploadAPIService: PlacementFileUploadAPIService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PlacementUploadFileComponent>
  ) {
    this.formData = this.fb.group({
      file: [null],
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = Array.from(event.target.files);
    this.formData.patchValue({ file: this.selectedFile });
  }

  isLargeScreen() {
    return window.innerWidth > 768;
  }

  onSubmit(): void {
    if (this.selectedFile.length > 0) {
      const formData = new FormData();
      this.selectedFile.forEach((file) => formData.append("file", file));

      this.placementFileUploadAPIService.uploadDocument(formData).subscribe({
        next: (response) => {
          this.sweetAlertService.success(response.message);
          this.dialogRef.close(response.message);
        },
        error: (error) => {
          console.error("Error uploading documents:", error);
          this.dialogRef.close("Error occurred while uploading."); 
        },
      });
    } else {
      console.log("No files selected.");
      this.dialogRef.close("No files selected.");
    }
  }
}
