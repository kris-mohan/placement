export type InvitationList = {
  invitationid: number;
  recipientName: string;
  recipientEmail: string;
  eventTitle: string;
  eventDate: Date;
  eventLocation: string;
  message: string;
  status: "pending" | "accepted" | "declined";
};
