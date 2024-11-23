export type Messages = {
    Id: number;
    SenderId: number;
    Receiver: { UserName: string };
    Sender: { UserName: string };
    MessageText: string;
  }

  export type TransformedChat = {
    id: number;
    name: string;
    lastMessage: string;
    photo : string;
    messages: {
      sender: string;
      text: string;
      time: string;
    }[];
    time: string;
    lastMessageTime : string;
  }