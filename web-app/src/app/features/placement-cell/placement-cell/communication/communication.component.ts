import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AMGModules } from 'src/AMG-Module/AMG-module';
import { CreateMessageComponent } from './create-message/create-message.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { CompanyAPIService } from 'src/app/features/company-configuration/company-config/companies/api.companies';
import { BaseTreeControl } from '@angular/cdk/tree';

@Component({
  selector: 'app-communication',
  standalone: true,
  imports: [AMGModules, CommonModule, FormsModule],
  templateUrl: './communication.component.html',
  styleUrl: './communication.component.css',
})
export class CommunicationComponent {
  recentChats = [
    {
      name: 'Usha',
      lastMessage: 'Hey there!',
      time: '10:30 AM',
      messages: [
        { sender: 'Pallavi', text: 'Hey there!', time: '10:30 AM' },
        { sender: 'You', text: 'Hi!', time: '10:31 AM' },
        {
          sender: 'You',
          text: 'In a chat interface, it’s important to create a clear distinction between messages sent by the user and those received from others. By aligning the sendes messages to the left, the conversation becomes easier to follow. Additionally, keeping the message input field fixed at the bottom ensures a smooth user experience, allowing for easy interaction and message sending without disrupting the flow of the chat.',
          time: '10:31 AM',
        },
        {
          sender: 'Pallavi',
          text: 'In a chat interface, it’s important to create a clear distinction between messages sent by the user and those received from others. By aligning the sendes messages to the left, the conversation becomes easier to follow. Additionally, keeping the message input field fixed at the bottom ensures a smooth user experience, allowing for easy interaction and message sending without disrupting the flow of the chat.',
          time: '10:31 AM',
        },
        {
          sender: 'You',
          text: 'In a chat interface, it’s important to create a clear distinction between messages sent by the user and those received from others. By aligning the sendes messages to the left, the conversation becomes easier to follow. Additionally, keeping the message input field fixed at the bottom ensures a smooth user experience, allowing for easy interaction and message sending without disrupting the flow of the chat.',
          time: '10:31 AM',
        },
        {
          sender: 'Pallavi',
          text: 'In a chat interface, it’s important to create a clear distinction between messages sent by the user and those received from others. By aligning the sendes messages to the left, the conversation becomes easier to follow. Additionally, keeping the message input field fixed at the bottom ensures a smooth user experience, allowing for easy interaction and message sending without disrupting the flow of the chat.',
          time: '10:31 AM',
        },
        {
          sender: 'You',
          text: 'In a chat interface, it’s important to create a clear distinction between messages sent by the user and those received from others. By aligning the sendes messages to the left, the conversation becomes easier to follow. Additionally, keeping the message input field fixed at the bottom ensures a smooth user experience, allowing for easy interaction and message sending without disrupting the flow of the chat.',
          time: '10:31 AM',
        },
      ],
      lastMessageTime: '10:30 AM',
    },
    {
      name: 'Pallavi',
      lastMessage: 'How are you?',
      time: '10:00 AM',
      messages: [
        { sender: 'Pallavi', text: 'How are you?', time: '10:00 AM' },
        { sender: 'You', text: 'I am fine, thank you!', time: '10:01 AM' },
      ],
      lastMessageTime: '10:00 AM',
    },
    {
      name: 'Akhil',
      lastMessage: 'How are you?',
      time: '10:00 AM',
      messages: [
        { sender: 'Akhil', text: 'How are you?', time: '10:00 AM' },
        { sender: 'You', text: 'I am fine, thank you!', time: '10:01 AM' },
      ],
      lastMessageTime: '10:00 AM',
    },
    {
      name: 'Vaishnavi',
      lastMessage: 'How are you?',
      time: '10:00 AM',
      messages: [
        { sender: 'Vaishnavi', text: 'How are you?', time: '10:00 AM' },
        { sender: 'You', text: 'I am fine, thank you!', time: '10:01 AM' },
      ],
      lastMessageTime: '10:00 AM',
    },
  ];

  selectedChat: any = null;
  newMessage: string = '';
  readonly dialog = inject(MatDialog);

  selectChat(chat: any) {
    this.selectedChat = chat;
  }

  sendMessage() {
    if (this.newMessage.trim() && this.selectedChat) {
      const message = {
        sender: 'You',
        text: this.newMessage,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      this.selectedChat.messages.push(message);
      this.selectedChat.lastMessageTime = message.time;
      this.newMessage = '';
    }
  }

  openCreateMessage(): void {
    this.dialog.open(CreateMessageComponent, {
      width: '60%',
      height: 'auto',
      maxWidth: '100vw',
      // data: survey,
    });
  }

  openCreateGroup(): void {
    this.dialog.open(CreateGroupComponent, {
      width: '70vw',
      height: '90vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
    });
  }
}


