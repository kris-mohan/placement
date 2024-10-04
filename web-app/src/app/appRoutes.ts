import { Routes, RouterModule } from "@angular/router";
import { DashboardHomeComponent } from "./features/dashboard/dashboard-home/dashboard-home.component";
import { CompanyConfigComponent } from "./features/company-configuration/company-config/company-config.component";
import { AddEditCompanyComponent } from "./features/company-configuration/company-config/companies/add-edit-company/add-edit-company.component";
import { AddEditTechnologyComponent } from "./features/company-configuration/company-config/technologies/add-edit-technology/add-edit-technology.component";
import { AddEditRoleComponent } from "./features/company-configuration/company-config/roles/add-edit-role/add-edit-role.component";
import { AddEditCompTechComponent } from "./features/company-configuration/company-config/company-technology/add-edit-comp-tech/add-edit-comp-tech.component";
import { CampusConfigurationComponent } from "./features/campus-configuration/campus-configuration/campus-configuration.component";
import { TrainingConfigurationComponent } from "./features/training-configuration/training-configuration/training-configuration.component";
import { AddEditCalendarEventsComponent } from "./features/campus-configuration/campus-configuration/calendar-events/add-edit-calendar-events/add-edit-calendar-events.component";
import { AddEditInvitationsComponent } from "./features/campus-configuration/campus-configuration/invitations/add-edit-invitations/add-edit-invitations.component";
import { AddEditJobPostingsComponent } from "./features/campus-configuration/campus-configuration/job-postings/add-edit-job-postings/add-edit-job-postings.component";
import { AddEditMappingJobPostComponent } from "./features/campus-configuration/campus-configuration/mapping-jop-post/add-edit-mapping-job-post/add-edit-mapping-job-post.component";
import { AddEditTrainersComponent } from "./features/training-configuration/training-configuration/trainers/add-edit-trainers/add-edit-trainers.component";
import { AddEditSchedulesComponent } from "./features/training-configuration/training-configuration/schedules/add-edit-schedules/add-edit-schedules.component";
import { AddEditCoursesComponent } from "./features/training-configuration/training-configuration/courses/add-edit-courses/add-edit-courses.component";
import { ConfigurationComponent } from "./features/configuration/configuration.component";
import { LoginAuthComponent } from "./features/authentication/login-auth/login-auth.component";
import { AppComponent } from "./app.component";
import { LayoutComponent } from "./shared/layout/layout.component";
import { CompanyRegistrationComponent } from "./features/authentication/registration/company-registration/company-registration.component";
import { CampusRegistrationComponent } from "./features/authentication/registration/campus-registration/campus-registration.component";
import { CompanyJobDetailsComponent } from "./features/company-menu/company-job-details/company-job-details.component";
import { AddEditCompanyJobDetailsComponent } from "./features/company-menu/company-job-details/add-edit-company-job-details/add-edit-company-job-details.component";
import { JobsListComponent } from "./features/placement-cell/placement-cell/jobs-list/jobs-list.component";
import { PlacementCellComponent } from "./features/placement-cell/placement-cell/placement-cell.component";
import { CompanyListDetailsComponent } from "./features/placement-cell/placement-cell/company-list-details/company-list-details.component";
import { EligibleStudentsListComponent } from "./features/placement-cell/placement-cell/eligible-students-list/eligible-students-list.component";
import { JobListComponent } from "./features/student-menu/student-menu/job-list/job-list.component";
import { JobDescriptionComponent } from "./features/student-menu/student-menu/job-list/job-description/job-description.component";
import { TestRoundsComponent } from "./features/company-menu/company-job-details/test-rounds/test-rounds.component";
import { AddEditRoundsComponent } from "./features/company-menu/company-job-details/test-rounds/add-edit-rounds/add-edit-rounds.component";
import { TestInterviewsComponent } from "./features/company-menu/test-interviews/test-interviews.component";
import { ScheduledJobsListComponent } from "./features/company-menu/test-interviews/scheduled-jobs-list/scheduled-jobs-list.component";
import { StudentsListComponent } from "./features/company-menu/test-interviews/students-list/students-list.component";
import { StudentResultInformation } from "./features/company-menu/test-interviews/student-result-information/student-result-information.component";
import { AddEditIndustryComponent } from "./features/company-configuration/company-config/industry/add-edit-industry/add-edit-industry.component";
import { AddEditcompanyIndustryComponent } from "./features/company-configuration/company-config/industry-technology/add-edit-industry-technology/add-edit-company-industry.component";
import { FeedbackSurveyComponent } from "./features/placement-cell/placement-cell/feedback-survey/feedback-survey.component";
import { CalendarComponent } from "./features/company-menu/calendar/calendar.component";
import { JobPostingsComponent } from "./features/campus-configuration/campus-configuration/job-postings/job-postings.component";
import { InterviewComponent } from "./features/company-menu/interview/interview.component";
import { ProfileManagementComponent } from "./features/student-menu/student-menu/profile-management/profile-management.component";
import { AlumniComponent } from "./features/student-menu/alumni/alumni.component";
import { InterviewStudentsListComponent } from "./features/company-menu/interview-students-list/interview-students-list.component";
import { AddRoundsModalComponent } from "./features/company-menu/company-job-details/add-edit-company-job-details/add-rounds-modal/add-rounds-modal.component";
import { PanelTabComponent } from "./features/company-menu/company-job-details/panel-tab/panel-tab.component";
import { CompanyJobDescriptionComponent } from "./features/company-menu/company-job-description/company-job-description.component";
import { ProfilemanagementDashboardComponent } from "./features/student-menu/student-menu/profile-management/profilemanagement-dashboard/profilemanagement-dashboard.component";
import { JobsComponent } from "./features/student-menu/applied/jobs.component";
import { CompanyProfileComponent } from './features/company-menu/company-profile/company-profile.component';
import { InterviewScheduleComponent } from './features/company-menu/interview-schedule/interview-schedule.component';
import { ResumeBuilderComponent } from "./features/student-menu/student-menu/resume-builder/resume-builder.component";
import { IndentRequirementsComponent } from "./features/company-menu/indent-requirements/indent-requirements.component";
import { ApprovalComponent } from "./features/placement-cell/placement-cell/approval/approval.component";
import { StudentRegistrationComponent } from "./features/authentication/registration/student-registration/student-registration.component";
import { ForumComponent } from "./features/student-menu/alumni/forum/forum.component";
// import { CompanyProfileComponent } from './features/company-menu/company-profile/company-profile.component';
import { CommunicationComponent } from "./features/placement-cell/placement-cell/communication/communication.component";
// import { CompanyProfileComponent } from './features/company-menu/company-profile/company-profile.component';
import { PoolCampusComponent } from "./features/company-menu/pool-campus/pool-campus.component";
import { CompanyCalendarComponent } from "./features/company-menu/company-calendar/company-calendar.component";
import { CompanyDashboardComponent } from "./features/company-menu/company-dashboard/company-dashboard.component";
import { PlacementDashboardComponent } from "./features/placement-cell/placement-cell/placement-dashboard/placement-dashboard.component";
import { StudentDashboardComponent } from "./features/student-menu/student-menu/student-dashboard/student-dashboard.component";
import { PlacementCompanyComponent } from "./features/placement-cell/placement-cell/placement-company/placement-company.component";
import { PlacementCompanyJobDetailsComponent } from "./features/placement-cell/placement-cell/placement-company-job-details/placement-company-job-details.component";
import { PlacementJobDescriptionComponent } from "./features/placement-cell/placement-cell/placement-job-description/placement-job-description.component";
import { CompanyCommunicationComponent } from "./features/company-menu/company-communication/company-communication.component";
import { PlacementInterviewComponent } from "./features/placement-cell/placement-cell/placement-interview/placement-interview.component";
import { PlacementInterviewStudentsComponent } from "./features/placement-cell/placement-cell/placement-interview-students/placement-interview-students.component";
import { StudentCompanyComponent } from "./features/student-menu/student-menu/student-company/student-company.component";
import { StudentJobsComponent } from "./features/student-menu/student-menu/student-jobs/student-jobs.component";

