import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  selector: "app-dialog-message",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./dialog-message.component.html",
  styleUrl: "./dialog-message.component.css",
})
export class DialogMessageComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
