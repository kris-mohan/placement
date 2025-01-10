import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AMGModules } from 'src/AMG-Module/AMG-module';
import { SharedModule } from 'src/app/shared/shared.module';
import { Trainerschedule } from './schedules-module';
import { TrainerScheduleAPIService } from './api.schedules';
import { SweetAlertService } from 'src/app/services/sweet-alert-service/sweet-alert-service';
import { Trainingcourse } from 'src/app/services/types/Trainingcourse';
import { MatDialog } from '@angular/material/dialog';
import { SendMeetingLinkComponent } from '../send-meeting-link/send-meeting-link.component';

export interface ODataResponse<T> {
  value: T[];
}

@Component({
  selector: 'app-schedules',
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: './schedules.component.html',
  styleUrl: './schedules.component.css',
})
export class SchedulesComponent {
  readonly dialog = inject(MatDialog);
  trainersCourses: Trainingcourse[] = [];

  constructor(
    private router: Router,
    private location: Location,
    private apiTrainerScheduleservice: TrainerScheduleAPIService,
    private sweetAlertService: SweetAlertService
  ) {
    // this.generateColumns();
  }

  displayedColumns: string[] = [
    'Id',
    'ScheduleType',
    'StartDate',
    'EndDate',
    'CompanyId',
    'ScheduleName',
    'CourseId',
    'TrainerId',
    'Actions',
    // "StudentId",
  ];
  columns = [
    { key: 'Id', label: 'Id' },
    { key: 'ScheduleType', label: 'Schedule Type' },
    { key: 'StartDate', label: 'Start Date' },
    { key: 'EndDate', label: 'End Date' },
    { key: 'CompanyId', label: 'Company Name' },
    { key: 'ScheduleName', label: 'Schedule Name' },
    { key: 'CourseId', label: 'Course Name' },
    { key: 'TrainerId', label: 'Trainer Name' },
    // { key: "StudentId", label: "Student Name" },
    { key: 'Actions', label: 'Actions' },
  ];

  dataSource = new MatTableDataSource<Trainerschedule>([]);

  openAddEditScheduleForm(scheduleId?: number) {
    if (scheduleId != undefined) {
      this.router.navigate(['training-configuration/schedules', scheduleId]);
    } else {
      this.router.navigate(['training-configuration/schedules', 0]);
    }
  }

  openTrainingAttendance() {
    {
      this.router.navigate(['training-configuration/ts-attendance']);
    }
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.loadTrainerScheduleData();
    this.getAllTrainingCourses();
  }

  loadTrainerScheduleData() {
    this.apiTrainerScheduleservice.loadTrainerScheduleData().subscribe({
      next: (response: ODataResponse<any>) => {
        console.log('API Response:', response);
        this.dataSource.data = response.value;
      },
      error: (error) => {
        console.error('Error loading Trainer Schedule', error);
      },
    });
  }

  openDialog(row: any): void {
    const dialogRef = this.dialog.open(SendMeetingLinkComponent, {
      width: '500px',
      data: {
        course: 'Course 1',
        trainer: 'Anjali',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Dialog closed with data:', result);
        // Handle post-dialog actions here
      }
    });
  }
  // getAllTrainingCourses(): void {
  //   this.apiTrainerScheduleservice.loadAllTrainingCourses().subscribe({
  //     next: (response: ODataResponse<Trainingcourse>) => {
  //       this.trainersCourses = response.value;
  //       console.log('training courses:', response);
  //     },
  //     error: (error) => {
  //       console.error('Error loading training courses', error);
  //     },
  //   });
  // }

  getAllTrainingCourses() {
    this.apiTrainerScheduleservice.loadAllTrainingCourses().subscribe({
      next: (response: ODataResponse<any>) => {
        console.log('API Response:', response);
        this.trainersCourses = response.value;
      },
      error: (error) => {
        console.error('Error loading training courses', error);
      },
    });
  }

  async deleteTrainerSchedule(id: number) {
    const confirmed = await this.sweetAlertService.confirmDelete(
      'Do you really want to delete this trainer schedule?'
    );

    if (confirmed) {
      this.apiTrainerScheduleservice.deleteTrainerSchedule(id).subscribe({
        next: (response: { success: boolean; message: string }) => {
          if (response.success) {
            this.sweetAlertService.success(response.message);
            this.loadTrainerScheduleData();
          } else {
            this.sweetAlertService.error(response.message);
          }
        },
        error: (error) => {
          this.sweetAlertService.error(
            'An unexpected error occurred while deleting the trainer schedule.'
          );
          console.error('Error deleting trainer schedule:', error);
        },
      });
    }
  }
}
