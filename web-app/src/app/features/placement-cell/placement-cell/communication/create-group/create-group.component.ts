import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { CommuicationApiService } from "../communicationApi";
import { Tblstudent } from "src/app/services/types/Tblstudent";
import { Batch } from "src/app/services/types/Batch";
import { Course } from "src/app/services/types/Course";
import { CreateMessageComponent } from "../create-message/create-message.component";
import { MatDialogRef } from "@angular/material/dialog";
import { GroupService } from "src/app/services/refresh/groupService";

@Component({
  selector: "app-create-group",
  standalone: true,
  imports: [AMGModules, CommonModule, FormsModule],
  templateUrl: "./create-group.component.html",
  styleUrls: ["./create-group.component.css"],
})


export class CreateGroupComponent {
  // Signals for data binding
  students = signal<Tblstudent[]>([]);
  batches = signal<Batch[]>([]);
  branches = signal<Course[]>([]);
  selectedStudents = signal<Set<string>>(new Set()); // Track selected students by IDs
  loginId = sessionStorage.getItem("LoginId");

  // Form-related variables
  groupName: string = "";
  groupDescription: string = "";
  selectedBatches: number[] = [];
  selectedBranches: number[] = [];
  filteredStudents: Tblstudent[] = [];

  constructor(
    private communicationApiService: CommuicationApiService,
    public dialogRef: MatDialogRef<CreateMessageComponent>,
    private groupService: GroupService
  ) {}

  ngOnInit() {
    this.loadInitialData();
  }

  // Load data from APIs
  private loadInitialData() {
    this.fetchStudentDetails();
    this.fetchBatches();
    this.fetchBranches();
  }

  private fetchStudentDetails() {
    this.communicationApiService.GetStudentDetails().subscribe(
      (response) => {
        this.students.set(response.value);
        this.filteredStudents = this.students(); // Initially, show all students
        console.log(response.value, "Students data");
      },
      (error) => {
        console.error(
          "Error fetching student details:",
          error || "Unknown error"
        );
      }
    );
  }

  private fetchBatches() {
    this.communicationApiService.GetAllBatches().subscribe(
      (response) => this.batches.set(response.value),
      (error) => {
        console.error("Error fetching batches:", error || "Unknown error");
      }
    );
  }

  private fetchBranches() {
    this.communicationApiService.GetAllCourses().subscribe(
      (response) => this.branches.set(response.value),
      (error) => {
        console.error("Error fetching branches:", error || "Unknown error");
      }
    );
  }

  filterStudents() {
    this.filteredStudents = this.students().filter((student) => {
      // Check if student matches selected batches
      const matchesBatch = this.selectedBatches.length
        ? this.selectedBatches.some((batchId) => batchId === student?.BatchId)
        : true;

      // Check if student matches selected branches (courses)
      const matchesBranch = this.selectedBranches.length
        ? student.Studentacademics.some((academic) =>
            this.selectedBranches.includes(academic?.CourseId)
          )
        : true;

      // If both are selected, ensure student matches both batch and branch
      if (this.selectedBatches.length > 0 && this.selectedBranches.length > 0) {
        return matchesBatch && matchesBranch;
      }

      // If only batch is selected, return students that match the batch
      if (this.selectedBatches.length > 0) {
        return matchesBatch;
      }

      // If only branch is selected, return students that match the branch
      if (this.selectedBranches.length > 0) {
        return matchesBranch;
      }

      // If neither batch nor branch is selected, show all students
      return true;
    });
  }

  selectAllStudents(selected: boolean) {
    const currentSelections = new Set(
      selected ? this.filteredStudents.map((s) => s.Id.toString()) : []
    );
    this.selectedStudents.set(currentSelections);
  }

  // Handle individual student selection
  toggleStudentSelection(studentId: string, selected: boolean) {
    const currentSelections = new Set(this.selectedStudents());
    if (selected && studentId != "") {
      currentSelections.add(studentId);
    } else {
      currentSelections.delete(studentId);
    }
    this.selectedStudents.set(currentSelections);
  }

  // Create group logic
  createGroup() {
    const selectedMembers = Array.from(this.selectedStudents());

    if (
      !this.groupName.trim() ||
      !this.groupDescription.trim() ||
      selectedMembers.length === 0
    ) {
      console.warn("Please provide all required inputs and select members.");
      return;
    }

    const groupMembers = selectedMembers.map((studentId) => ({
      Id: 0,
      GroupId: 0,
      UserId: +studentId,
    }));
    if (this.loginId) {
      groupMembers.push({ Id: 0, GroupId: 0, UserId: +this.loginId });
    }

    const groupData = {
      GroupName: this.groupName,
      GroupDescription: this.groupDescription,
      Groupmembers: groupMembers,
    };

    this.communicationApiService.createGroup(groupData).subscribe({
      next: (response) => {
        if (response.success) {
          if (response.success) {
            this.dialogRef.close();
  
            this.groupService.triggerGroupRefresh();
          }
        }
      },
      error: (err) => {
        console.error("Error sending message:", err);
      },
    });
  }
}
