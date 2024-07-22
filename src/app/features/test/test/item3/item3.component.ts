import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { AppComponent } from "src/app/app.component";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  selector: "app-item3",
  standalone: true,
  imports: [AMGModules, RouterModule, AppComponent, SharedModule, CommonModule],
  templateUrl: "./item3.component.html",
  styleUrl: "./item3.component.css",
})
export class Item3Component {}
