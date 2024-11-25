import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";
import { FormControl, FormsModule } from "@angular/forms";
import { AMGModules } from "src/AMG-Module/AMG-module";
import { SharedModule } from "src/app/shared/shared.module";
import { CommuicationApiService } from "../communicationApi";
import { Batch } from "src/app/services/types/Batch";
import { Course } from "src/app/services/types/Course";
import { Tblstudent } from "src/app/services/types/Tblstudent";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-create-message",
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules, FormsModule],
  templateUrl: "./create-message.component.html",
  styleUrls: ["./create-message.component.css"],
})
export class CreateMessageComponent {
  // Initialize as empty string to avoid errors
  batchSearchQuery: string = "";
  courseSearchQuery: string = "";
  studentSearchQuery: string = "";

  messageText: string = "";
  batches = signal<Batch[]>([]);
  courses = signal<Course[]>([]);
  students = signal<Tblstudent[]>([]);
  selectedBatch: string = "";
  selectedCourse: string = "";
  selectedStudent: string = "";

  constructor(
    private communicationApiService: CommuicationApiService,
    public dialogRef: MatDialogRef<CreateMessageComponent>
  ) {}

  ngOnInit() {
    this.getBatches();
    this.getCourses();
  }

  getStudents() {
    if (this.selectedBatch) {
      this.communicationApiService
        .GetStudentByBatch(this.selectedBatch)
        .subscribe((users) => {
          this.students.set(users.value);
        });
    }
  }

  getBatches() {
    this.communicationApiService.GetAllBatches().subscribe((batch) => {
      this.batches.set(batch.value);
    });
  }

  getCourses() {
    this.communicationApiService.GetAllCourses().subscribe((course) => {
      this.courses.set(course.value);
    });
  }

  filteredBatches() {
    const filterValue = this.batchSearchQuery;
    if (!filterValue) {
      return this.batches();
    }
    return this.batches().filter((batch) => batch.Name.includes(filterValue));
  }

  filteredCourses() {
    const filterValue = this.courseSearchQuery?.toString().toLowerCase();
    if (!filterValue) {
      return this.courses();
    }
    return this.courses().filter((course) =>
      course?.Name.toLowerCase().includes(filterValue)
    );
  }

  filteredStudents() {
    const filterValue = this.studentSearchQuery
      ?.toString()
      .toLowerCase()
      .trim();
    if (!filterValue) {
      return this.students();
    }
    return this.students().filter(
      (std) =>
        std?.FirstName?.toLowerCase().includes(filterValue) ||
        std?.LastName?.toLowerCase().includes(filterValue)
    );
  }

  onBatchSelected(selectedBatchId: string) {
    this.selectedBatch = selectedBatchId;
    this.getStudents(); // Fetch students when batch is selected
  }

  onCourseSelected(selectedCourseId: string) {
    this.selectedCourse = selectedCourseId;
  }

  onStudentSelected(selectedStudentId: string) {
    this.selectedStudent = selectedStudentId;
  }

  getSelectedBatchName(): string {
    const selectedBatchObject = this.batches().find(
      (batch) => batch.Id === parseInt(this.selectedBatch ?? "0")
    );
    return selectedBatchObject ? selectedBatchObject.Name : "";
  }

  getSelectedCourseName(): string {
    const selectedCourseObject = this.courses().find(
      (course) => course.Id === parseInt(this.selectedCourse ?? "0")
    );
    return selectedCourseObject ? selectedCourseObject.Name : "";
  }

  getSelectedStudentName(): string {
    const selectedStdObject = this.students().find(
      (std) => std.Id === parseInt(this.selectedStudent ?? "0")
    );
    return selectedStdObject
      ? selectedStdObject.FirstName + " " + selectedStdObject.LastName
      : "";
  }

  sendMessage() {
    if (this.batchSearchQuery && this.messageText) {
      const senderId = sessionStorage.getItem("LoginId");
      if (senderId) {
        const messagesData = [];

        const messageData = {
          SenderId: +senderId,
          ReceiverId: this.studentSearchQuery,
          MessageText: this.messageText,
          ChatId: 0,
        };
        messagesData.push(messageData);

        const Chat = {
          SenderId: +senderId,
          ReceiverId: this.studentSearchQuery,
          Messages: messagesData,
        };

        this.communicationApiService.SendMessage(Chat).subscribe({
          next: (response) => {
            if (response.success) {
              this.dialogRef.close();
            }
          },
          error: (err) => {
            console.error("Error sending message:", err);
          },
        });
      }
    }
  }
}
