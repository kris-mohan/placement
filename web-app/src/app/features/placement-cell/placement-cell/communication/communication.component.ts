import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { CreateMessageComponent } from "./create-message/create-message.component";
import { GroupMembersComponent } from "./group-members/group-members.component";

import { CreateGroupComponent } from "./create-group/create-group.component";
import { CommuicationApiService } from "./communicationApi";
import { Messages, TransformedChat } from "src/app/services/types/Messages";
import { Subscription } from "rxjs";
import { GroupService } from "src/app/services/refresh/groupService";

@Component({
  selector: "app-communication",
  standalone: true,
  imports: [AMGModules, CommonModule, FormsModule],
  templateUrl: "./communication.component.html",
  styleUrls: ["./communication.component.css"],
})
export class CommunicationComponent {
  CampusId: number;

  constructor(
    private communicationApiService: CommuicationApiService,
    private groupService: GroupService
  ) {
    const storedCampusId = sessionStorage.getItem("CampusId");
    this.CampusId = storedCampusId ? parseInt(storedCampusId) : 0;
    console.log("CampusId", this.CampusId);
  }
  loginId = sessionStorage.getItem("LoginId");
  chats = signal<Messages[]>([]);
  recentChats = signal<TransformedChat[]>([]);
  recentgroups = signal<TransformedChat[]>([]);
  private groupRefreshSubscription!: Subscription;

  ngOnInit() {
    this.recentCommunication();
    this.fetchGroups();
    this.groupRefreshSubscription = this.groupService.refreshGroups$.subscribe(
      () => {
        this.fetchGroups();
      }
    );
  }

  recentCommunication() {
    const LoginId = this.loginId;
    if (LoginId) {
      this.communicationApiService.GetRecentChats(LoginId).subscribe(
        (chats) => {
          const transformedChats =
            chats?.value?.map((chat: any) => {
              const messages =
                chat?.Messages?.map((msg: any) => ({
                  id: msg?.Id || 0,
                  sender:
                    msg?.SenderId === +LoginId
                      ? "You"
                      : msg?.Sender?.UserName || "Unknown",
                  text: msg?.MessageText || "",
                  time: new Date().toLocaleTimeString(),
                  receiver: msg?.ReceiverId || null,
                  CreatedDate: msg?.CreatedDate || null,
                })) || [];

              const partnerName =
                chat?.SenderId === +LoginId
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
            }) || [];

          this.recentChats.set([...transformedChats]);
        },
        (error) => {
          console.error("Error fetching recent chats:", error);
        }
      );
    }
  }

  fetchGroups() {
    const LogId = this.loginId;

    // Handle missing login ID
    if (!LogId) {
      console.error("Login ID is missing.");
      return;
    }

    this.communicationApiService.GetGroups(LogId).subscribe(
      (groups) => {
        if (groups?.value) {
          const transformedChats = groups.value.map((grp: any) => ({
            id: grp?.Id || 0,
            name: grp?.GroupName || "",
            photo: "", // 
            messages:
              grp?.Messages?.map((msg: any) => ({
                id: msg?.Id || 0,
                sender:
                  msg?.SenderId === +LogId
                    ? "You"
                    : msg?.Sender?.UserName || "Unknown",
                text: msg?.MessageText || "",
                time: msg?.CreatedDate
                  ? new Date(msg.CreatedDate).toLocaleTimeString()
                  : "Unknown",
                receiver: msg?.ReceiverId || null,
                CreatedDate: msg?.CreatedDate || null,
              })) || [],
            lastMessage: grp?.Messages?.length
              ? grp.Messages[grp.Messages.length - 1]?.MessageText || ""
              : "",
            lastMessageTime: grp?.Messages?.length
              ? new Date(
                  grp.Messages[grp.Messages.length - 1]?.CreatedDate
                ).toLocaleTimeString()
              : "Unknown",
          }));

          // Update recent groups
          this.recentgroups.set([...transformedChats]);
        }
      },
      (error) => {
        console.error("Error fetching groups:", error);
      }
    );
  }

