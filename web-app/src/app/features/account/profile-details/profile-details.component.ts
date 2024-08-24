import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  selector: "app-profile-details",
  templateUrl: "./profile-details.component.html",
  styleUrls: ["./profile-details.component.css"],
})
export class ProfileDetailsComponent implements OnInit {
  fullName: string = "";
  email: string = "";
  alias: string = "";

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.fullName = this.authService.getCurrentUser().fullName;
    this.email = this.authService.getCurrentUser().email;
  }
}
