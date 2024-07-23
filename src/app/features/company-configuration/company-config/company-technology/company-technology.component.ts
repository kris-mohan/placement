import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  selector: "app-company-technology",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./company-technology.component.html",
  styleUrl: "./company-technology.component.css",
})
export class CompanyTechnologyComponent {}
