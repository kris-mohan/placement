import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentJobAdditionalFilterModalComponent } from './student-job-additional-filter-modal.component';

describe('StudentJobAdditionalFilterModalComponent', () => {
  let component: StudentJobAdditionalFilterModalComponent;
  let fixture: ComponentFixture<StudentJobAdditionalFilterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentJobAdditionalFilterModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentJobAdditionalFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
