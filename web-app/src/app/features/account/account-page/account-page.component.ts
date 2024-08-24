import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { ChangePasswordComponent } from "../change-password/change-password.component";
import { ProfileDetailsComponent } from "../profile-details/profile-details.component";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    AMGModules,
    ChangePasswordComponent,
    ProfileDetailsComponent,
  ],
  selector: "app-account-page",
  templateUrl: "./account-page.component.html",
  styleUrls: ["./account-page.component.css"],
})
export class AccountPageComponent implements OnInit {
  constructor(private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle("placements - Account");
  }
}
