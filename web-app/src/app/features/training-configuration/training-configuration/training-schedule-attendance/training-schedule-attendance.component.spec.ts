import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingScheduleAttendanceComponent } from './training-schedule-attendance.component';

describe('TrainingScheduleAttendanceComponent', () => {
  let component: TrainingScheduleAttendanceComponent;
  let fixture: ComponentFixture<TrainingScheduleAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingScheduleAttendanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingScheduleAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
