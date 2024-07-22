// import { NgModule } from "@angular/core";
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
import { Item3Component } from "./features/test/test/item3/item3.component";

// import { AuthGuard } from "./core/guards/auth.guard";

const appRoutes: Routes = [
  {
    path: "auth/login",
    component: LoginComponent,
  },
  {
    path: "dashboard",
    component: DashboardHomeComponent,
    title: "Dashboard",
  },
  {
    path: "customers",
    component: CustomerListComponent,
  },
  {
    path: "users",
    component: UserListComponent,
  },
  {
    path: "account/profile",
    component: AccountPageComponent,
  },
  {
    path: "icons",
    component: IconsComponent,
  },

  {
    path: "typography",
    component: TypographyComponent,
  },
  {
    path: "test",
    component: TestComponent,
    children: [
      {
        path: "item1",
        component: Item1Component,
      },
      {
        path: "item2",
        component: Item2Component,
      },
      {
        path: "item3",
        component: Item3Component,
      },
    ],
  },

  {
    path: "about",
    component: AboutPageComponent,
  },
  {
    path: "**",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
];

export default appRoutes;
