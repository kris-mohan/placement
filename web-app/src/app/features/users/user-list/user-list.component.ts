import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

import { NGXLogger } from "ngx-logger";
import { NotificationService } from "src/app/core/services/notification.service";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  selector: "app-user-list",
  standalone: true,
  imports: [AMGModules, SharedModule],
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle("placements - Users");
    this.logger.log("Users loaded");
  }
}
