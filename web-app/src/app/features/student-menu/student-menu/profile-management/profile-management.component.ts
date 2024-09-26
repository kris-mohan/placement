import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { AMGModules } from 'src/AMG-Module/AMG-module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-profile-management',
  standalone: true,
  imports: [AMGModules, CommonModule, SharedModule],
  templateUrl: './profile-management.component.html',
  styleUrl: './profile-management.component.css',
})
export class ProfileManagementComponent {
  selectedSemester: string = '';
  selectedBoard: string = '';
  selectedScore: string = '';
  selectedCourse: string = '';
  selectedPuScore: string = '';
  selectedSemScore: string = '';
  semesters = [{ score: '', type: '', file: null }];
  showSemester = false;
  fileError: string | null = null;
  Semesters = [
    { value: 'Sem 1', viewValue: 'Sem 1' },
    { value: 'Sem 2', viewValue: 'Sem 2' },
    { value: 'Sem 3', viewValue: 'Sem 3' },
    { value: 'Sem 4', viewValue: 'Sem 4' },
    { value: 'Sem 5', viewValue: 'Sem 5' },
    { value: 'Sem 6', viewValue: 'Sem 6' },
    { value: 'Sem 7', viewValue: 'Sem 7' },
    { value: 'Sem 8', viewValue: 'Sem 8' },
  ];
  Boards = [
    { value: 'ICSE', viewValue: 'ICSE' },
    { value: 'CBSE', viewValue: 'CBSE' },
    { value: 'State', viewValue: 'State' },
  ];
  Scores = [
    { value: 'Percentage', viewValue: 'Percentage' },
    { value: 'CGPA', viewValue: 'CGPA' },
  ];
  Courses = [
    { value: 'PUC', viewValue: 'PUC' },
    { value: 'Diploma', viewValue: 'Diploma' },
  ];
  PuScore = [
    { value: 'Percentage', viewValue: 'Percentage' },
    { value: 'CGPA', viewValue: 'CGPA' },
  ];
  SemScore = [
    { value: 'Percentage', viewValue: 'Percentage' },
    { value: 'CGPA', viewValue: 'CGPA' },
  ];

  constructor(private location: Location) {}

  
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Add any validation for the file here (type, size, etc.)
      this.fileError = null; // Reset error if valid
    } else {
      this.fileError = 'Please select a file.';
    }
  }

  addSemester() {
    this.semesters.push({ score: '', type: '', file: null });
  }

  onSemesterChange(event: any) {
    this.selectedSemester = event.value;
    console.log('Selected semester:', this.selectedSemester);
  }

  onBoardChange(event: any) {
    this.selectedBoard = event.value;
    console.log('Selected Board:', this.selectedBoard);
  }

  onScoreChange(event: any) {
    this.selectedScore = event.value;
    console.log('Selected Score:', this.selectedScore);
  }

  onCourseChange(event: any) {
    this.selectedCourse = event.value;
    console.log('Selected course:', this.selectedCourse);
  }

  onPuScoreChange(event: any) {
    this.selectedPuScore = event.value;
    console.log('Selected puscore:', this.selectedPuScore);
  }

  onSemScoreChange(event: any) {
    this.selectedSemScore = event.value;
    console.log('Selected semscore:', this.selectedSemScore);
  }

  goBack(): void {
    this.location.back();
  }
}
