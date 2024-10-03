import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { CommonModule, Location } from "@angular/common";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  selector: "app-indent-requirements",
  standalone: true,
  imports: [ReactiveFormsModule, AMGModules, CommonModule, SharedModule],
  templateUrl: "./indent-requirements.component.html",
  styleUrl: "./indent-requirements.component.css",
})
export class IndentRequirementsComponent {
  constructor(private router: Router, private location: Location) {}
  indentForm = new FormGroup({
    invalid: new FormControl(false),
  });
  onSubmit() {
    this.location.back();
  }

  goBack(): void {
    this.location.back();
  }
}
// table-form.component.ts

// import { Component, OnInit } from "@angular/core";
// import { FormBuilder, FormGroup, Validators } from "@angular/forms";

// @Component({
//   selector: "app-table-form",
//   templateUrl: "./table-form.component.html",
//   styleUrls: ["./table-form.component.css"],
// })
// export class TableFormComponent implements OnInit {
//   indentForm: FormGroup;

//   constructor(private fb: FormBuilder) {}

//   ngOnInit(): void {
//     this.indentForm = this.fb.group({
//       department: ["", Validators.required],
//       address: ["", Validators.required],
//       contactName: ["", Validators.required],
//       designation: ["", Validators.required],
//       phone: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
//       email: ["", [Validators.required, Validators.email]],
//     });
//   }

//   onSubmit(): void {
//     if (this.indentForm.valid) {
//       console.log(this.indentForm.value);
//     }
//   }
// }
// // app.module.ts

// import { ReactiveFormsModule } from "@angular/forms";

// @NgModule({
//   declarations: [TableFormComponent],
//   imports: [
//     ReactiveFormsModule,
//     // other modules
//   ],
//   providers: [],
//   bootstrap: [AppComponent],
// })
// export class AppModule {}
