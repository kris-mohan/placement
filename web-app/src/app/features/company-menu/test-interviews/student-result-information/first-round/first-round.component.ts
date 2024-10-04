import { CommonModule, Location } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { APIService } from "src/app/services/api-services/api-services";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { HiringRound } from "../../../company-job-details/test-rounds/test-rounds-model";

@Component({
  selector: "app-first-round",
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: "./first-round.component.html",
  styleUrl: "./first-round.component.css",
})
export class FirstRoundComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService,
    private location: Location,
    private apiService: APIService
  ) {}
  // @Input() round!: HiringRound;
  async openReject() {
    const feedback = await this.sweetAlertService.feedbackInput(
      "Please provide your reason for rejection",
      "Enter your reason here..."
    );
    if (feedback === null) {
      return;
    }
    this.sweetAlertService.success("Candidate has been rejected.");
  }

  async openMoveToNextRound() {
    const feedback = await this.sweetAlertService.feedbackInput(
      "Please provide your feedback for moving to the next round",
      "Enter your feedback here..."
    );
    if (feedback === null) {
      return;
    }

    this.sweetAlertService.success(
      "Candidate has been moved to the next round."
    );
  }
}
