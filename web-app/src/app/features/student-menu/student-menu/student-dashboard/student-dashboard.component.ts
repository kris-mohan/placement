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
    },
    {
      company: 'Microsoft Corporation',
      jobRole: 'Data Analyst',
      salary: '8,65,000 INR PER ANNUM',
      interviewDate: new Date('2024-10-22'),
    },
    {
      company: 'Amazon.com, Inc',
      jobRole: 'Data Analyst',
      salary: '9.00,000 INR PER ANNUM',
      interviewDate: new Date('2024-10-22'),
    },
    {
      company: 'Apple Inc.',
      jobRole: 'Data Analyst',
      salary: '6,00,000 INR PER ANNUM',
      interviewDate: new Date('2024-10-22'),
    },
    {
      company: 'Infosys Limited',
      jobRole: 'Data Analyst',
      salary: '4,00,000 - 8,50,000 INR PER ANNUM',
      interviewDate: new Date('2024-10-22'),
    },
    {
      company: 'Tata Consultancy Services (TCS)',
      jobRole: 'Data Analyst',
      salary: '5,00,000 INR PER ANNUM',
      interviewDate: new Date('2024-10-22'),
    },
  ];

  notifications = [
    {
      title: 'Reminder',
      details: 'Your interview with Microsoft Corporation is on October 12nd.',
    },
    {
      title: 'New Job Posting',
      details: 'ABC Corp is hiring for Software Engineer roles.',
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
}
