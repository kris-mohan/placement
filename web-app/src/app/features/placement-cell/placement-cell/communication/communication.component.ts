import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { CreateMessageComponent } from "./create-message/create-message.component";
import { CreateGroupComponent } from "./create-group/create-group.component";
import { CommuicationApiService } from "./communicationApi";
import { Messages, TransformedChat } from "src/app/services/types/Messages";

@Component({
  selector: "app-communication",
  standalone: true,
  imports: [AMGModules, CommonModule, FormsModule],
  templateUrl: "./communication.component.html",
  styleUrls: ["./communication.component.css"],
})
export class CommunicationComponent {
  constructor(private communicationApiService: CommuicationApiService) {}
  loginId = sessionStorage.getItem("LoginId");
  chats = signal<Messages[]>([]);
  recentChats = signal<TransformedChat[]>([]);

  ngOnInit() {
    this.recentCommunication();
  }

  recentCommunication() {
    const LoginId = this.loginId;
    if (LoginId) {
      this.communicationApiService.GetRecentChats(LoginId).subscribe((chats) => {
        const transformedChats = chats?.value?.map((chat: any) => {
          const messages = chat?.Messages?.map((msg: any) => ({
            id: msg?.Id || 0,
            sender: msg?.SenderId === +LoginId ? "You" : msg?.Sender?.UserName || "Unknown",
            text: msg?.MessageText || "",
            time: new Date().toLocaleTimeString(),
            receiver: msg?.ReceiverId || null,
            CreatedDate: msg?.CreatedDate || null,
          })) || [];
  
          const partnerName = chat?.SenderId === +LoginId
            ? chat?.Messages?.[0]?.Receiver?.UserName || "Unknown"
            : chat?.Messages?.[0]?.Sender?.UserName || "Unknown";
  
          const lastMessage = chat?.Messages?.length
            ? chat.Messages[chat.Messages.length - 1]?.MessageText || ""
            : "";
  
          const lastMessageTime = new Date().toLocaleTimeString();
  
          return {
            id: chat?.Id || 0,
            receiver: chat?.ReceiverId || null,
            name: partnerName,
            lastMessage: lastMessage,
            time: lastMessageTime,
            photo: "", 
            messages: messages,
            lastMessageTime: lastMessageTime,
          };

        }
      ) || [];
  
        this.recentChats.set([...transformedChats]);
      }, (error) => {
        console.error('Error fetching recent chats:', error);
      });
    }
  }

  getChatKey(senderId: number, receiverId: number): string {
    return senderId < receiverId
      ? `${senderId}-${receiverId}`
      : `${receiverId}-${senderId}`;
  }

  groups = [
    {
      name: "Group 1",
      lastMessage: "Last message in Group 1",
      photo: "",
      time: "10:00 AM",
    },
    {
      name: "Group 2",
      lastMessage: "Last message in Group 2",
      photo: "",
      time: "10:01 AM",
    },
  ];

  selectedTab = "chats";
  searchQuery = "";
  selectedFile: File | null = null;
  selectedChat: any;
  selectedGroup: any;
  newMessage: string = "";

  readonly dialog = inject(MatDialog);

  openFileDialog() {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log("Selected file:", file);
    }
  }

  get filteredChats() {
    const chats = this.recentChats();
    return chats.filter(
      (chat) =>
        chat.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  get filteredGroups() {
    return this.groups.filter(
      (group) =>
        group.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        group.lastMessage.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  selectChat(chat: any) {
    this.selectedChat = chat;
  }

  selectGroup(group: any) {
    this.selectedGroup = group;
    console.log("Selected group:", group);
  }
  async sendMessage() {
    if (this.newMessage.trim() && this.selectedChat) {
      const uiMessage = {
        sender: "You",
        text: this.newMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        receiver:this.selectedChat.receiver
      };

      this.selectedChat.messages.push(uiMessage);
      this.selectedChat.lastMessageTime = uiMessage.time;

      this.newMessage = "";

      await this.UpdateMessages();
    }
  }

  UpdateMessages() {
    const SenderId = this.loginId;
    if (this.selectedChat && SenderId) { 
      const apiMessages = this.selectedChat.messages.map((msg: any) => {
        return {
          Id : msg.id ? msg.id : 0,
          SenderId: msg.sender === "You" ? +SenderId : msg.sender, 
          ReceiverId: this.selectedChat.receiver,
          ChatId: this.selectedChat.id,
          MessageText: msg.text,
          CreatedDate: msg.CreatedDate ? msg.CreatedDate : new Date().toISOString(),
        };
      });
  
      const updateData = {
        Id: this.selectedChat.id,
        Messages: apiMessages,
      };
  
      this.communicationApiService
        .SendNewMessages(updateData.Id, updateData)
        .subscribe(
          (response) => {
            console.log("Messages updated successfully:", response);
          },
          (error) => {
            console.error("Error updating messages:", error);
          }
        );
    } else {
      console.warn("Cannot update messages: selectedChat or loginId is null");
    }
  }
  

  openCreateMessage(): void {
    this.dialog.open(CreateMessageComponent, {
      width: "60%",
      height: "auto",
      maxWidth: "100vw",
    });
  }

  openCreateGroup(): void {
    this.dialog.open(CreateGroupComponent, {
      width: "70vw",
      height: "90vh",
      maxWidth: "100vw",
      maxHeight: "100vh",
    });
  }

  switchTab(tab: string) {
    this.selectedTab = tab;
  }

  filterItems() {}
}
