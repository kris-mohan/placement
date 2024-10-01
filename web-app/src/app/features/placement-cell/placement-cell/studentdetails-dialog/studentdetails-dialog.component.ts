import { Component } from '@angular/core';
import { AMGModules } from 'src/AMG-Module/AMG-module';

@Component({
  selector: 'app-studentdetails-dialog',
  standalone: true,
  imports: [AMGModules],
  templateUrl: './studentdetails-dialog.component.html',
  styleUrl: './studentdetails-dialog.component.css',
})
export class StudentdetailsDialogComponent {
  displayedSkillsColumns: string[] = [
    'skillName',
    'proficiencyLevel',
    'verified',
  ];
  displayedStatusColumns: string[] = ['companyName', 'status', 'interviewDate'];

  skillsData = [
    { name: 'HTML + CSS', level: 'Beginner', verified: 'Yes' },
    { name: 'JavaScript', level: 'Intermediate', verified: 'No' },
    { name: 'Python3', level: 'Advanced', verified: 'Yes' },
  ];

  statusData = [
    { company: 'Google', currentStatus: 'Selected', date: '15th Sep 2024' },
    {
      company: 'Microsoft',
      currentStatus: 'In Progress',
      date: '22nd Sep 2024',
    },
    { company: 'Infosys', currentStatus: 'Unselected', date: '10th Sep 2024' },
  ];
}
