import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'; 
import { MatDividerModule } from '@angular/material/divider';
import { AMGModules } from 'src/AMG-Module/AMG-module';


@Component({
  selector: 'app-approval',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatCardModule ,
    AMGModules,
    CommonModule,
    MatDividerModule,
  ],
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent {
  approvalForm: FormGroup;
  sgpaValues = [8.5, 9.0, 7.5, 8.0, 8.25, 7.9,8.55,9.0]; // Example SGPA values for four semesters

  constructor(private fb: FormBuilder) {
    this.approvalForm = this.fb.group({
      sgpa1Approved: [false],
      sgpa2Approved: [false],
      sgpa3Approved: [false],
      sgpa4Approved: [false],
      sgpa5Approved: [false],
      sgpa6Approved: [false],
      sgpa7Approved: [false],
      sgpa8Approved: [false],
      nameApproved: [false],
      fatherNameApproved: [false],
      fatherPhoneApproved: [false],
      motherNameApproved: [false],
      motherPhoneApproved: [false],
      sectionApproved: [false],
      branchApproved: [false],
      casteApproved: [false],
      religionApproved: [false],
    });
  }

  ngOnInit(): void {}

  onButtonClick(controlName: string): void {
    const currentValue = this.approvalForm.get(controlName)?.value;
    this.approvalForm.get(controlName)?.setValue(!currentValue);
  }

  getButtonStyle(controlName: string): string {
    return this.approvalForm.get(controlName)?.value ? 'btn-approved' : 'btn-pending';
  }

  approveAll(): void {
    const confirmation = confirm('Are you sure you want to approve all semesters?');
    if (confirmation) {
      for (let i = 1; i <= this.sgpaValues.length; i++) {
        this.approvalForm.get(`sgpa${i}Approved`)?.setValue(true);
      }
      // Optionally approve other fields
      this.approvalForm.get('nameApproved')?.setValue(true);
      this.approvalForm.get('fatherNameApproved')?.setValue(true);
      this.approvalForm.get('fatherPhoneApproved')?.setValue(true);
      this.approvalForm.get('motherNameApproved')?.setValue(true);
      this.approvalForm.get('motherPhoneApproved')?.setValue(true);
      this.approvalForm.get('sectionApproved')?.setValue(true);
      this.approvalForm.get('branchApproved')?.setValue(true);
      this.approvalForm.get('casteApproved')?.setValue(true);
      this.approvalForm.get('religionApproved')?.setValue(true);
    }
  }

  onSubmit(): void {
    console.log(this.approvalForm.value); // Submit logic here
  }
}
