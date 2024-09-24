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
  imports: [AMGModules],
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
      eventName: 'Meeting with Client',
      eventDate: '2024-09-22',
      duration: '2 hours',
    },
    {
      eventName: 'Project Presentation',
      eventDate: '2024-09-23',
      duration: '1.5 hours',
    },
    { eventName: 'Team Outing', eventDate: '2024-09-24', duration: '4 hours' },
  ];

  ngOnInit() {
    console.log(this.events);
  }
}
