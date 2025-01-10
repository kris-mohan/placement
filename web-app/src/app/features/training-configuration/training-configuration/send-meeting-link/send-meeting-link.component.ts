import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-send-meeting-link',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './send-meeting-link.component.html',
  styleUrl: './send-meeting-link.component.css',
})
export class SendMeetingLinkComponent {
  meetingLink: string = '';

  constructor(private dialogRef: MatDialogRef<SendMeetingLinkComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSend(): void {
    this.dialogRef.close(this.meetingLink);
  }
}
