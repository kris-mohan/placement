import { Component } from '@angular/core';
import { AMGModules } from 'src/AMG-Module/AMG-module';
import { FormsModule, ReactiveFormsModule, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { CommonModule } from '@angular/common';

function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const validPhone = /^[0-9]{10}$/;
    const isValid = validPhone.test(control.value);
    return isValid ? null : { phone: true };
  };
}

@Component({
  selector: 'app-resume-builder',
  standalone: true,
  imports: [AMGModules,CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatChipsModule, MatIconModule],
  templateUrl: './resume-builder.component.html',
  styleUrls: ['./resume-builder.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeBuilderComponent {
  
  phone = new FormControl('', [Validators.required, phoneValidator()]);
  email = new FormControl('', [Validators.required, Validators.email]);
  errorMessage = signal('');

  constructor() {
    merge(
      this.phone.statusChanges,
      this.phone.valueChanges
    )
    merge(
      this.email.statusChanges, 
      this.email.valueChanges
    )
    .pipe(takeUntilDestroyed())
    .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.phone.hasError('required')) {
      this.errorMessage.set('You must enter a phone number');
    } else if (this.phone.hasError('phone')) {
      this.errorMessage.set('Not a valid phone number (must be 10 digits)');
    } else {
      this.errorMessage.set('');
    }
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

  resumeData = {
    name: '',
    fatherName: '',
    nationality: '',
    dob: '',
    gender: '',
    address: '',
    languages: [] as string[],
    softskills: [] as string[],
    technical: [] as string[],
    academicCredentials: {
      tenth: {
        school: '',
        curriculum: '',
        percentage: '',
      },
      puc: {
        college: '',
        curriculum: '',
        percentage: '',
      },
      degree: {
        college: '',
        university: '',
        cgpa: '',
      },
    },
    hobbies: [] as string[],
    curricular: [] as string[],
  };

  newHobby: string = ''; // Declare newHobby
  newCurricular: string = '';
  newsoftskill: string = '';
  newTechnical: string = '';

  readonly templateKeywords = signal(['English', 'Hindi', 'Kannada']);

  announcer = inject(LiveAnnouncer);

  removeTemplateKeyword(keyword: string) {
    this.templateKeywords.update(keywords => {
      const index = keywords.indexOf(keyword);
      if (index < 0) {
        return keywords;
      }

      keywords.splice(index, 1);
      this.announcer.announce(`removed ${keyword} from template form`);
      return [...keywords];
    });
  }

  addTemplateKeyword(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.templateKeywords.update(keywords => [...keywords, value]);
      this.announcer.announce(`added ${value} to template form`);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  addHobby() {
    if (this.newHobby) {
      this.resumeData.hobbies.push(this.newHobby);
      this.newHobby = ''; // Clear the input after adding
    }
  }
  addCurricular() {
    if(this.newCurricular){
      this.resumeData.curricular.push(this.newCurricular);
      this.newCurricular = '';
    }
  }
  addsoftskill() {
    if (this.newsoftskill) {
      this.resumeData.softskills.push(this.newsoftskill);
      this.newsoftskill = ''; // Clear the input after adding
    }
  }
  addTechnical() {
    if(this.newTechnical){
      this.resumeData.technical.push(this.newTechnical);
      this.newTechnical = '';
    }
  }
  removesoftskill(index: number) {
    this.resumeData.softskills.splice(index, 1);
  }

  removeTechnical(index: number) {
    this.resumeData.technical.splice(index, 1);
  }

  removeHobby(index: number) {
    this.resumeData.hobbies.splice(index, 1);
  }

  removeCurricular(index: number) {
    this.resumeData.curricular.splice(index, 1);
  }

  onSubmit() {
    // Logic for building the resume
    console.log(this.resumeData); // Add any submit logic here
  }
}
