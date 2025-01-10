import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFeedbacksListComponent } from './student-feedbacks-list.component';

describe('StudentFeedbacksListComponent', () => {
  let component: StudentFeedbacksListComponent;
  let fixture: ComponentFixture<StudentFeedbacksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentFeedbacksListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentFeedbacksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