  sendGroupMessage() {
    if (this.newMessage.trim() && this.selectedGroup) {
      const messageData = {
        senderId: this.loginId,
        groupId: this.selectedGroup.id,
        messageText: this.newMessage,
        createdDate: new Date().toISOString(),
      };

      // this.communicationApiService.SendGroupMessage(messageData).subscribe(
      //   (response) => {
      //     this.selectedGroup.messages.push({
      //       sender: "You",
      //       text: this.newMessage,
      //       time: new Date().toLocaleTimeString(),
      //     });
      //     this.newMessage = "";
      //   },
      //   (error) => console.error("Error sending group message:", error)
      // );
    }
  }

  getChatKey(senderId: number, receiverId: number): string {
    return senderId < receiverId
      ? `${senderId}-${receiverId}`
      : `${receiverId}-${senderId}`;
  }

  // groups = [
  //   {
  //     name: "Group 1",
  //     lastMessage: "Last message in Group 1",
  //     photo: "",
  //     time: "10:00 AM",
  //   },
  //   {
  //     name: "Group 2",
  //     lastMessage: "Last message in Group 2",
  //     photo: "",
  //     time: "10:01 AM",
  //   },
  // ];

  selectedTab = "chats";
  searchQuery = "";
  selectedFile: File | null = null;
  selectedChat: any;
  selectedGroup: any;
  newMessage: string = "";
  activeChat: boolean = false;
  activeGroup: boolean = false;

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
    const groups = this.recentgroups();
    return groups.filter(
      (group) =>
        group.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        group.lastMessage.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  selectChat(chat: TransformedChat) {
    this.selectedChat = chat;
    this.selectedGroup = null; // Reset selected group
  }

  selectGroup(group: TransformedChat) {
    this.selectedGroup = group;
    this.selectedChat = null; // Reset selected chat
  }

  async sendMessage() {
    const uiMessage = {
      sender: "You",
      text: this.newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      receiver: this.selectedChat?.receiver,
    };
    if (this.newMessage.trim() && this.selectedChat) {
      this.selectedChat.messages.push(uiMessage);
      this.selectedChat.lastMessageTime = uiMessage.time;
      this.newMessage = "";
      await this.UpdateMessages();
    } else if (this.newMessage.trim() && this.selectedGroup) {
      this.selectedGroup.messages.push(uiMessage);
      this.selectedGroup.lastMessageTime = uiMessage.time;
      this.newMessage = "";
      await this.SendGroupMessages();
    }
  }

  SendGroupMessages() {
    const SenderId = this.loginId;
    if (this.selectedGroup && SenderId) {
      const apiMessages = this.selectedGroup.messages.map((msg: any) => {
        return {
          Id: msg.id ? msg.id : 0,
          SenderId: msg.sender === "You" ? +SenderId : msg.sender,
          GroupId: this.selectedGroup.id,
          MessageText: msg.text,
          CreatedDate: msg.CreatedDate
            ? msg.CreatedDate
            : new Date().toISOString(),
        };
      });

      const updateData = {
        Id: this.selectedGroup.id,
        Messages: apiMessages,
      };

      this.communicationApiService
        .SendGroupMessages(updateData.Id, updateData)
        .subscribe(
          (response) => {
            console.log("Messages updated successfully:", response);
          },
          (error) => {
            console.error("Error updating messages:", error);
          }
        );
    }
  }

  UpdateMessages() {
    const SenderId = this.loginId;
    if (this.selectedChat && SenderId) {
      const apiMessages = this.selectedChat.messages.map((msg: any) => {
        return {
          Id: msg.id ? msg.id : 0,
          SenderId: msg.sender === "You" ? +SenderId : msg.sender,
          ReceiverId: this.selectedChat.receiver,
          ChatId: this.selectedChat.id,
          MessageText: msg.text,
          CreatedDate: msg.CreatedDate
            ? msg.CreatedDate
            : new Date().toISOString(),
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

  openGroupMembersDialog(): void {
    this.dialog.open(GroupMembersComponent, {
      width: "40%",
      height: "auto",
      maxWidth: "50vw",
      panelClass: "custom-dialog-container",
    });
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
