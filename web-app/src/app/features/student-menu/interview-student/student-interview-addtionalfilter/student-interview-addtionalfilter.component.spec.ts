import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInterviewAddtionalfilterComponent } from './student-interview-addtionalfilter.component';

describe('StudentInterviewAddtionalfilterComponent', () => {
  let component: StudentInterviewAddtionalfilterComponent;
  let fixture: ComponentFixture<StudentInterviewAddtionalfilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentInterviewAddtionalfilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentInterviewAddtionalfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
