import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { AppComponent } from "src/app/app.component";
import { SharedModule } from "../shared.module";

@Component({
  selector: "app-content-placeholder-animation",
  standalone: true,
  imports: [AppComponent, AMGModules, CommonModule, RouterModule, SharedModule],
  templateUrl: "./content-placeholder-animation.component.html",
  styleUrls: ["./content-placeholder-animation.component.css"],
})
export class ContentPlaceholderAnimationComponent {
  constructor() {}
}
