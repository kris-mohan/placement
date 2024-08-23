import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  selector: "app-campus-registration",
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: "./campus-registration.component.html",
  styleUrl: "./campus-registration.component.css",
})
export class CampusRegistrationComponent {}
