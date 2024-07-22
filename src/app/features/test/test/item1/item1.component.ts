import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { AppComponent } from "src/app/app.component";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  selector: "app-item1",
  standalone: true,
  imports: [AMGModules, RouterModule, AppComponent, SharedModule, CommonModule],
  templateUrl: "./item1.component.html",
  styleUrl: "./item1.component.css",
})
export class Item1Component {}
