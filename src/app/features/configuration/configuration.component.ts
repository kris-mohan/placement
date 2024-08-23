import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  selector: "app-configuration",
  standalone: true,
  imports: [AMGModules, SharedModule, CommonModule],
  templateUrl: "./configuration.component.html",
  styleUrl: "./configuration.component.css",
})
export class ConfigurationComponent {}
