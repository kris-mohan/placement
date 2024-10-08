import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  model,
  ChangeDetectorRef,
} from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AMGModules } from 'src/AMG-Module/AMG-module';

@Component({
  selector: 'app-company-calendar',
  standalone: true,
  imports: [AMGModules, CommonModule],
  templateUrl: './company-calendar.component.html',
  styleUrl: './company-calendar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
})
export class CompanyCalendarComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}
  selected = model<Date | null>(null);
  events = [
    {
      companyName: 'Capgemini',
      jobTitle: 'Associate Software Engineer',
      Round: 3,
      RoundName: 'Technical Round',
      eventDate: '05-10-2024',
      timings: '10:00 AM - 12:00 PM',
      duration: '2 hours',
    },
    {
      companyName: 'Accenture',
      jobTitle: 'Software Developer',
      Round: 1,
      RoundName: 'Test Assesment',
      eventDate: '05-10-2024',
      timings: '2:00 PM - 3:30 PM',
      duration: '1.5 hours',
    },
    {
      companyName: 'Google',
      jobTitle: 'QA',
      Round: 2,
      RoundName: 'Interview-1',
      eventDate: '05-10-2024',
      timings: '9:00 AM - 1:00 PM',
      duration: '4 hours',
    },
  ];

  ngOnInit() {
    console.log(this.events);
  }
}
