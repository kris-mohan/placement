import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  standalone: true,
  imports: [AMGModules, CommonModule, SharedModule],
  selector: "app-about-page",
  templateUrl: "./about-page.component.html",
  styleUrls: ["./about-page.component.css"],
})
export class AboutPageComponent {
  constructor() {}
}
