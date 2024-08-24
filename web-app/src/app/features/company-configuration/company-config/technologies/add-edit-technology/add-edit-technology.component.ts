import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  input,
  OnInit,
  Output,
} from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TECHNOLOGIES_DATA } from "../technologies.component";

@Component({
  selector: "app-add-edit-technology",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./add-edit-technology.component.html",
  styleUrl: "./add-edit-technology.component.css",
})
export class AddEditTechnologyComponent implements OnInit {
  addEditTechnologyForm: FormGroup;
  technologyId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.addEditTechnologyForm = this.fb.group({
      technologyId: [null],
      name: ["", Validators.required],
      description: ["", Validators.required],
      category: ["", Validators.required],
      version: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("technologyId");
      this.technologyId = id !== null ? +id : null;
      if (this.technologyId) {
        const technology = TECHNOLOGIES_DATA.find(
          (t) => t.technologyId === this.technologyId
        );
        if (technology) {
          this.addEditTechnologyForm.patchValue(technology);
        }
      }
    });
  }
  onSubmit(): void {
    // if (this.addEditTechnologyForm.valid) {
    //   this.formSubmit.emit(this.addEditTechnologyForm.value);
    //   this.router.navigate(["/company-config"]);
    // }
  }
}
