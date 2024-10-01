import { ChangeDetectorRef, Component, ViewChild } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { CommonModule } from "@angular/common";
import {
  Router,
  RouterEvent,
  RouterLink,
  RouterLinkActive,
  RouterLinkWithHref,
  RouterModule,
} from "@angular/router";
import { Subscription, timer } from "rxjs";
import { MediaMatcher } from "@angular/cdk/layout";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "../shared.module";
import { SpinnerService } from "src/app/core/services/spinner.service";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatExpansionPanel } from "@angular/material/expansion";
import { NotificationService } from "src/app/services/notification-service/notification-service";
// import { AuthenticationService } from "src/app/core/services/auth.service";
// import { AuthGuard } from "src/app/core/guards/auth.guard";

@Component({
  selector: "app-layout",
  standalone: true,
  imports: [
    AppComponent,
    AMGModules,
    CommonModule,
    RouterModule,
    SharedModule,
    FlexLayoutModule,
    RouterLinkActive,
    RouterLink,
    RouterLinkWithHref,
  ],
  templateUrl: "./layout.component.html",
  styleUrl: "./layout.component.css",
})
export class LayoutComponent {
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  showSpinner: boolean = false;
  userName: string = "";
  isAdmin: boolean = false;
  userType: number;

  private autoLogoutSubscription: Subscription = new Subscription();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    public spinnerService: SpinnerService,
    private notificationService: NotificationService,
    private router: Router // private authService: AuthenticationService, // private authGuard: AuthGuard
  ) {
    this.mobileQuery = this.media.matchMedia("(max-width: 1000px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener("change", this._mobileQueryListener);
    const storedUserType = sessionStorage.getItem("userType");
    const storedCollegeName = sessionStorage.getItem("collegeName");

    const storedUserName = sessionStorage.getItem("userName");
    console.log(storedUserType);
    this.userType = storedUserType ? parseInt(storedUserType) : 0;
    this.userName = storedUserName!;
  }

  notificationCount = 3;

  notifications = [
    { message: "View Dashboard", route: "/dashboard" },
    { message: "Check Job List", route: "/job-list" },
    { message: "Company Configuration", route: "/company-configuration" },
  ];

  navigateToComponent(notification: any) {
    this.router.navigate([notification.route]);
  }

  // navigateToComponent(notification: Notification) {
  //   if (notification.data) {
  //     this.router.navigate([notification.component], {
  //       queryParams: notification.data,
  //     });
  //   } else {
  //     this.router.navigate([notification.component]);
  //   }
  // }

  // ngOnInit(): void {
  //   const user = this.authService.getCurrentUser();

  //   this.isAdmin = user.isAdmin;
  //   this.userName = user.fullName;

  //   // Auto log-out subscription
  //   const timer$ = timer(2000, 5000);
  //   this.autoLogoutSubscription = timer$.subscribe(() => {
  //     this.authGuard.canActivate();
  //   });
  // }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeEventListener("change", this._mobileQueryListener);
    this.autoLogoutSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  showConfigurationItems = false;

  toggleConfigurationItems() {
    this.showConfigurationItems = !this.showConfigurationItems;
  }

  onComponentClick(componentName: string): void {
    // Add notification
    this.notificationService.addNotification(componentName);
  }
}
