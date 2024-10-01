import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobEligibleStudentsModalComponent } from './job-eligible-students-modal.component';

describe('JobEligibleStudentsModalComponent', () => {
  let component: JobEligibleStudentsModalComponent;
  let fixture: ComponentFixture<JobEligibleStudentsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobEligibleStudentsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobEligibleStudentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
