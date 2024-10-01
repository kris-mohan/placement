import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";

@Component({
  selector: "app-profilemanagement-dashboard",
  standalone: true,
  imports: [AMGModules, CommonModule],
  templateUrl: "./profilemanagement-dashboard.component.html",
  styleUrl: "./profilemanagement-dashboard.component.css",
})
export class ProfilemanagementDashboardComponent {
  constructor(private router: Router) {}
  profileData = {
    name: "John Doe",
    dob: "1995-06-15",
    bloodGroup: "O+",
    email: "john.doe@example.com",
    usn: "1ABCXYZ123",
    branch: "Computer Science",
    educationDetails: {
      tenth: {
        cgpa: "9.8",
        passoutYear: 2010,
        schoolName: "ABC High School",
        syllabus: "CBSE",
      },
      twelfth: {
        cgpa: "88%",
        passoutYear: 2012,
        schoolName: "XYZ Junior College",
        syllabus: "State Board",
      },
      present: {
        cgpa: "8.5",
        passoutYear: 2024,
        collegeName: "DEF College of Engineering",
        syllabus: "State Board",
      },
      otherColleges: [
        {
          collegeName: "GHI Institute",
          cgpa: "8.2",
          passoutYear: 2020,
          syllabus: "State Board",
        },
      ],
    },
    skills: ["Angular", "JavaScript", "HTML", "CSS"],
  };

  openAddEditProfile(id: number) {
    // if (id !== null && id !== undefined) {
    //   this.router.navigate(['/company-configuration/company', id]);
    // } else {
    //   this.router.navigate(['/company-configuration/company', 0]);
    // }
    this.router.navigate([
      "profile-management-dashboard/profile-management",
      id,
    ]);
  }
}
