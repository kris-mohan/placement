import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementCompanyJobDetailsComponent } from './placement-company-job-details.component';

describe('PlacementCompanyJobDetailsComponent', () => {
  let component: PlacementCompanyJobDetailsComponent;
  let fixture: ComponentFixture<PlacementCompanyJobDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacementCompanyJobDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacementCompanyJobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
