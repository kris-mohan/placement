import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewStudentComponent } from './interview-student.component';

describe('InterviewStudentComponent', () => {
  let component: InterviewStudentComponent;
  let fixture: ComponentFixture<InterviewStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