// import { AuthGuard } from "./core/guards/auth.guard";

const appRoutes: Routes = [
  {
    path: "login",
    component: LoginAuthComponent,
    title: "Placement",
  },
  {
    path: "",
    component: LoginAuthComponent,
    title: "Placement",
  },
  {
    path: "campus-registration",
    component: CampusRegistrationComponent,
  },
  {
    path: "company-registration",
    component: CompanyRegistrationComponent,
  },
  {
    path: "student-registration",
    component: StudentRegistrationComponent,
  },
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "interview-schedule",
        component: InterviewScheduleComponent,
      },
      {
        path: "company-profile",
        component: CompanyProfileComponent,
      },
      {
        path: "student_applied",
        component: JobsComponent,
      },
      {
        path: "configuration",
        component: ConfigurationComponent,
        title: "Configuration",
      },
      {
        path: "company-configuration",
        component: CompanyConfigComponent,
        title: "Company Configuration",
      },

      {
        path: "company-configuration/company/:companyId",
        component: AddEditCompanyComponent,
      },
      {
        path: "company-configuration/technology/:technologyId",
        component: AddEditTechnologyComponent,
      },
      {
        path: "company-configuration/role/:roleId",
        component: AddEditRoleComponent,
      },
      {
        path: "company-configuration/industry/:industryId",
        component: AddEditIndustryComponent,
      },
      {
        path: "company-configuration/companyIndustry/:companyIndustryId",
        component: AddEditcompanyIndustryComponent,
      },

      {
        path: "company-configuration/companyTechnology/:id",
        component: AddEditCompTechComponent,
      },

      {
        path: "campus-configuration",
        component: CampusConfigurationComponent,
        title: "Campus Configuration",
      },
      {
        path: "campus-configuration/calendar-events/:id",
        component: AddEditCalendarEventsComponent,
      },
      {
        path: "profile-management-dashboard",
        component: ProfilemanagementDashboardComponent,
      },
      {
        path: "profile-management-dashboard/profile-management/:id",
        component: ProfileManagementComponent,
      },
      {
        path: "campus-configuration/invitations/:id",
        component: AddEditInvitationsComponent,
      },
      {
        path: "campus-configuration/job-postings/:id",
        component: AddEditJobPostingsComponent,
      },
      {
        path: "campus-configuration/mapping-jobs/:id",
        component: AddEditMappingJobPostComponent,
      },
      {
        path: "forum",
        component: ForumComponent,
      },   
      { 
        path: 'alumni/:company',
        component: AlumniComponent 
      }, 
      {
        path: '',
        redirectTo: '/forum', 
        pathMatch: 'full' 
      },
      {
        path: "",
        redirectTo: "/forum",
        pathMatch: "full",
      },
      {
        path: "training-configuration",
        component: TrainingConfigurationComponent,
        title: "Training Configuration",
      },
      {
        path: "training-configuration/trainers/:id",
        component: AddEditTrainersComponent,
      },
      {
        path: "training-configuration/schedules/:id",
        component: AddEditSchedulesComponent,
      },
      {
        path: "training-configuration/courses/:id",
        component: AddEditCoursesComponent,
      },
      {
        path: "company-job-details",
        component: CompanyJobDetailsComponent,
      },
      {
        path: "company-job-details",
        component: CompanyJobDetailsComponent,
      },
      {
        path: "company-job-details",
        component: CompanyJobDetailsComponent,
      },
      {
        path: "company-configuration/company-job-details/:id",
        component: CompanyJobDetailsComponent,
      },
      {
        path: "company-job-details/:id",
        component: AddEditCompanyJobDetailsComponent,
      },
      {
        path: "company-job-details/test-rounds/:jobId",
        component: TestRoundsComponent,
      },
      {
        path: "company-job-details/test-rounds/:jobId/:roundsId",
        component: AddEditRoundsComponent,
      },
      {
        path: "company-job-details/companyJobDescription/:jobId",
        component: CompanyJobDescriptionComponent,
      },
      {
        path: "company-lists",
        component: CompanyListDetailsComponent,
      },
      {
        path: "company-calendar",
        component: CompanyCalendarComponent,
      },
      {
        path: "placement-feedback-survey",
        component: FeedbackSurveyComponent,
      },
      {
        path: "company-lists/:companyId",
        component: JobsListComponent,
      },
      {
        path: "company-lists/:companyId/:jobId",
        component: EligibleStudentsListComponent,
      },
      {
        path: "dashboard",
        component: DashboardHomeComponent,
        title: "Dashboard",
      },
      {
        path: "job-list",
        component: JobListComponent,
      },
      {
        path: "job-list/:jobId",
        component: JobDescriptionComponent,
      },
      {
        path: "test-interviews",
        component: TestInterviewsComponent,
      },
      {
        path: "test-interviews/:collegeId",
        component: ScheduledJobsListComponent,
      },
      {
        path: "test-interviews/:collegeId/:jobId",
        component: StudentsListComponent,
      },
      // {
      //   path: "test-interviews/:collegeId/:jobId/:studentId",
      //   component: StudentResultInformation,
      // },

      {
        path: "resume-builder",
        component: ResumeBuilderComponent,
      },

      {
        path: "students",
        component: EligibleStudentsListComponent,
      },

      {
        path: "calendar",
        component: CalendarComponent,
      },
      {
        path: "job-postings",
        component: JobPostingsComponent,
      },
      {
        path: "interview",
        component: InterviewComponent,
      },
      {
        path: "interview/interview-students-list/:id",
        component: InterviewStudentsListComponent,
      },
      {
        path: "interview/interview-students-list/student-result-information/:id",
        component: StudentResultInformation,
      },
      {
        path: "testr",
        component: AddRoundsModalComponent,
      },
      {
        path: "Panel",
        component: PanelTabComponent,
      },
      {
        path: "indent-requirement",
        component: IndentRequirementsComponent,
      },
      {
        path: "placement-communicaton",
        component: CommunicationComponent,
      },

      {
        path: "students/student-details-approval/:id",
        component: ApprovalComponent,
      },
      {
        path: "poolcampus",
        component: PoolCampusComponent,
      },

      //company
      {
        path: "company-dashboard",
        component: CompanyDashboardComponent,
      },
      {
        path: "company-communication",
        component: CompanyCommunicationComponent,
      },

      // placement officer
      {
        path: "placement-dashboard",
        component: PlacementDashboardComponent,
      },
      {
        path: "placement-company",
        component: PlacementCompanyComponent,
      },
      {
        path: "placement-company/placement-company-job-details/:id",
        component: PlacementCompanyJobDetailsComponent,
      },
      {
        path: "placement-company/placement-company-job-details/placement-job-description/:id",
        component: PlacementJobDescriptionComponent,
      },
      {
        path: "placement-interview",
        component: PlacementInterviewComponent,
      },
      {
        path: "placement-interview/placement-interview-students/:id",
        component: PlacementInterviewStudentsComponent,
      },

      //student

      {
        path: "student-dashboard",
        component: StudentDashboardComponent,
      },
      {
        path: "student-company",
        component: StudentCompanyComponent,
      },
      {
        path: "student-company/student-jobs/:id",
        component: StudentJobsComponent,
      },
      {
        path: "student-company/student-jobs/student-job-description/:id",
        component: CompanyJobDescriptionComponent,
      },

      {
        path: "**",
        redirectTo: "dashboard",
        pathMatch: "full",
      },
    ],
  },
];

export default appRoutes;
