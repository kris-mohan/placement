import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementInterviewStudentsComponent } from './placement-interview-students.component';

describe('PlacementInterviewStudentsComponent', () => {
  let component: PlacementInterviewStudentsComponent;
  let fixture: ComponentFixture<PlacementInterviewStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacementInterviewStudentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacementInterviewStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
