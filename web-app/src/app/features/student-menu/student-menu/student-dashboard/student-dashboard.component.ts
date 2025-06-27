import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { notification } from "src/app/services/types/Notifications";
import { SharedModule } from "src/app/shared/shared.module";
import { NotificationsApiService } from "../profile-management/profilemanagement-dashboard/NotificationsAPIService";

@Component({
  selector: "app-student-dashboard",
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: "./student-dashboard.component.html",
  styleUrl: "./student-dashboard.component.css",
})
export class StudentDashboardComponent {
  studentName = "John Doe";
  userRoleId: number = 0;

  stats = {
    applicationsSent: 10,
    interviewsAttended: 5,
    offersReceived: 3,
  };

  jobApplications = [
    {
      company: "Google LLC",
      jobRole: "Software Engineer",
      salary: "7,00,000 INR PER ANNUM",
      interviewDate: new Date("2024-10-20"),
      status: "Selected to next round",
    },
    {
      company: "Microsoft Corporation",
      jobRole: "Data Analyst",
      interviewDate: new Date("2024-10-22"),
      status: "Rejected",
    },
    {
      company: "Amazon.com, Inc",
      jobRole: "Data Analyst",
      interviewDate: new Date("2024-10-22"),
      status: "In-progress",
    },
    {
      company: "Apple Inc.",
      jobRole: "Data Analyst",
      interviewDate: new Date("2024-10-22"),
      status: "Selected to next round",
    },
    {
      company: "Infosys Limited",
      jobRole: "Data Analyst",
      interviewDate: new Date("2024-10-22"),
      status: "In-progress",
    },
    {
      company: "Tata Consultancy Services (TCS)",
      jobRole: "Data Analyst",
      interviewDate: new Date("2024-10-22"),
      status: "Rejected",
    },
  ];

  // notifications = [
  //   {
  //     title: 'Congratulations',
  //     details: 'You have an offer from Flipkart Online Services Pvt. Ltd.',
  //   },
  //   {
  //     title: 'Reminder',
  //     details: 'Your interview with Microsoft Corporation is on October 12nd.',
  //   },
  //   {
  //     title: "New Job Posting",
  //     details: "Softserve Global is hiring for Software Engineer roles.",
  //   },
  //   {
  //     title: "New Job Posting",
  //     details: "Softserve Global posted today!",
  //   },
  //   {
  //     title: "New Job Posting",
  //     details: "Capgemeni is hiring for Software Engineer roles.",
  //   },
  // ];
  notifications: notification[] = [];
  interviewSchedule = [
    {
      company: "Tata Consultancy Services (TCS)",
      date: new Date("2024-10-20"),
      time: "10:00 AM",
    },
    { company: "Adobe Inc.", date: new Date("2024-10-22"), time: "1:00 PM" },
    {
      company: "Flipkart Online Services Pvt. Ltd.",
      date: new Date("2024-10-22"),
      time: "1:00 PM",
    },
    { company: "Capgemini SE", date: new Date("2024-10-22"), time: "1:00 PM" },
  ];

  constructor(private notificationApiService: NotificationsApiService) {
    const storedUserRoleId = sessionStorage.getItem("StudentId");
    this.userRoleId = storedUserRoleId ? parseInt(storedUserRoleId) : 0;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case "In-progress":
        return "in-progress";
      case "Rejected":
        return "rejected";
      case "Selected to next round":
        return "selected";
      default:
        return "";
    }
  }

  ngOnInit(): void {
    this.getNotification();
  }

  getNotification() {
    this.notificationApiService
      .GetNotificationStudentId(this.userRoleId)
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
