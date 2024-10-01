import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AMGModules } from 'src/AMG-Module/AMG-module';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [
    AMGModules,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'], // Corrected to 'styleUrls' (plural)
})
export class ForumComponent {
  companiesCard = [
    { name: 'Google',  studentsPlaced: 12, progress: 'In Progress' },
    { name: 'Amazon', studentsPlaced: 8, progress: 'Completed' },
    { name: 'WarpDrive',  studentsPlaced: 5, progress: 'In Progress' },
    { name: 'CipherCode', studentsPlaced: 6, progress: 'In Progress' },
    { name: 'Microsoft', studentsPlaced: 8, progress: 'Completed' },
    { name: 'TechOrigen',  studentsPlaced: 45, progress: 'In Progress' },
    { name: 'Facebook',  studentsPlaced: 14, progress: 'Completed' },
    { name: 'Apple', studentsPlaced: 23, progress: 'Completed' },
  ];

  companyControl = new FormControl(''); // Control for search input
  filteredCompany!: Observable<any[]>; // Observable to handle filtered companies

  constructor(private router: Router) {}

  ngOnInit() {
    // Initialize filteredCompany to filter based on user input
    this.filteredCompany = this.companyControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterCompanies(value || ''))
    );
  }

  // Filter companies based on user input
  filterCompanies(value: string) {
    const filterValue = value.toLowerCase();
    return this.companiesCard.filter((company) =>
      company.name.toLowerCase().includes(filterValue)
    );
  }

  goBack() {
    // Navigate to the previous page in history
    window.history.back();
  }

  openAlumniForum(company: string) {
    // Navigate to AlumniComponent, passing the company name as a route parameter
    this.router.navigate(['/alumni', company]);
  }
}
