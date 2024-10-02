import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementInterviewComponent } from './placement-interview.component';

describe('PlacementInterviewComponent', () => {
  let component: PlacementInterviewComponent;
  let fixture: ComponentFixture<PlacementInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacementInterviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacementInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
