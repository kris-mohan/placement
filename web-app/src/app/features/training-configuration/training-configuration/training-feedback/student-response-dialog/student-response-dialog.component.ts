import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AMGModules } from 'src/AMG-Module/AMG-module';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-student-response-dialog',
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: './student-response-dialog.component.html',
  styleUrl: './student-response-dialog.component.css',
})
export class StudentResponseDialogComponent {
  showDialog = true;
  ratings: number[] = [1, 2, 3, 4, 5]; // Star ratings from 1 to 5
  studentResponses = [
    { question: 'What did you like about the course?', rating: null },
    {
      question: 'What could be improved in the training session?',
      rating: null,
    },
    {
      question: 'Was the material helpful and easy to understand?',
      rating: null,
    },
  ];
}
