import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  selector: "app-add-edit-rounds",
  standalone: true,
  imports: [AMGModules, SharedModule, CommonModule],
  templateUrl: "./add-edit-rounds.component.html",
  styleUrl: "./add-edit-rounds.component.css",
})
export class AddEditRoundsComponent {
  roundId: number | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    // this.route.paramMap.subscribe((params) => {
    //   const id = params.get("roundsId");
    //   this.roundId = id !== null ? +id : null;
    //   if (this.roundId) {
    //     const technology = HIRING_ROUNDS_DATA.find(
    //       (t) => t.roundId === this.roundId
    //     );
    //     // if (technology) {
    //     //   this.addEditTrainerForm.patchValue(technology);
    //     // }
    //   }
    // });
  }

  goBack(): void {
    this.location.back();
  }
}
