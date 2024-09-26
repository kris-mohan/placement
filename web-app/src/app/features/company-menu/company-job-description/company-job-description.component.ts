import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  selector: "app-company-job-description",
  standalone: true,
  imports: [SharedModule],
  templateUrl: "./company-job-description.component.html",
  styleUrl: "./company-job-description.component.css",
})
export class CompanyJobDescriptionComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
