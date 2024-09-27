import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AMGModules } from 'src/AMG-Module/AMG-module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-profile-management',
  standalone: true,
  imports: [AMGModules, CommonModule, SharedModule],
  templateUrl: './profile-management.component.html',
  styleUrl: './profile-management.component.css'
})
export class ProfileManagementComponent {
  selectedSemester: string = '';
  selectedBoard: string = '';
  selectedScore: string = '';
  selectedCourse: string = '';
  selectedPuScore: string = '';
  selectedSemScore: string = '';
  selectedBlood: string ='';
  selectedDegree: string ='';
  selectedProgram: string ='';
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
    { value: 'Sem 8', viewValue: 'Sem 8' }
  ];
  Boards = [
    {value: 'ICSE', viewValue: 'ICSE'},
    {value: 'CBSE', viewValue: 'CBSE'},
    {value: 'State', viewValue: 'State'}
  ];
  Scores =[
    {value:'Percentage', viewValue:'Percentage'},
    {value:'CGPA', viewValue:'CGPA'}
  ]
  Courses =[
    {value:'PUC', viewValue:'PUC'},
    {value:'Diploma', viewValue:'Diploma'}
  ]
  PuScore =[
    {value:'Percentage', viewValue:'Percentage'},
    {value:'CGPA', viewValue:'CGPA'}
  ]
  SemScore =[
    {value:'Percentage', viewValue:'Percentage'},
    {value:'CGPA', viewValue:'CGPA'}
  ]
  Blood =[
    {value:'A+', viewValue:'A+'},
    {value:'A-', viewValue:'A-'},
    {value:'B+', viewValue:'B+'},
    {value:'B-', viewValue:'B-'},
    {value:'O+', viewValue:'O+'},
    {value:'O-', viewValue:'O-'},
    {value:'AB+', viewValue:'AB+'},
    {value:'AB-', viewValue:'AB-'}
    
  ]
degrees =[
  {value:'Under-Graduate',viewValue:'Under-graduate'},
  {value:'Post-Graduate',viewValue:'Post-Graduate'},
]
Program=[
  {value:'B.A. (Bachelor of Arts)',viewValue:'B.A. (Bachelor of Arts)'},
  {value:'B.Sc. (Bachelor of Science)',viewValue:'B.Sc. (Bachelor of Science)'},
  {value:'B.Com. (Bachelor of Commerce)',viewValue:'B.Com. (Bachelor of Commerce)'},
  {value:'B.E./B.Tech (Bachelor of Engineering/Technology)',viewValue:'B.E./B.Tech (Bachelor of Engineering/Technology)'},
  {value:'BBA (Bachelor of Business Administration)',viewValue:'BBA (Bachelor of Business Administration)'},
  {value:'BCA (Bachelor of Computer Applications)',viewValue:'BCA (Bachelor of Computer Applications)'},
  {value:'LL.B. (Bachelor of Laws)',viewValue:'LL.B. (Bachelor of Laws)'},
  {value:'M.A. (Master of Arts)',viewValue:'M.A. (Master of Arts)'},
  {value:'M.Sc. (Master of Science)',viewValue:'M.Sc. (Master of Science)'},
  {value:'MBA (Master of Business Administration)',viewValue:'MBA (Master of Business Administration)'},
  {value:'M.Tech (Master of Technology)',viewValue:'M.Tech (Master of Technology)'},
  {value:'Diploma in Engineering (Polytechnic)',viewValue:'Diploma in Engineering (Polytechnic)'},
  {value:'MBBS (Bachelor of Medicine and Bachelor of Surgery)',viewValue:'MBBS (Bachelor of Medicine and Bachelor of Surgery)'},
  
]

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

   onBloodChange(event: any) {
    this.selectedBlood = event.value;
    console.log('Selected Blood:', this.selectedBlood);
  }
  onDegreeChange(event: any) {
    this.selectedDegree = event.value;
    console.log('Selected Degree:', this.selectedDegree);
  }
  onProgramChange(event: any) {
    this.selectedProgram= event.value;
    console.log('Selected Program:', this.selectedProgram);
  }
  }
  
