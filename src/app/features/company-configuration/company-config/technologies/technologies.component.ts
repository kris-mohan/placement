import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AMGModules } from 'src/AMG-Module/AMG-module';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: "app-technologies",
  standalone: true,
  imports: [CommonModule, AMGModules, SharedModule],
  templateUrl: "./technologies.component.html",
  styleUrl: "./technologies.component.css",
})
export class TechnologiesComponent {}
