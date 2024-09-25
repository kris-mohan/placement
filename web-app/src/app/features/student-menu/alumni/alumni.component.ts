
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { AMGModules } from 'src/AMG-Module/AMG-module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'student-alumni',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule,AMGModules, CommonModule, SharedModule],
  templateUrl: './alumni.component.html',
  styleUrl: './alumni.component.css'
})
export class AlumniComponent {
  
}
