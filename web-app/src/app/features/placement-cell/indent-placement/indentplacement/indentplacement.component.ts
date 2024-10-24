import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AMGModules } from 'src/AMG-Module/AMG-module';
import { DialogMessageService } from 'src/app/services/dialog-message/dialog-message/dialog-message.service';
import { SweetAlertService } from 'src/app/services/sweet-alert-service/sweet-alert-service';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarEventAPIService } from '../../../campus-configuration/campus-configuration/calendar-events/api.calendar.events';
import { MatTableDataSource } from '@angular/material/table';
import { IndentData } from '../../../company-menu/indent-requirements/indentview/indentview.component.model';
import { ODataResponse } from '../../../company-menu/indent-requirements/indentview/indentview.component';
import { IndentPlacementApiService } from '../IndentPlacementApiService';
import { IndentForm } from 'src/app/services/types/IndentForm';

@Component({
  selector: 'app-indentplacement',
  standalone: true,
  imports: [AMGModules, CommonModule, SharedModule],
  templateUrl: './indentplacement.component.html',
  styleUrl: './indentplacement.component.css',
})
export class IndentplacementComponent {
  UserRoleId: number;
  constructor(
    private router: Router,
    private sweetAlertService: SweetAlertService,
    private APICalendarEventsService: CalendarEventAPIService,
    private indentApiService: IndentPlacementApiService
  ) {
    this.generateColumns();
    const storedUserRoleId = sessionStorage.getItem('userRoleId');
    this.UserRoleId = storedUserRoleId ? parseInt(storedUserRoleId) : 0;
  }
  // IndentData = [
  //   {
  //     CompanyDesignation: '',
  //     studentsCleared: 12,
  //     studentsRejected: 15,
  //     PhoneNo: 2345678,
  //     RequiredItem: 'Sheets',
  //     Quatity: 34,
  //     CompanyName: 'google',

  //     EmailAddress: 'abcgmailcom',
  //   },
  //   {
  //     id: 2,
  //     jobTitle: 'Data Scientist',
  //     company: 'Facebook',
  //     date: '2024-09-28',
  //     status: 'Upcoming',
  //     postedDate: '2024-07-01',
  //     applicationDeadline: new Date('2024-08-01'),
  //     jobDescription:
  //       "This is the first assessment to test the candidate's programming and problem-solving skills.",
  //     roundName: 'Test Assesment 2',
  //     studentsCleared: 12,
  //     studentsRejected: 15,
  //     PhoneNo: 2345678,
  //     RequiredItem: 'Stationary',
  //     Quatity: 4,
  //     CompanyName: 'google',
  //     CompanyDesignation: '',
  //     EmailAddress: 'abcgmailcom',
  //   },
  //   {
  //     id: 3,
  //     jobTitle: 'Product Manager',
  //     company: 'Amazon',
  //     date: '2024-09-27',
  //     status: 'Completed',
  //     postedDate: '2024-07-01',
  //     applicationDeadline: new Date('2024-08-01'),
  //     jobDescription:
  //       'The second assessment focuses on data science challenges and machine learning algorithms.',

  //     roundName: 'Test Assesment 3',
  //     studentsCleared: 12,
  //     studentsRejected: 15,
  //     PhoneNo: 2345678,
  //     RequiredItem: 'Sheets',
  //     Quatity: 3,
  //     CompanyName: 'google',
  //     CompanyDesignation: '',
  //     EmailAddress: 'abcgmailcom',
  //   },
  //   {
  //     id: 4,
  //     jobTitle: 'Web Developer',
  //     company: 'Microsoft',
  //     date: '2024-09-29',
  //     status: '',
  //     postedDate: '2024-07-01',
  //     applicationDeadline: new Date('2024-08-01'),
  //     jobDescription:
  //       "This assessment evaluates the candidate's ability to manage products and handle business cases.",

  //     roundName: 'Technical Interview',
  //     studentsCleared: 12,
  //     studentsRejected: 15,
  //     EmailAddress: 'abcgmailcom',
  //   },
  //   {
  //     id: 5,
  //     jobTitle: 'UI/UX Designer',
  //     company: 'Apple',
  //     date: '2024-09-26',
  //     status: 'Ongoing',
  //     postedDate: '2024-07-01',
  //     applicationDeadline: new Date('2024-08-01'),
  //     jobDescription:
  //       'A technical interview to assess coding skills, system design, and problem-solving ability.',

