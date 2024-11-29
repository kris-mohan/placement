import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";
import { Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { Course } from "src/app/services/types/Course";
import { Studentacademic } from "src/app/services/types/Studentacademic";
import { Tblstudent } from "src/app/services/types/Tblstudent";
import { Stream } from "src/app/services/types/Stream";
import { StudentProfileApiService } from "../StudentProfileApiService";
import { StudentSkill } from "src/app/services/types/StudentSkill";
import { MatTableDataSource } from "@angular/material/table";
@Component({
  selector: "app-profilemanagement-dashboard",
  standalone: true,
  imports: [AMGModules, CommonModule],
  templateUrl: "./profilemanagement-dashboard.component.html",
  styleUrl: "./profilemanagement-dashboard.component.css",
})
export class ProfilemanagementDashboardComponent {
  companyID: string = "";
  UserRoleId: number;
  sessionStudentId: number;
  Id: number | null = null;
  StudentAcademicData = signal<Studentacademic[]>([]);
  StudentDataSource = signal<Tblstudent[]>([]);
  StudentCourseDataSource = signal<Course[]>([]);
  StudentStreamDataSource = signal<Stream[]>([]);
  studentSkillsData = new MatTableDataSource<{
    skillType: string;
    skills: string;
  }>([]);
  displayedSkillsColumns: string[] = ["skillType", "skills"];

  constructor(
    private router: Router,
    private studentApiService: StudentProfileApiService
  ) {
    const storedUserRoleId = sessionStorage.getItem("userRoleId");
    this.UserRoleId = storedUserRoleId ? parseInt(storedUserRoleId) : 0;
    const storedStudentId = sessionStorage.getItem("StudentId");
    this.sessionStudentId = storedStudentId ? parseInt(storedStudentId) : 0;
  }

  ngOnInit() {
    this.getStudentProfileId();
    this.GetStudentSkillsByStudentId();
  }

  openAddEditProfile() {
    // if (id !== null && id !== undefined) {
    //   this.router.navigate(['/company-configuration/company', id]);
    // } else {
    //   this.router.navigate(['/company-configuration/company', 0]);
    // }
    const id = this.StudentAcademicData()[0].StudentId;
    this.router.navigate([
      "profile-management-dashboard/profile-management",
      id,
    ]);
  }

  getStudentProfileId(): void {
    this.studentApiService
      .GetStudentProfileDataById(this.sessionStudentId)
      .subscribe({
        next: (studentProfile: { value: Studentacademic[] }) => {
          const data: Studentacademic[] = studentProfile.value;
          this.StudentAcademicData.set(data);
          this.StudentDataSource.set([data[0].Student]);
          this.StudentCourseDataSource.set([data[0].Course]);
          this.StudentDataSource.set([data[0].Student]);
          console.log("student academic", this.StudentAcademicData());
        },

        error: (error) => {
          console.error("Error fetching Company Data", error);
        },
      });
  }
  GetStudentSkillsByStudentId(): void {
    this.studentApiService
      .GetStudentSkillsByStudentId(this.sessionStudentId)
      .subscribe({
        next: (skills) => {
          const data: StudentSkill[] = skills.value;
          const groupedData: { [key: string]: string[] } = {};
          data.forEach((item) => {
            const skillTypeName = item.Skill?.SkillType?.Name || "";
            const skillName = item.Skill?.Name || "";
            if (!groupedData[skillTypeName]) {
              groupedData[skillTypeName] = [];
            }
            groupedData[skillTypeName].push(skillName);
          });
          this.studentSkillsData.data = Object.keys(groupedData).map((key) => ({
            skillType: key,
            skills: groupedData[key].join(", "),
          }));
        },
      });
  }
}
