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

// import { AuthGuard } from "./core/guards/auth.guard";

const appRoutes: Routes = [
  {
    path: "company-configuration",
    component: CompanyConfigComponent,
    title: "Company Configuration",
  },
  {
    path: "company-configuration/addEditCompany/:id",
    component: AddEditCompanyComponent,
  },
  {
    path: "company-configuration/addEditTechnology/:id",
    component: AddEditTechnologyComponent,
  },
  {
    path: "company-configuration/addEditRole/:id",
    component: AddEditRoleComponent,
  },

  {
    path: "company-configuration/addEditCompanyTech/:id",
    component: AddEditCompTechComponent,
  },

  {
    path: "campus-configuration",
    component: CampusConfigurationComponent,
    title: "Campus Configuration",
  },
  {
    path: "campus-configuration/addEditCalendarEvent/:id",
    component: AddEditCalendarEventsComponent,
  },
  {
    path: "campus-configuration/addEditInvitation/:id",
    component: AddEditInvitationsComponent,
  },
  {
    path: "campus-configuration/addEditJobPosting/:id",
    component: AddEditJobPostingsComponent,
  },
  {
    path: "campus-configuration/addEditMappingJobPost/:id",
    component: AddEditMappingJobPostComponent,
  },

  {
    path: "training-configuration",
    component: TrainingConfigurationComponent,
    title: "Training Configuration",
  },
  {
    path: "training-configuration/addEditTrainer/:id",
    component: AddEditTrainersComponent,
  },
  {
    path: "training-configuration/addEditSchedule/:id",
    component: AddEditSchedulesComponent,
  },
  {
    path: "training-configuration/addEditCourse/:id",
    component: AddEditCoursesComponent,
  },
  {
    path: "dashboard",
    component: DashboardHomeComponent,
    title: "Dashboard",
  },
  {
    path: "**",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
];

export default appRoutes;
