import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { GroupMembers } from "src/app/services/types/GroupMembers";
import { SharedModule } from "src/app/shared/shared.module";
import { CommuicationApiService } from "../communicationApi";
import { MatDialog } from "@angular/material/dialog";

import { ODataResponse } from "../../placement-interview/placement-interview.component";

@Component({
  selector: "app-group-members",
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: "./group-members.component.html",
  styleUrl: "./group-members.component.css",
})
export class GroupMembersComponent {
  groupMemberNames: GroupMembers[] = [];

  constructor(private communicationApiService: CommuicationApiService,  private dialog: MatDialog
  )  {}
  closeDialog(): void {
    this.dialog.closeAll(); 
  }
  ngOnInit() {
    this.getGroupMembernames();
  }

  getGroupMembernames() {
    this.communicationApiService.GetGroupMemberNames().subscribe({
      next: (response: ODataResponse<any>) => {
        console.log("Group:", response);
        this.groupMemberNames = response.value;
      },
      error: (error) => {
        console.error("Error loading Group Members", error);
      },
    });
  }
}
