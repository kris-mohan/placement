import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AMGModules } from 'src/AMG-Module/AMG-module';
import { BasicColumnChartComponent } from 'src/app/features/charts/column chart/basic-column-chart/basic-column-chart.component';
import { ColumnChartDatalabelsComponent } from 'src/app/features/charts/column chart/column-chart-datalabels/column-chart-datalabels.component';
import { StackedColumnChartComponent } from 'src/app/features/charts/column chart/stacked-column-chart/stacked-column-chart.component';
import { HpStackedColumnchartComponent } from 'src/app/features/charts/column chart/hp-stacked-columnchart/hp-stacked-columnchart.component';
import { SimplePieChartComponent } from 'src/app/features/charts/pie chart/simple-pie-chart/simple-pie-chart.component';
import { SimpleDonutChartComponent } from 'src/app/features/charts/pie chart/simple-donut-chart/simple-donut-chart.component';
import { BasicLineChartComponent } from 'src/app/features/charts/line chart/basic-line-chart/basic-line-chart.component';

@Component({
  selector: 'app-placement-dashboard',
  standalone: true,
  imports: [
    BasicLineChartComponent,
    BasicColumnChartComponent,
    ColumnChartDatalabelsComponent,
    StackedColumnChartComponent,
    HpStackedColumnchartComponent,
    SimplePieChartComponent,
    SimpleDonutChartComponent,
    CommonModule,
    SharedModule,
    AMGModules,
  ],
  templateUrl: './placement-dashboard.component.html',
  styleUrl: './placement-dashboard.component.css',
})
export class PlacementDashboardComponent implements OnInit {
  studentYearlySeries: any[] = [];
  yearsLabels: string[] = [];
  studentPlacementData: any[] = [];
  companiesLabels: string[] = [];
  studentPlacementSeries: any[] = [];
  placementCategories: string[] = [];
  branchPlacementSeries: number[] = [];
  branchLabels: string[] = [];
  placementOfficerName = 'Ramesh Sharma';
  genderWiseStudentData: any[] = [];
  availableYears: string[] = ['2022', '2023', '2024'];
  selectedYears: string[] = [];
  totalOffers = 50;
  interviewData: any[] = [];
  companyLabels: string[] = [];
  yearlyComparisonData: any[] = [];
  yearLabels: string[] = [];

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

  upcomingDrives = [
    {
      company: 'Tata Consultancy Services (TCS)',
      date: new Date('2024-10-20'),
      jobRole: 'Developer',
      venue: 'On Campus, Main Hall',
      round: 'Technical Round',
    },
    {
      company: 'Wipro',
      date: new Date('2024-10-22'),
      jobRole: 'UI/UX Designer',
      venue: 'Online, Main Hall',
      round: 'Technical Round',
    },
    {
      company: 'IBM',
      date: new Date('2024-10-22'),
      jobRole: 'Software Engineer',
      venue: 'On Campus, Main Hall',
      round: 'HR Round',
    },
  ];

  sendInvite() {
    console.log('Invite sent to companies');
  }
  ngOnInit(): void {
    const apiCall = async () => {
      this.studentYearlySeries = [
        {
          name: 'High - 2023',
          data: [30, 32, 35, 38, 36, 34, 32],
        },
        {
          name: 'Low - 2023',
          data: [25, 16, 18, 20, 19, 17, 16],
        },
      ];
      this.yearsLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    };
    apiCall();

    const genderWisePlacedStudents = async () => {
      this.studentPlacementData = [
        {
          name: 'Male',
          data: [120, 80, 100, 90, 75],
        },
        {
          name: 'Female',
          data: [30, 50, 40, 60, 55],
        },
      ];
      this.branchLabels = ['CS', 'IS', 'EC', 'ME', 'CV'];
    };
    genderWisePlacedStudents();

    const interviewDataByCompanies = async () => {
      this.interviewData = [
        {
          name: 'Aptitude Round',
          data: [50, 30, 45, 55, 40],
        },
        {
          name: 'Group Discussion',
          data: [20, 30, 25, 35, 40],
        },
        {
          name: 'Technical Round 1',
          data: [40, 50, 30, 60, 45],
        },
        {
          name: 'Technical Round 2',
          data: [10, 35, 12, 16, 15],
        },
        {
          name: 'HR Interview',
          data: [20, 30, 25, 35, 40],
        },
      ];
      this.companyLabels = [
        'Softserve Global',
        'TCS',
        'Wipro',
        'Capgemini',
        'Accenture',
      ];
    };
    interviewDataByCompanies();

    const companyWisePlacementData = async () => {
      this.studentPlacementSeries = [
        {
          name: 'Company A',
          data: [10, 20, 30, 40, 50, 60],
        },
        {
          name: 'Company B',
          data: [15, 25, 35, 45, 55, 65],
        },
        {
          name: 'Company C',
          data: [20, 30, 40, 50, 60, 70],
        },
        {
          name: 'Company D',
          data: [20, 30, 10, 15, 15, 10],
        },
      ];

      this.placementCategories = [
        'IT',
        'EC-core',
        'Mech-core',
        'Tech',
        'Non-Tech',
        'Sales',
      ];
    };
    companyWisePlacementData();

    const yearlyComparisonDataSetup = async () => {
      this.yearlyComparisonData = [
        {
          name: '2020-21',
          data: [100, 90, 80, 120, 110, 66],
        },
        {
          name: '2021-22',
          data: [110, 85, 90, 115, 120, 51],
        },
        {
          name: '2022-23',
          data: [130, 55, 50, 15, 20, 20],
        },
        {
          name: '2023-24',
          data: [70, 95, 60, 45, 30, 79],
        },
        {
          name: '2024-25',
          data: [60, 65, 67, 35, 105, 19],
        },
      ];

      this.yearLabels = ['CS', 'IS', 'EC', 'ME', 'CV', 'MBA'];
    };
    yearlyComparisonDataSetup();

    const branchWisePlacementStatus = async () => {
      this.branchPlacementSeries = [120, 150, 80, 90, 50];
      this.branchLabels = ['CS', 'IS', 'EC', 'ME', 'CV'];
    };
    branchWisePlacementStatus();
  }
}
