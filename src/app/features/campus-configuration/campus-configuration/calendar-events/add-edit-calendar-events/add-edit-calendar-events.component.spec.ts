import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCalendarEventsComponent } from './add-edit-calendar-events.component';

describe('AddEditCalendarEventsComponent', () => {
  let component: AddEditCalendarEventsComponent;
  let fixture: ComponentFixture<AddEditCalendarEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditCalendarEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCalendarEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
