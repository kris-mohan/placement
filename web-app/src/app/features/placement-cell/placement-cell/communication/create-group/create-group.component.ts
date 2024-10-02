import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AMGModules } from 'src/AMG-Module/AMG-module';

@Component({
  selector: 'app-create-group',
  standalone: true,
  imports: [AMGModules, CommonModule, FormsModule],
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.css',
})
export class CreateGroupComponent {
  groupName: string = '';
  groupDescription: string = '';
  batches = ['2023-24', '2022-23', '2021-22'];
  branches = ['CS', 'ISE', 'EC', 'ME', 'CV'];
  students = [
    { name: 'John Doe', batch: '2023-24', branch: 'CS', selected: false },
    { name: 'Jane Smith', batch: '2022-23', branch: 'ISE', selected: false },
    { name: 'Alice Brown', batch: '2021-22', branch: 'EC', selected: false },
    { name: 'Chris Brown', batch: '2021-22', branch: 'EC', selected: false },
    { name: 'John Brown', batch: '2023-24', branch: 'EC', selected: false },
    { name: 'William Brown', batch: '2022-23', branch: 'EC', selected: false },
    { name: 'Elli Brown', batch: '2021-22', branch: 'EC', selected: false },
    { name: 'Emily Brown', batch: '2022-23', branch: 'EC', selected: false },
    { name: 'Alice Brown', batch: '2023-24', branch: 'EC', selected: false },
    { name: 'Matt Brown', batch: '2022-23', branch: 'EC', selected: false },
    { name: 'Ian Brown', batch: '2021-22', branch: 'EC', selected: false },
  ];
  filteredStudents = [...this.students];
  selectedBatches: string[] = [];
  selectedBranches: string[] = [];

  filterStudents() {
    this.filteredStudents = this.students.filter((student) => {
      const matchesBatch = this.selectedBatches.length
        ? this.selectedBatches.includes(student.batch)
        : true;
      const matchesBranch = this.selectedBranches.length
        ? this.selectedBranches.includes(student.branch)
        : true;
      return matchesBatch && matchesBranch;
    });
  }
  selectAllStudents(selected: boolean) {
    this.filteredStudents.forEach((student) => {
      student.selected = selected;
    });
  }

  createGroup() {
    const selectedMembers = this.students.filter((student) => student.selected);
    console.log('Group Name:', this.groupName);
    console.log('Group Description:', this.groupDescription);
    console.log('Selected members for the group:', selectedMembers);
    // Logic to create the group and add it to recent chats
  }
}
