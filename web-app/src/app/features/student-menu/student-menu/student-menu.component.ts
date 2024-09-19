import { Component } from "@angular/core";
import { JobListComponent } from "./job-list/job-list.component";
import { JobsListComponent } from "../../placement-cell/placement-cell/jobs-list/jobs-list.component";

@Component({
  selector: "app-student-menu",
  standalone: true,
  imports: [JobListComponent, JobsListComponent],
  templateUrl: "./student-menu.component.html",
  styleUrl: "./student-menu.component.css",
})
export class StudentMenuComponent {}
