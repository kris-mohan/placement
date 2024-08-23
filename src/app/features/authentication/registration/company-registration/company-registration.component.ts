import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  selector: "app-company-registration",
  standalone: true,
  imports: [SharedModule, AMGModules, CommonModule],
  templateUrl: "./company-registration.component.html",
  styleUrl: "./company-registration.component.css",
})
export class CompanyRegistrationComponent {}
