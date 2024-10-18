import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SimpleDonutChartComponent } from '../../charts/pie chart/simple-donut-chart/simple-donut-chart.component';
import { SimplePieChartComponent } from '../../charts/pie chart/simple-pie-chart/simple-pie-chart.component';
import { HpStackedColumnchartComponent } from '../../charts/column chart/hp-stacked-columnchart/hp-stacked-columnchart.component';
import { StackedColumnChartComponent } from '../../charts/column chart/stacked-column-chart/stacked-column-chart.component';
import { ColumnChartDatalabelsComponent } from '../../charts/column chart/column-chart-datalabels/column-chart-datalabels.component';
import { BasicColumnChartComponent } from '../../charts/column chart/basic-column-chart/basic-column-chart.component';
import { BasicLineChartComponent } from '../../charts/line chart/basic-line-chart/basic-line-chart.component';
import { FunnelChartComponent } from '../../charts/funnel chart/funnel-chart/funnel-chart.component';

@Component({
  selector: 'app-company-dashboard',
  standalone: true,
  imports: [
    BasicLineChartComponent,
    BasicColumnChartComponent,
    ColumnChartDatalabelsComponent,
    StackedColumnChartComponent,
    HpStackedColumnchartComponent,
    SimplePieChartComponent,
    SimpleDonutChartComponent,
    FunnelChartComponent,
    CommonModule,
    SharedModule,
  ],
  templateUrl: './company-dashboard.component.html',
  styleUrl: './company-dashboard.component.css',
})
export class CompanyDashboardComponent implements OnInit {
  HRName = 'Vidyashree';
  jobRoles: string[] = ['Developer', 'Designer', 'Manager', 'QA'];

  years: string[] = ['2021-22', '2022-23', '2023-24', '2024-25'];
  noOfJobRolesOpenings: number[] = [];
  jobRoleNames: string[] = [];

  upcomingDrives = [
    {
      date: new Date('2024-10-20'),
      jobRole: 'Developer',
      venue: 'On Campus, Main Hall',
      round: 'Technical Round',
    },
    {
      date: new Date('2024-10-22'),
      jobRole: 'UI/UX Designer',
      venue: 'Online, Main Hall',
      round: 'Technical Round',
    },
    {
      date: new Date('2024-10-22'),
      jobRole: 'Software Engineer',
      venue: 'On Campus, Main Hall',
      round: 'HR Round',
    },
  ];
  notifications = [
    {
      title: 'Interview Reminder',
      details:
        'Reminder: Your interview with John Doe for the Software Engineer position is scheduled for October 15th at 10:00 AM.',
    },
    {
      title: 'New Candidate Application',
      details:
        'You have received a new application for the Data Scientist position. Please review it at your earliest convenience.',
    },
    {
      title: 'Team Meeting Scheduled',
      details:
        'Reminder: All hands meeting scheduled for October 18th at 3:00 PM to discuss hiring targets and team updates.',
    },
    {
      title: 'Offer Letter Issued',
      details:
        'Offer letter has been sent to Sarah Parker for the UX Designer position. Awaiting her response.',
    },
  ];

  interviewSchedule = [
    {
      date: new Date('2024-10-20'),
      time: '10:00 AM',
      position: 'Software Engineer',
      candidate: 'Alice Johnson',
    },
    {
      date: new Date('2024-10-22'),
      time: '1:00 PM',
      position: 'Product Manager',
      candidate: 'David Smith',
    },
    {
      date: new Date('2024-10-22'),
      time: '2:30 PM',
      position: 'Data Analyst',
      candidate: 'Jessica Lee',
    },
    {
      date: new Date('2024-10-22'),
      time: '3:30 PM',
      position: 'UX Designer',
      candidate: 'Michael Brown',
    },
  ];

  openings: any = [
    {
      name: 'No. of Openings',
      data: [30, 20, 10, 40],
    },
  ];

  chartTitle: string = 'Openings by Job Role';
  xAxisLabel: string = 'Job Roles';
  yAxisLabel: string = 'Number of Openings';

  studentIntakeByCollege(): void {}
  employeeIntakes: any = [
    {
      name: 'Male',
      data: [120, 150, 90, 100],
    },
    {
      name: 'Female',
      data: [120, 150, 90, 100],
    },
  ];
  colleges: string[] = [
    'E-W Col of Tech.',
    'E-W Col of Engg.',
    'E-W Col of Management',
    'E-W Col of Architecture',
  ];

  inTakeChartTitle: string = 'Student Intake by College';
  inTakexAxisLabel: string = 'College Names';
  inTakeyAxisLabel: string = 'Number of Students';

  ngOnInit(): void {
    this.jobRoleWiseOpenings();
  }

  jobRoleWiseOpenings(): void {
    this.noOfJobRolesOpenings = [120, 50, 80, 90, 50];
    this.jobRoleNames = [
      'Software Developer',
      'Data Scientist',
      'Full Stack Developer',
      'Mobile Application Developer',
      'Cloud Engineer',
    ];
  }
}
