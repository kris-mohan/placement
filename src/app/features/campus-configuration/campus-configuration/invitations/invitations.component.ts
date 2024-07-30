import { SelectionModel } from "@angular/cdk/collections";
import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { DialogMessageService } from "src/app/services/dialog-message/dialog-message/dialog-message.service";
import { SweetAlertService } from "src/app/services/sweet-alert-service/sweet-alert-service";
import { SharedModule } from "src/app/shared/shared.module";

export interface InvitationList {
  invitationid: number;
  recipientName: string;
  recipientEmail: string;
  eventTitle: string;
  eventDate: Date;
  eventLocation: string;
  message: string;
  status: "pending" | "accepted" | "declined";
}

export const INVITATION_DATA: InvitationList[] = [
  {
    invitationid: 1,
    recipientName: "John Doe",
    recipientEmail: "john.doe@example.com",
    eventTitle: "Company Annual Meeting",
    eventDate: new Date("2024-08-01T10:00:00"),
    eventLocation: "Conference Room A",
    message:
      "You are invited to our annual meeting to discuss the company's performance and future plans.",
    status: "pending",
  },
  {
    invitationid: 2,
    recipientName: "Jane Smith",
    recipientEmail: "jane.smith@example.com",
    eventTitle: "Project Kickoff",
    eventDate: new Date("2024-08-02T14:00:00"),
    eventLocation: "Client Office",
    message:
      "Join us for the project kickoff meeting with the client to go over the project scope and deliverables.",
    status: "accepted",
  },
  {
    invitationid: 3,
    recipientName: "Alice Johnson",
    recipientEmail: "alice.johnson@example.com",
    eventTitle: "Networking Event",
    eventDate: new Date("2024-08-15T18:00:00"),
    eventLocation: "Downtown Hotel",
    message:
      "We are hosting a networking event with industry professionals. We hope to see you there!",
    status: "declined",
  },
  {
    invitationid: 4,
    recipientName: "Bob Brown",
    recipientEmail: "bob.brown@example.com",
    eventTitle: "Team Building Retreat",
    eventDate: new Date("2024-09-10T09:00:00"),
    eventLocation: "Mountain Resort",
    message:
      "Join us for a team building retreat at the mountain resort to enhance our teamwork and collaboration skills.",
    status: "pending",
  },
  {
    invitationid: 5,
    recipientName: "Catherine Green",
    recipientEmail: "catherine.green@example.com",
    eventTitle: "Product Launch",
    eventDate: new Date("2024-10-05T11:00:00"),
    eventLocation: "Company Headquarters",
    message:
      "We are excited to launch our new product and would like you to be part of this significant event.",
    status: "accepted",
  },
];

@Component({
  selector: "app-invitations",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./invitations.component.html",
  styleUrl: "./invitations.component.css",
})
export class InvitationsComponent {
  constructor(
    private router: Router,
    private dialogService: DialogMessageService,
    private sweetAlertService: SweetAlertService,
    private location: Location
  ) {}
  displayedColumns: string[] = [
    "slNo",
    "invitationid",
    "recipientName",
    "recipientEmail",
    "eventTitle",
    "actions",
  ];
  columns = [
    { key: "slNo", label: "Sl No" },
    { key: "invitationid", label: "Invitation Id" },
    { key: "recipientName", label: "recipientName" },
    { key: "recipientEmail", label: "recipientEmail" },
    { key: "eventTitle", label: "eventTitle" },
    { key: "actions", label: "Actions" },
  ];
  dataSource = new MatTableDataSource<InvitationList>(INVITATION_DATA);
  selection = new SelectionModel<InvitationList>(true, []);

  openAddEditInvitationForm(id?: number) {
    if (id !== undefined) {
      this.router.navigate(["/campus-configuration/addEditInvitation", id]);
    } else {
      this.router.navigate(["/campus-configuration/addEditInvitation", "new"]);
    }
  }

  async deleteInvitation(id: number) {
    const confirmed = await this.sweetAlertService.confirmDelete(
      "Do you really want to delete this Invitation?"
    );
    if (confirmed) {
      this.dataSource.data = this.dataSource.data.filter(
        (company) => company.invitationid !== id
      );
      this.sweetAlertService.success("Invitation deleted successfully!");
    }
  }

  goBack(): void {
    this.location.back();
  }
}
