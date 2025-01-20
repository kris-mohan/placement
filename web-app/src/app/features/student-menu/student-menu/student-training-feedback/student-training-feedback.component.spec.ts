import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTrainingFeedbackComponent } from './student-training-feedback.component';

describe('StudentTrainingFeedbackComponent', () => {
  let component: StudentTrainingFeedbackComponent;
  let fixture: ComponentFixture<StudentTrainingFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentTrainingFeedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentTrainingFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
