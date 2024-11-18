import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AMGModules } from 'src/AMG-Module/AMG-module';
import { CreateMessageComponent } from './create-message/create-message.component';
import { CreateGroupComponent } from './create-group/create-group.component';

@Component({
  selector: 'app-communication',
  standalone: true,
  imports: [AMGModules, CommonModule, FormsModule],
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.css'],
})

export class CommunicationComponent {
  recentChats = [
    {
      name: 'Usha',
      lastMessage: 'Hey there!',
      time: '10:30 AM',
      photo: '',
      messages: [
        { sender: 'Pallavi', text: 'Hey there!', time: '10:30 AM' },
        { sender: 'You', text: 'Hi!', time: '10:31 AM' },
        { sender: 'You', text: 'In a chat interface...', time: '10:31 AM' },
      ],
      lastMessageTime: '10:30 AM',
    },
    {
      name: 'Pallavi',
      lastMessage: 'How are you?',
      time: '10:00 AM',
      photo: '',
      messages: [
        { sender: 'Pallavi', text: 'How are you?', time: '10:00 AM' },
        { sender: 'You', text: 'I am fine, thank you!', time: '10:01 AM' },
      ],
      lastMessageTime: '10:00 AM',
    },
  ];

  groups = [
    { name: 'Group 1', lastMessage: 'Last message in Group 1', photo: '', time: '10:00 AM' },
    { name: 'Group 2', lastMessage: 'Last message in Group 2', photo: '', time: '10:01 AM' },
  ];

  selectedTab = 'chats';  
  searchQuery = '';
  selectedFile: File | null = null; 
  selectedChat: any;
  selectedGroup: any;
  newMessage: string = '';
  readonly dialog = inject(MatDialog);

  openFileDialog() {
    // Trigger the file input click
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  // Handle file selection
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('Selected file:', file); // You can upload this file as needed
    }
  }

   get filteredChats() {
    return this.recentChats.filter(chat => 
      chat.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  get filteredGroups() {
    return this.groups.filter(group => 
      group.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      group.lastMessage.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  selectChat(chat: any) {
    this.selectedChat = chat;
  }

  selectGroup(group: any) {
    this.selectedGroup = group;
    console.log('Selected group:', group);
  }

  sendMessage() {
    if (this.newMessage.trim() && this.selectedChat) {
      const message = {
        sender: 'You',
        text: this.newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      this.selectedChat.messages.push(message);
      this.selectedChat.lastMessageTime = message.time;
      this.newMessage = '';
    }
  }

  // Open the create message dialog
  openCreateMessage(): void {
    this.dialog.open(CreateMessageComponent, {
      width: '60%',
      height: 'auto',
      maxWidth: '100vw',
    });
  }

  // Open the create group dialog
  openCreateGroup(): void {
    this.dialog.open(CreateGroupComponent, {
      width: '70vw',
      height: '90vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
    });
  }

  // Switch between tabs (chats or groups)
  switchTab(tab: string) {
    this.selectedTab = tab;
  }

  // Filter items based on search query (calls filterChats and filterGroups)
  filterItems() {
    // The getter methods `filteredChats` and `filteredGroups` will automatically handle filtering
  }
}
