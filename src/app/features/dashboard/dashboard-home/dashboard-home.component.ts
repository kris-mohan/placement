import { Component, OnInit } from "@angular/core";
import { NotificationService } from "src/app/core/services/notification.service";
import { Title } from "@angular/platform-browser";
import { NGXLogger } from "ngx-logger";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { AppComponent } from "src/app/app.component";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  selector: "app-dashboard-home",
  standalone: true,
  templateUrl: "./dashboard-home.component.html",
  styleUrls: ["./dashboard-home.component.css"],
  imports: [AMGModules, AppComponent, SharedModule],
})
export class DashboardHomeComponent implements OnInit {
  currentUser: any;

  constructor(
    private notificationService: NotificationService,
    private authService: AuthenticationService,
    private titleService: Title,
    private logger: NGXLogger
  ) {}

  ngOnInit() {
    // this.currentUser = this.authService.getCurrentUser();
    this.titleService.setTitle("placements - Dashboard");
    this.logger.log("Dashboard loaded");

    setTimeout(() => {
      this.notificationService.openSnackBar("Welcome!");
    });
  }
}
