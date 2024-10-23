import { Component } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  FormsModule,
  FormArray,
  Validators,
} from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { CommonModule, Location } from "@angular/common";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-indent-requirements",
  standalone: true,
  imports: [
    AMGModules,
    CommonModule,
    SharedModule,
    MatGridListModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: "./indent-requirements.component.html",
  styleUrl: "./indent-requirements.component.css",
})
export class IndentRequirementsComponent {
  constructor(
    private router: Router,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.addIndentForm = this.fb.group({
      TrainerName: new FormControl(""),
      Email: new FormControl(""),
      ContactNumber: new FormControl(""),
      Extra: new FormControl(""),
      Extra1: new FormControl(""),
      itemsArray: this.fb.array([]),
    });

    this.itemsArray = this.addIndentForm.get("itemsArray") as FormArray;
    // this.addInitialItems();
  }

  addIndentForm: FormGroup;
  itemsArray: FormArray;
  // addInitialItems() {
  //   this.itemsArray.push(this.createItemFormControl());
  //   this.itemsArray.push(this.createItemFormControl());
  // }

  createItemFormControl(): FormGroup {
    return this.fb.group({
      requiredItem: new FormControl("", Validators.required), // Form control for requiredItem
      description: new FormControl("", Validators.required), // Form control for description
    });
  }

  handleAddGrid(): void {
    this.itemsArray.push(this.createItemFormControl());
  }

  handleDeleteGrid(index: number): void {
    // const length = this.itemsArray.length;
    if (index >= 0 && index && this.itemsArray.length > 0) {
      this.itemsArray.removeAt(index); // Removes the last item
    }
  }

  onSubmit() {
    this.location.back();
  }

  onSubmitDiv() {
    this.location.back();
  }
  onReset() {
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
