import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { AppComponent } from "src/app/app.component";
import { SharedModule } from "src/app/shared/shared.module";
// import { SharedModule } from "src/app/shared/shared.module";

@Component({
  selector: "app-typography",
  standalone: true,
  templateUrl: "./typography.component.html",
  styleUrls: ["./typography.component.css"],
  imports: [AMGModules, AppComponent, SharedModule],
})
export class TypographyComponent {
  constructor() {}
}
