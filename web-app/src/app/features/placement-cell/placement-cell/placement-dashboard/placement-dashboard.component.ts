import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { BasicColumnChartComponent } from "src/app/features/charts/column chart/basic-column-chart/basic-column-chart.component";
import { ColumnChartDatalabelsComponent } from "src/app/features/charts/column chart/column-chart-datalabels/column-chart-datalabels.component";
import { StackedColumnChartComponent } from "src/app/features/charts/column chart/stacked-column-chart/stacked-column-chart.component";
import { HpStackedColumnchartComponent } from "src/app/features/charts/column chart/hp-stacked-columnchart/hp-stacked-columnchart.component";
import { SimplePieChartComponent } from "src/app/features/charts/pie chart/simple-pie-chart/simple-pie-chart.component";
import { SimpleDonutChartComponent } from "src/app/features/charts/pie chart/simple-donut-chart/simple-donut-chart.component";
import { BasicLineChartComponent } from "src/app/features/charts/line chart/basic-line-chart/basic-line-chart.component";
import { PlacementDashboardApiService } from "./PlacementDashboardApiService";
import { NotificationsApiService } from "src/app/features/student-menu/student-menu/profile-management/profilemanagement-dashboard/NotificationsAPIService";
import { notification } from "src/app/services/types/Notifications";

