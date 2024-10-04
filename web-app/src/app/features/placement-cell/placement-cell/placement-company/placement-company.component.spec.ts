import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementCompanyComponent } from './placement-company.component';

describe('PlacementCompanyComponent', () => {
  let component: PlacementCompanyComponent;
  let fixture: ComponentFixture<PlacementCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacementCompanyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacementCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
