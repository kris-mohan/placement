import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { AppComponent } from "src/app/app.component";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  selector: "app-test",
  standalone: true,
  imports: [AppComponent, SharedModule, AMGModules, CommonModule],
  templateUrl: "./test.component.html",
  styleUrl: "./test.component.css",
})
export class TestComponent {}
