import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementInterviewAdditionalFilterComponent } from './placement-interview-additional-filter.component';

describe('PlacementInterviewAdditionalFilterComponent', () => {
  let component: PlacementInterviewAdditionalFilterComponent;
  let fixture: ComponentFixture<PlacementInterviewAdditionalFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacementInterviewAdditionalFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacementInterviewAdditionalFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