  //     roundName: 'HR Interview',
  //     studentsCleared: 12,
  //     studentsRejected: 15,
  //     PhoneNo: 2345678989,
  //     RequiredItem: 'pens',
  //     Quatity: 10,
  //     CompanyName: 'google',
  //     CompanyDesignation: '',
  //     EmailAddress: 'abc@gmailcom',
  //   },
  // ];
  universityTypes: string[] = [
    'Visvesvaraya Technological University (VTU)',
    'Deemed University',
    'Autonomous University',
  ];

  colleges: string[] = ['East west college', 'East west technology'];
  selectedUniversityType: string = '';
  selectedCollegeName: string = '';
  filteredColleges: string[] = [];

  IndentData: IndentForm[] = [];

  jobSummary = [
    { jobTitle: 'Software Engineer', studentsCount: 1 },
    { jobTitle: 'Data Scientist', studentsCount: 1 },
    { jobTitle: 'Product Manager', studentsCount: 1 },
    { jobTitle: 'Web Developer', studentsCount: 1 },
    { jobTitle: 'UI/UX Designer', studentsCount: 1 },
  ];
  displayedColumns: string[] = [
    'Department',
    'Address',
    'Designation',
    'EmailAddress',
    'Actions',
  ];

  goToInterviewStudentsDetails(id: number) {
    if (this.UserRoleId === 1 || this.UserRoleId === 2) {
      this.router.navigate(['interview/interview-students-list', id]);
    }
  }
  // columns = [
  // { key: "indentId", label: "Round ID" },
  // { key: "Department", label: "Department" },
  // { key: "Address", label: "Address" },
  // { key: "Designation", label: "Designation" },
  // { key: "EmailAddress", label: "Email Address" },
  // { key: "actions", label: "Actions" },
  // ];

  columns: { key: string; label: string }[] = [];
  dataSource = new MatTableDataSource<IndentForm>([]);

  generateColumns(): void {
    this.displayedColumns.forEach((column) => {
      this.columns.push({
        key: column,
        label: this.formatLabel(column),
      });
    });
  }

  // onUniversityTypeChange(event: any) {
  //   const selectedUniversity = event.value;
  //   this.filteredColleges = this.colleges[selectedUniversity];
  // }

  onCollegeNameChange(event: any) {
    this.selectedCollegeName = event.value;
  }

  formatLabel(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  }

  openAddEditIndentForm(id?: string) {
    if (id !== undefined) {
      this.router.navigate(['/indent-requirement', id]);
    } else {
      this.router.navigate(['/indent-requirement', '']);
    }
  }

  ngOnInit() {
    this.loadCalendarEventData();
    this.getAllIndents();
  }

  loadCalendarEventData() {
    this.APICalendarEventsService.loadCalendarEventData().subscribe({
      next: (response: ODataResponse<any>) => {
        console.log('API Response:', response);
        this.dataSource.data = response.value;
      },
      error: (error) => {
        console.error('Error loading Calendar Event', error);
      },
    });
  }

  async deleteCalendarEvent(id: number) {
    const confirmed = await this.sweetAlertService.confirmDelete(
      'Do you really want to delete this Calendar Event?'
    );

    if (confirmed) {
      this.APICalendarEventsService.deleteCalendarEvent(id).subscribe({
        next: (response: { success: boolean; message: string }) => {
          if (response.success) {
            this.sweetAlertService.success(response.message);
            this.loadCalendarEventData();
          } else {
            this.sweetAlertService.error(response.message);
          }
        },
        error: (error) => {
          this.sweetAlertService.error(
            'An unexpected error occurred while deleting the Calendar Event.'
          );
          console.error('Error deleting Calendar Event:', error);
        },
      });
    }
  }

  // goBack(): void {
  //   this.location.back();
  // }

  getAllIndents = () => {
    this.indentApiService.GetAllIndents().subscribe({
      next: (response) => {
        const data: IndentForm[] = response.value;
        this.dataSource.data = data.map((indent: IndentForm) => ({
          Id: indent.Id,
          CompanyName: indent.CompanyName,
          ContactPersonName: indent.ContactPersonName,
          ContactPersonDesignation: indent.ContactPersonDesignation || '',
          PhoneNumber: indent.PhoneNumber || '',
          Email: indent.Email || '',
          IndentFormDynamicFields: indent.IndentFormDynamicFields,
          RequiredItem: indent.IndentFormDynamicFields?.Value || '',
          Quatity: indent.IndentFormDynamicFields?.Name || 0,
          studentsCleared: 0,
          studentsRejected: 0,
          roundName: '',
        }));
      },
      error: (error) => {
        console.log('Error fetching indents: ', error);
      },
    });
  };

  convertToDateOnly(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }
}
