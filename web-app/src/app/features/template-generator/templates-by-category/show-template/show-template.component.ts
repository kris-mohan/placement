import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  selector: "app-show-template",
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MatCardModule,
    AMGModules,
    SharedModule,
    CommonModule,
  ],
  templateUrl: "./show-template.component.html",
  styleUrl: "./show-template.component.css",
})
export class ShowTemplateComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
