import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { AMGModules } from 'src/AMG-Module/AMG-module';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-create-message',
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules, FormsModule],
  templateUrl: './create-message.component.html',
  styleUrl: './create-message.component.css',
})
export class CreateMessageComponent {
  searchQuery: string = '';
  messageText: string = '';
  recipients: string[] = ['Alice', 'Bob', 'Charlie', 'David']; // Example recipient list
  filteredRecipients: string[] = [];

  ngOnInit() {
    this.filteredRecipients = this.recipients;
  }

  filterRecipients() {
    this.filteredRecipients = this.recipients.filter((recipient) =>
      recipient.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  sendMessage() {
    if (this.searchQuery && this.messageText) {
      // Logic to send the message
      console.log('Message sent to:', this.searchQuery);
      console.log('Message content:', this.messageText);
    }
  }
}
