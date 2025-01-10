import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompanyJobDetailsApiService } from '../company-job-details-apiService';
import { SweetAlertService } from 'src/app/services/sweet-alert-service/sweet-alert-service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload-company-details',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './upload-company-details.component.html',
  styleUrl: './upload-company-details.component.css',
})
export class UploadCompanyDetailsComponent {
  readonly dialog = inject(MatDialog);
  formData: FormGroup;
  selectedFile: File[] = [];
  sessionCompanyId: number;
  file: File[] = [];

  constructor(
    private companyApiService: CompanyJobDetailsApiService,
    private sweetAlertService: SweetAlertService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UploadCompanyDetailsComponent>
  ) {
    this.formData = this.fb.group({
      file: [null],
    });
    const storedCompanyId = sessionStorage.getItem('CompanyId');
    this.sessionCompanyId = storedCompanyId ? parseInt(storedCompanyId) : 0;
  }

  onFileSelected(event: any): void {
    this.selectedFile = Array.from(event.target.files);
    this.formData.patchValue({ file: this.selectedFile });
  }

  onUpload(): void {
    if (this.selectedFile.length > 0) {
      const formData = new FormData();
      this.selectedFile.forEach((file) => formData.append('file', file));

      this.companyApiService
        .uploadJobPostingsFile(this.sessionCompanyId, formData)
        .subscribe({
          next: (response) => {
            this.sweetAlertService.success(response.message);
            this.dialogRef.close(response.message);
          },
          error: (error) => {
            console.error('Error uploading documents:', error);
            this.dialogRef.close('Error occurred while uploading.');
          },
        });
    } else {
      console.log('No files selected.');
      this.dialogRef.close('No files selected.');
    }
  }

  downloadJobPostingTemplate(file: any) {
    return this.companyApiService.getJobPostingsTemplate(file);
  }

  onDownloadClick() {
    const url =
      'https://localhost:44304/api/common/download-jobpostings-template';
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = '';
    anchor.target = '_blank';
    anchor.click();
  }
}
