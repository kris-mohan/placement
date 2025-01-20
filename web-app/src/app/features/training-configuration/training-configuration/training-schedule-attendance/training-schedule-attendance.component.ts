import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TrainerScheduleAPIService } from '../schedules/api.schedules';
import { SharedModule } from 'src/app/shared/shared.module';
import { ODataResponse } from '../trainers/trainers.component';
import { Tblstudent } from 'src/app/services/types/Tblstudent';
import { SendMeetingLinkComponent } from '../send-meeting-link/send-meeting-link.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-training-schedule-attendance',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './training-schedule-attendance.component.html',
  styleUrl: './training-schedule-attendance.component.css',
})
export class TrainingScheduleAttendanceComponent {
 
  studentsData: Tblstudent[] = [];
  displayedColumns: string[] = ['slNo', 'studentName', 'present', 'absent'];

  constructor(private trainerScheduleApiService: TrainerScheduleAPIService) {}

  ngOnInit(): void {
    this.getAllStudents();
  }
  getAllStudents() {
    this.trainerScheduleApiService.loadAllStudentsData().subscribe({
      next: (response: ODataResponse<any>) => {
        console.log('API Response:', response);
        this.studentsData = response.value;
      },
      error: (error) => {
        console.error('Error loading training courses', error);
      },
    });
  }

  markAll(status: 'present' | 'absent'): void {
    this.studentsData = this.studentsData.map((student) => ({
      ...student,
      attendance: status,
    }));
  }

  updateAttendance(student: any, status: 'present' | 'absent'): void {
    student.attendance = status;
  }


}
