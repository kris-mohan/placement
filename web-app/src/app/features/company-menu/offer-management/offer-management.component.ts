import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  selector: "app-offer-management",
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: "./offer-management.component.html",
  styleUrl: "./offer-management.component.css",
})
export class OfferManagementComponent {}
