import { CommonModule, Location } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AMGModules } from 'src/AMG-Module/AMG-module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSelectChange } from '@angular/material/select';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Semester } from 'src/app/services/common-dropdowns/SemesterName';
import { TenthScoreType } from 'src/app/services/common-dropdowns/TenthScoreType';
import { TwelfthScoreType } from 'src/app/services/common-dropdowns/TwelfthScoreType';
import { SemesterScoreType } from 'src/app/services/common-dropdowns/SemesterScoreType';
import { BloodGroup } from 'src/app/services/common-dropdowns/BloodGroup';
import { Course } from 'src/app/services/types/Course';
import { StudentProfileApiService } from './StudentProfileApiService';
import { Stream } from 'src/app/services/types/Stream';
import { Batch } from 'src/app/services/types/Batch';

@Component({
  selector: 'app-profile-management',
  standalone: true,
  imports: [AMGModules, CommonModule, SharedModule],
  templateUrl: './profile-management.component.html',
  styleUrl: './profile-management.component.css',
})
export class ProfileManagementComponent {
  selectedSemester: string = '';
  selectedBoard: string = '';
  selectedScore: string = '';
  selectedCourse: string = '';
  selectedPuScore: string = '';
  selectedSemScore: string = '';
  selectedBlood: string = '';
  semesters = [{ score: '', type: '', file: null }];
  showSemester = false;
  fileError: string | null = null;
  studentProfileForm: FormGroup;
  allSemesters = [{ semester: '', scoreType: '', score: '', file: null }];
  Semester: string[] = Semester;
  TenthScoreType: string[] = TenthScoreType;
  TwelfthScoreType: string[] = TwelfthScoreType;
  SemesterScoreType: string[] = SemesterScoreType;
  BloodGroup: string[] = BloodGroup;
  Courses = signal<Course[]>([]);
  Streams = signal<Stream[]>([]);
  Batches = signal<Batch[]>([]);

  Boards = [
    { value: 'ICSE', viewValue: 'ICSE' },
    { value: 'CBSE', viewValue: 'CBSE' },
    { value: 'State', viewValue: 'State' },
  ];

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private studentApiService: StudentProfileApiService
  ) {
    this.studentProfileForm = this.fb.group({
      FirstName: ['', [Validators.required]],
      LastName: [''],
      BatchId: ['', [Validators.required]],
      AadharCardNumber: ['', [Validators.required]],
      DateOfBirth: ['', [Validators.required]],
      BloodGroup: ['', [Validators.required]],
      PermanentAddress: ['', [Validators.required]],
      CurrentAddress: [''],
      Email: ['', [Validators.required]],
      PhoneNumber: ['', [Validators.required]],
      ParentName: ['', [Validators.required]],
      ParentPhoneNumber: ['', [Validators.required]],
      RollNo: ['', [Validators.required]],
      StudentSkills: [[]],
      Studentacademics: [[]],
      Batch: [[]],
      Course: [[]],
    });
  }

  degrees = [
    { value: 'Under-Graduate', viewValue: 'Under-graduate' },
    { value: 'Post-Graduate', viewValue: 'Post-Graduate' },
  ];

  readonly techSkill = signal(['java', 'c++', 'c']);
  readonly SoftSkill = signal([
    'Communication skill',
    'Leadership skill',
    'Team management',
  ]);
  readonly ExtracurricularActivities = signal(['sports', 'music', 'dance']);
  readonly Language = signal(['English', 'Hindi', 'Tamil']);

  announcer = inject(LiveAnnouncer);

  ngOnInit() {
    this.GetAllCourseName();
    this.GetAllStreamName();
    this.GetPassedOutYear();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileError = null;
    } else {
      this.fileError = 'Please select a file.';
    }
  }

  addDulpicateSemester() {
    this.allSemesters.push({
      semester: '',
      scoreType: '',
      score: '',
      file: null,
    });
  }

  removeSemester(index: number) {
    if (this.allSemesters.length > 1) {
      this.allSemesters.splice(index, 1);
    } else {
      alert('At least one semester is required.');
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

  removeTemplateKeyword(keyword: string) {
    this.techSkill.update((keywords) => {
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
    if (value) {
      this.techSkill.update((keywords) => [...keywords, value]);
      this.announcer.announce(`added ${value} to template form`);
    }
    event.chipInput!.clear();
  }

  removeSoftSkill(keyword: string) {
    this.SoftSkill.update((keywords) => {
      const index = keywords.indexOf(keyword);
      if (index < 0) {
        return keywords;
      }

      keywords.splice(index, 1);
      this.announcer.announce(`removed ${keyword} from template form`);
      return [...keywords];
    });
  }

  addSoftSkill(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.SoftSkill.update((keywords) => [...keywords, value]);
      this.announcer.announce(`added ${value} to template form`);
    }

    event.chipInput!.clear();
  }

  removeExtracurricularActivities(keyword: string) {
    this.ExtracurricularActivities.update((keywords) => {
      const index = keywords.indexOf(keyword);
      if (index < 0) {
        return keywords;
      }

      keywords.splice(index, 1);
      this.announcer.announce(`removed ${keyword} from template form`);
      return [...keywords];
    });
  }

  addExtracurricularActivities(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.ExtracurricularActivities.update((keywords) => [...keywords, value]);
      this.announcer.announce(`added ${value} to template form`);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeLanguage(keyword: string) {
    this.Language.update((keywords) => {
      const index = keywords.indexOf(keyword);
      if (index < 0) {
        return keywords;
      }

      keywords.splice(index, 1);
      this.announcer.announce(`removed ${keyword} from template form`);
      return [...keywords];
    });
  }

  addLanguage(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.Language.update((keywords) => [...keywords, value]);
      this.announcer.announce(`added ${value} to template form`);
    }
    event.chipInput!.clear();
  }

  GetPassedOutYear = () => {
    this.studentApiService.GetAllBatches().subscribe({
      next: (batch) => {
        const data: Batch[] = batch.value;
        this.Batches.set(data);
        // console.log('course:', data);
      },
    });
  };

  GetAllCourseName = () => {
    this.studentApiService.GetAllCourse().subscribe({
      next: (course) => {
        const data: Course[] = course.value;
        this.Courses.set(data);
        // console.log('course:', data);
      },
    });
  };

  GetAllStreamName = () => {
    this.studentApiService.GetAllStream().subscribe({
      next: (course) => {
        const data: Stream[] = course.value;
        this.Streams.set(data);
        // console.log('stream:', data);
      },
    });
  };

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    console.log('submit');
  }
}
