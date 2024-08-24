import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { AppComponent } from "src/app/app.component";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  selector: "app-item2",
  standalone: true,
  imports: [AMGModules, RouterModule, AppComponent, SharedModule, CommonModule],
  templateUrl: "./item2.component.html",
  styleUrl: "./item2.component.css",
})
export class Item2Component {}