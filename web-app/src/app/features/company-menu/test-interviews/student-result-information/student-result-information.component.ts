import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";
import { FirstRoundComponent } from "./first-round/first-round.component";
import { SecondRoundComponent } from "./second-round/second-round.component";
import { ThirdRoundComponent } from "./third-round/third-round.component";
import { FourthRoundComponent } from "./fourth-round/fourth-round.component";
//import { HIRING_ROUNDS_DATA } from "../../company-job-details/test-rounds/test-rounds.component";
import { HiringRound } from "../../company-job-details/test-rounds/test-rounds-model";

@Component({
  selector: "app-student-result-information",
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    AMGModules,
    FirstRoundComponent,
    SecondRoundComponent,
    ThirdRoundComponent,
    FourthRoundComponent,
  ],
  templateUrl: "./student-result-information.component.html",
  styleUrl: "./student-result-information.component.css",
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class StudentResultInformation {
  hiringRounds: HiringRound[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      // const jobId = Number(params.get("jobId"));
      // this.hiringRounds = HIRING_ROUNDS_DATA.filter(
      //   (round) => round.jobId === jobId
      // );
    });
  }

  goBack(): void {
    this.location.back();
  }
}
