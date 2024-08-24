import { Component } from "@angular/core";
import { CollegesComponent } from "./colleges/colleges.component";

@Component({
  selector: "app-test-interviews",
  standalone: true,
  imports: [CollegesComponent],
  templateUrl: "./test-interviews.component.html",
  styleUrl: "./test-interviews.component.css",
})
export class TestInterviewsComponent {}
