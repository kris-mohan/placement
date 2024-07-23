import { Routes, RouterModule } from "@angular/router";
import { DashboardHomeComponent } from "./features/dashboard/dashboard-home/dashboard-home.component";
import { TypographyComponent } from "./features/typography/typography/typography.component";
import { CustomMaterialModule } from "./custom-material/custom-material.module";
import { CustomerListComponent } from "./features/customers/customer-list/customer-list.component";
import { UserListComponent } from "./features/users/user-list/user-list.component";
import { AccountPageComponent } from "./features/account/account-page/account-page.component";
import { AboutPageComponent } from "./features/about/about-page/about-page.component";
import { IconsComponent } from "./features/icons/icons/icons.component";
import { TestComponent } from "./features/test/test/test.component";
import { ProfileDetailsComponent } from "./features/account/profile-details/profile-details.component";
import { Item1Component } from "./features/test/test/item1/item1.component";
import { LoginComponent } from "./features/auth/login/login.component";
import { Item2Component } from "./features/test/test/item2/item2.component";
import { Component } from "@angular/core";
import { CompanyConfigComponent } from "./features/company-configuration/company-config/company-config.component";

// import { AuthGuard } from "./core/guards/auth.guard";

const appRoutes: Routes = [
  {
    path: "company-config",
    component: CompanyConfigComponent,
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
  // {
  //   path: "auth/login",
  //   component: LoginComponent,
  // },
  //
  // {
  //   path: "customers",
  //   component: CustomerListComponent,
  // },
  // {
  //   path: "users",
  //   component: UserListComponent,
  // },
  // {
  //   path: "account/profile",
  //   component: AccountPageComponent,
  // },
  // {
  //   path: "icons",
  //   component: IconsComponent,
  // },

  // {
  //   path: "typography",
  //   component: TypographyComponent,
  // },
  // {
  //   path: "test",
  //   component: TestComponent,
  //   children: [
  //     {
  //       path: "item1",
  //       component: Item1Component,
  //     },
  //     {
  //       path: "item2",
  //       component: Item2Component,
  //     },
  //   ],
  // },

  // {
  //   path: "about",
  //   component: AboutPageComponent,
  // },
];

export default appRoutes;