@Component({
  selector: "app-placement-dashboard",
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

  templateUrl: "./placement-dashboard.component.html",
  styleUrl: "./placement-dashboard.component.css",
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
  placementOfficerName = "Ramesh Sharma";
  genderWiseStudentData: any[] = [];
  availableYears: string[] = ["2022", "2023", "2024"];
  selectedYears: string[] = [];
  totalOffers = 50;
  interviewData: any[] = [];
  companyLabels: string[] = [];
  yearlyComparisonData: any[] = [];
  yearLabels: string[] = [];
  topHiringCompaniesData: any[] = [];
  topCompanyYearLabels: string[] = [];
  skillDemandData: any[] = [];
  skillLabels: string[] = [];
  courseLabels: string[] = [];
  placementTrendData: any[] = [];
  timeLabels: string[] = [];
  monthlyTrendsData: any[] = [];
  monthLabels: string[] = [];
  batchPlacementData: any[] = [];
  batchLabels: string[] = [];
  unplacedStudentsData: string[] = [];
  placementStatusData: any[] = [];
  statusLabels: string[] = [];
  userRoleId: number = 0;

  constructor(
    private placementApiService: PlacementDashboardApiService,
    private notificationApiService: NotificationsApiService
  ) {
    const storedUserRoleId = sessionStorage.getItem("CampusId");
    this.userRoleId = storedUserRoleId ? parseInt(storedUserRoleId) : 0;
  }

  // notifications = [
  //   {
  //     title: "Interview Reminder",
  //     details:
  //       "Reminder: Your interview with John Doe for the Software Engineer position is scheduled for October 15th at 10:00 AM.",
  //   },
  //   {
  //     title: "New Candidate Application",
  //     details:
  //       "You have received a new application for the Data Scientist position. Please review it at your earliest convenience.",
  //   },
  //   {
  //     title: "Team Meeting Scheduled",
  //     details:
  //       "Reminder: All hands meeting scheduled for October 18th at 3:00 PM to discuss hiring targets and team updates.",
  //   },
  //   {
  //     title: "Offer Letter Issued",
  //     details:
  //       "Offer letter has been sent to Sarah Parker for the UX Designer position. Awaiting her response.",
  //   },
  // ];

  notifications: notification[] = [];

  interviewSchedule = [
    {
      date: new Date("2024-10-20"),
      time: "10:00 AM",
      position: "Software Engineer",
      candidate: "Alice Johnson",
    },
    {
      date: new Date("2024-10-22"),
      time: "1:00 PM",
      position: "Product Manager",
      candidate: "David Smith",
    },
    {
      date: new Date("2024-10-22"),
      time: "2:30 PM",
      position: "Data Analyst",
      candidate: "Jessica Lee",
    },
    {
      date: new Date("2024-10-22"),
      time: "3:30 PM",
      position: "UX Designer",
      candidate: "Michael Brown",
    },
  ];

  upcomingDrives = [
    {
      company: "Tata Consultancy Services (TCS)",
      date: new Date("2024-10-20"),
      jobRole: "Developer",
      venue: "On Campus, Main Hall",
      round: "Technical Round",
    },
    {
      company: "Wipro",
      date: new Date("2024-10-22"),
      jobRole: "UI/UX Designer",
      venue: "Online, Main Hall",
      round: "Technical Round",
    },
    {
      company: "IBM",
      date: new Date("2024-10-22"),
      jobRole: "Software Engineer",
      venue: "On Campus, Main Hall",
      round: "HR Round",
    },
    {
      company: "Tata Consultancy Services (TCS)",
      date: new Date("2024-10-20"),
      jobRole: "Developer",
      venue: "On Campus, Main Hall",
      round: "Technical Round",
    },
    {
      company: "Tata Consultancy Services (TCS)",
      date: new Date("2024-10-20"),
      jobRole: "Developer",
      venue: "On Campus, Main Hall",
      round: "Technical Round",
    },
  ];

  sendInvite() {
    console.log("Invite sent to companies");
  }
  ngOnInit(): void {
    this.apiCall();
    this.genderWisePlacedStudents();
    this.interviewDataByCompanies();
    this.companyWisePlacementData();
    this.yearlyComparisonDataSetup();
    this.GetTopHiringCompaniesData();
    this.setupSkillDemandData();
    this.branchWisePlacementStatus();
    this.monthlyPlacementTrends();
    this.getNotification();
  }

  apiCall = async () => {
    this.studentYearlySeries = [
      {
        name: "High - 2023",
        data: [30, 32, 35, 38, 36, 34, 32],
      },
      {
        name: "Low - 2023",
        data: [25, 16, 18, 20, 19, 17, 16],
      },
    ];
    this.yearsLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  };

  // genderWisePlacedStudents = async () => {
  //   this.studentPlacementData = [
  //     {
  //       name: 'Male',
  //       data: [120, 80, 100, 90, 75],
  //     },
  //     {
  //       name: 'Female',
  //       data: [30, 50, 40, 60, 55],
  //     },
  //   ];
  //   this.branchLabels = ['CS', 'IS', 'EC', 'ME', 'CV'];
  // };

  genderWisePlacedStudents(): void {
    this.placementApiService.GetPlacementsByGender().subscribe({
      next: (response: any) => {
        this.studentPlacementData = response.studentPlacementData || [];
        this.branchLabels = response.branchLabels || [];
      },
      error: (err: any) => {
        console.error("Error fetching Gender-Wise Placement", err);
      },
    });
  }

  interviewDataByCompanies = async () => {
    this.interviewData = [
      {
        name: "Aptitude Round",
        data: [50, 30, 45, 55, 40],
      },
      {
        name: "Group Discussion",
        data: [20, 30, 25, 35, 40],
      },
      {
        name: "Technical Round 1",
        data: [40, 50, 30, 60, 45],
      },
      {
        name: "Technical Round 2",
        data: [10, 35, 12, 16, 15],
      },
      {
        name: "HR Interview",
        data: [20, 30, 25, 35, 40],
      },
    ];
    this.companyLabels = [
      "Softserve Global",
      "TCS",
      "Wipro",
      "Capgemini",
      "Accenture",
    ];
  };

  companyWisePlacementData = async () => {
    this.placementApiService.GetStudentPlacementData().subscribe({
      next: (response: any) => {
        this.placementCategories = response.placementCategories || [];
        this.studentPlacementSeries = response.studentPlacementSeries || [];
      },
      error: (err: any) => {
        console.error("Error fetching branch placements:", err);
      },
    });
  };

  yearlyComparisonDataSetup = async () => {
    this.placementApiService.GetYearlyPlacements().subscribe({
      next: (response: any) => {
        this.yearlyComparisonData = response.yearlyComparisonData || [];
        this.courseLabels = response.courseLabels || [];
      },
      error: (err: any) => {
        console.error("Error fetching yearly data:", err);
      },
    });
  };

  GetTopHiringCompaniesData = async () => {
    this.placementApiService.GetTopCompanies().subscribe({
      next: (response: any) => {
        this.topHiringCompaniesData = response.topHiringCompaniesData || [];
        this.companyLabels = response.companyLabels || [];
      },
      error: (err: any) => {
        console.error("Error fetching skill:", err);
      },
    });
  };

  setupSkillDemandData(): void {
    this.placementApiService.GetSkillDemand().subscribe({
      next: (response: any) => {
        this.skillDemandData = response.skillDemandData || [];
        this.skillLabels = response.skillLabels || [];
      },
      error: (err: any) => {
        console.error("Error fetching skill:", err);
      },
    });
  }

  monthlyPlacementTrends(): void {
    this.placementApiService.GetMonthlyPlacementTrends().subscribe({
      next: (response: any) => {
        this.monthlyTrendsData = response.monthlyTrendsData || [];
        this.monthLabels = response.monthLabels || [];
      },
      error: (err: any) => {
        console.error("Error fetching mo thly placement trends:", err);
      },
    });
  }

  getTopCompanies(): void {
    this.placementApiService.GetTopCompanies().subscribe({
      next: (response: any) => {
        this.topHiringCompaniesData = response.topHiringCompaniesData || [];
        this.companyLabels = response.companyLabels || [];
      },
      error: (err: any) => {
        console.error("Error fetching skill:", err);
      },
    });
  }

  getBatchWisePlacements(): void {
    this.placementApiService.GetBatchWisePlacements().subscribe({
      next: (response: any) => {
        this.batchPlacementData = response.batchPlacementData || [];
        this.batchLabels = response.batchLabels || [];
      },
      error: (err: any) => {
        console.error("Error fetching skill:", err);
      },
    });
  }

  getPlacementStatus(): void {
    this.placementApiService.GetPlacementStatusSummary().subscribe({
      next: (response: any) => {
        this.placementStatusData = response.placementStatusData || [];
        this.statusLabels = response.statusLabels || [];
      },
      error: (err: any) => {
        console.error("Error fetching skill:", err);
      },
    });
  }

  // setupPlacementTrendData = async () => {
  //   this.placementTrendData = [
  //     {
  //       name: 'Drives Conducted',
  //       data: [5, 7, 10, 8, 15, 12, 17], // Example monthly data
  //     },
  //     {
  //       name: 'Students Registered',
  //       data: [200, 250, 300, 280, 350, 400, 420],
  //     },
  //     {
  //       name: 'Students Placed',
  //       data: [150, 180, 220, 200, 250, 290, 310],
  //     },
  //   ];

  //   this.timeLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  // };

  branchWisePlacementStatus(): void {
    this.placementApiService.GetBranchPlacements().subscribe({
      next: (response: any) => {
        this.branchPlacementSeries = response.branchPlacementSeries || [];
        this.branchLabels = response.branchLabels || [];
      },
      error: (err: any) => {
        console.error("Error fetching branch placements:", err);
      },
    });
  }
  getNotification() {
    this.notificationApiService
      .GetNotificationForCampusId(this.userRoleId)
      .subscribe({
        next: (response: any) => {
          this.notifications = response.value;
        },
        error: (err: any) => {
          console.error("Error:No Notification", err);
        },
      });
  }
}
