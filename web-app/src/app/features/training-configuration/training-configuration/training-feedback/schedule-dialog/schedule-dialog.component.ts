import { CommonModule } from '@angular/common';
import { Component, inject, Inject, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { AMGModules } from 'src/AMG-Module/AMG-module';
import { SharedModule } from 'src/app/shared/shared.module';
import { Router } from '@angular/router';
@Component({
  selector: 'app-schedule-dialog',
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: './schedule-dialog.component.html',
  styleUrl: './schedule-dialog.component.css',
})
export class ScheduleDialogComponent {
  readonly panelOpenState = signal(false);
  readonly dialog = inject(MatDialog);

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef <ScheduleDialogComponent>
  ) {}

  openStudentsResponse() {
    this.router.navigate(['/training-configuration/tf-student']);
    this.dialogRef.close();
  }
}
