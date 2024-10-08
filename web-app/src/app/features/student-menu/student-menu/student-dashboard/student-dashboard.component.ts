import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AMGModules } from 'src/AMG-Module/AMG-module';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css',
})
export class StudentDashboardComponent {
  studentName = 'John Doe';

  stats = {
    applicationsSent: 10,
    interviewsAttended: 5,
    offersReceived: 2,
  };

  jobApplications = [
    {
      company: 'Google LLC',
      jobRole: 'Software Engineer',
      salary: '7,00,000 INR PER ANNUM',
      interviewDate: new Date('2024-10-20'),
      status: 'Selected to next round',
    },
    {
      company: 'Microsoft Corporation',
      jobRole: 'Data Analyst',
      interviewDate: new Date('2024-10-22'),
      status: 'Rejected',
    },
    {
      company: 'Amazon.com, Inc',
      jobRole: 'Data Analyst',
      interviewDate: new Date('2024-10-22'),
      status: 'In-progress',
    },
    {
      company: 'Apple Inc.',
      jobRole: 'Data Analyst',
      interviewDate: new Date('2024-10-22'),
      status: 'Selected to next round',
    },
    {
      company: 'Infosys Limited',
      jobRole: 'Data Analyst',
      interviewDate: new Date('2024-10-22'),
      status: 'In-progress',
    },
    {
      company: 'Tata Consultancy Services (TCS)',
      jobRole: 'Data Analyst',
      interviewDate: new Date('2024-10-22'),
      status: 'Rejected',
    },
  ];

  notifications = [
    {
      title: 'Reminder',
      details: 'Your interview with Microsoft Corporation is on October 12nd.',
    },
    {
      title: 'New Job Posting',
      details: 'Softserve Global is hiring for Software Engineer roles.',
    },
    {
      title: 'New Job Posting',
      details: 'Softserve Global posted today!',
    },
    {
      title: 'New Job Posting',
      details: 'Capgemeni is hiring for Software Engineer roles.',
    },
  ];

  interviewSchedule = [
    {
      company: 'Tata Consultancy Services (TCS)',
      date: new Date('2024-10-20'),
      time: '10:00 AM',
    },
    { company: 'Adobe Inc.', date: new Date('2024-10-22'), time: '1:00 PM' },
    {
      company: 'Flipkart Online Services Pvt. Ltd.',
      date: new Date('2024-10-22'),
      time: '1:00 PM',
    },
    { company: 'Capgemini SE', date: new Date('2024-10-22'), time: '1:00 PM' },
  ];

  getStatusClass(status: string): string {
    switch (status) {
      case 'In-progress':
        return 'in-progress';
      case 'Rejected':
        return 'rejected';
      case 'Selected to next round':
        return 'selected';
      default:
        return '';
    }
  }
}
