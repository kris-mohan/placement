import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AMGModules } from 'src/AMG-Module/AMG-module';
import { SweetAlertService } from 'src/app/services/sweet-alert-service/sweet-alert-service';
import { HttpClient } from '@angular/common/http';
import { StudentRegistartion } from './student-registartion.module';
import { StudentRegistrationAPIService } from './api.student.registration';

export interface ODataResponse<T> {
  value: T[];
}

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css'],
  imports: [
    AMGModules,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  standalone: true,
})
export class StudentRegistrationComponent {
  studentRegistrationForm: FormGroup;
  isPasswordVisible = false;
  Id: number | null = null;

  // Dummy data for dropdowns
  schoolList = [
    { id: 1, name: 'School of Engineering' },
    { id: 2, name: 'School of Business' },
  ];

  batchList = ['2020-2024', '2021-2025', '2022-2026'];

  branchList = ['Computer Science', 'Electronics', 'Mechanical'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sweetAlertService: SweetAlertService,

    private apiStudentRegistration: StudentRegistrationAPIService
  ) {
    this.studentRegistrationForm = this.fb.group({
      Name: '',
      RollNumber: '',
      Email: '',
      PhoneNumber: '',
      SchoolId: '',
      Batch: '',
      Branch: '',
      Password: '',
    });
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onReset() {
    this.studentRegistrationForm.reset();
  }

  async onSubmit(): Promise<void> {
    const studentData = this.studentRegistrationForm.value;
    studentData.UserRoleId = 3;
    const isUpdate = !!this.Id;
    const actionText = isUpdate ? 'update' : 'add';
    const confirmed = await this.sweetAlertService.confirm(
      'Do you want to register?'
    );

    if (confirmed) {
      this.apiStudentRegistration
        .addUpdateStudentRegistration(this.Id, studentData)
        .subscribe({
          next: (response: any) => {
            if (response.success) {
              this.router.navigate(['/login']);
              this.sweetAlertService.success('Registration successful!');
            } else {
              this.sweetAlertService.error('Registration failed.');
            }
          },
          error: () => {
            this.sweetAlertService.error('An unexpected error occurred.');
          },
        });
    }
  }
}
