import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewAdditionalFilterComponent } from './interview-additional-filter.component';

describe('InterviewAdditionalFilterComponent', () => {
  let component: InterviewAdditionalFilterComponent;
  let fixture: ComponentFixture<InterviewAdditionalFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewAdditionalFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewAdditionalFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
