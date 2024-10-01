import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { AMGModules } from 'src/AMG-Module/AMG-module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'student-alumni',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    AMGModules,
    CommonModule,
    SharedModule
  ],
  templateUrl: './alumni.component.html',
  styleUrls: ['./alumni.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlumniComponent {
  companies: string[] = ['Google', 'Microsoft', 'Amazon', 'Facebook', 'Apple'];
  alumniData = [
    { company: 'Google', name: 'John Doe', batch: '2020', position: 'Software Engineer' },
    { company: 'Google', name: 'Jane Smith', batch: '2019', position: 'Data Scientist' },
    
    { company: 'Amazon', name: 'Robert Brown', batch: '2020', position: 'DevOps Engineer' },
    { company: 'Amazon', name: 'Emily Davis', batch: '2022', position: 'Data Analyst' },
    
    { company: 'WarpDrive', name: 'Michael Green', batch: '2021', position: 'Full Stack Developer' },
    { company: 'WarpDrive', name: 'Jessica Thompson', batch: '2019', position: 'Frontend Engineer' },
    
    { company: 'CipherCode', name: 'Brian Adams', batch: '2020', position: 'Machine Learning Engineer' },
    { company: 'CipherCode', name: 'Samantha Carter', batch: '2022', position: 'Data Analyst' },
    
    { company: 'Microsoft', name: 'Alice Johnson', batch: '2021', position: 'Cloud Engineer' },
    { company: 'Microsoft', name: 'Daniel Harris', batch: '2020', position: 'Backend Engineer' },
    
    { company: 'TechOrigen', name: 'Kevin Scott', batch: '2022', position: 'DevOps Engineer' },
    { company: 'TechOrigen', name: 'Sophia Lopez', batch: '2021', position: 'Site Reliability Engineer' },
    
    { company: 'Facebook', name: 'David Wilson', batch: '2018', position: 'Product Manager' },
    { company: 'Facebook', name: 'Laura Young', batch: '2020', position: 'Business Analyst' },
    
    { company: 'Apple', name: 'Sarah Parker', batch: '2019', position: 'UX Designer' },
    { company: 'Apple', name: 'William Martinez', batch: '2021', position: 'iOS Developer' }
  ];
  
  selectedCompany: string = '';
  filteredAlumni: any[] = [];
  selectedAlumni: any = null;
  messages: any[] = [];
  newMessage: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the company name from the route parameters
    this.route.paramMap.subscribe(params => {
      this.selectedCompany = params.get('company') || '';
      if (this.selectedCompany) {
        this.filteredAlumni = this.alumniData.filter(alumni => alumni.company === this.selectedCompany);
      }
    });
  }

  onCompanySelect(event: MatSelectChange) {
    this.selectedCompany = event.value;
    this.filteredAlumni = this.alumniData.filter(alumni => alumni.company === this.selectedCompany);
    this.selectedAlumni = null;
    this.messages = [];
  }

  chatWithAlumni(alumni: any) {
    this.selectedAlumni = alumni;
    this.messages = []; // Clear chat when a new alumni is selected
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ sender: 'student', content: this.newMessage });
      this.newMessage = '';

      // Simulate alumni response
      setTimeout(() => {
        this.messages.push({ sender: 'alumni', content: 'Thank you for reaching out! How can I help you?' });
      }, 1000);
    }
  }
}
