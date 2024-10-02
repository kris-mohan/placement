import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementDashboardComponent } from './placement-dashboard.component';

describe('PlacementDashboardComponent', () => {
  let component: PlacementDashboardComponent;
  let fixture: ComponentFixture<PlacementDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacementDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacementDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
