import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { CompanyFileUploadAPIService } from "./company-file-uploadApiService";

@Component({
  selector: "app-company-file-upload",
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: "./company-file-upload.component.html",
  styleUrl: "./company-file-upload.component.css",
})
export class CompanyFileUploadComponent {
  readonly dialog = inject(MatDialog);
  formData: FormGroup;
  selectedFile: File[] = [];
  constructor(
    private sweetAlertService: SweetAlertService,
    private companyFileUploadAPIService: CompanyFileUploadAPIService,
    private fb: FormBuilder
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

      this.companyFileUploadAPIService.uploadDocument(formData).subscribe({
        next: (response) => {
          this.sweetAlertService.success(response.message);
        },
        error: (error) => {
          console.error("Error uploading documents:", error);
        },
      });
    } else {
      console.log("No files selected.");
    }
  }
}
