import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  selector: "app-login-auth",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule, FlexLayoutModule],
  templateUrl: "./login-auth.component.html",
  styleUrl: "./login-auth.component.css",
})
export class LoginAuthComponent {}
