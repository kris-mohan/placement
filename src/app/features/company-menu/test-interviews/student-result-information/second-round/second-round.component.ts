import { Component, Input } from "@angular/core";
import { HiringRound } from "../../../company-job-details/test-rounds/test-rounds-model";

@Component({
  selector: "app-second-round",
  standalone: true,
  imports: [],
  templateUrl: "./second-round.component.html",
  styleUrl: "./second-round.component.css",
})
export class SecondRoundComponent {
  @Input() round!: HiringRound;
}
