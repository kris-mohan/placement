import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  selector: "app-icons",
  templateUrl: "./icons.component.html",
  styleUrls: ["./icons.component.css"],
})
export class IconsComponent {
  constructor() {}
}
