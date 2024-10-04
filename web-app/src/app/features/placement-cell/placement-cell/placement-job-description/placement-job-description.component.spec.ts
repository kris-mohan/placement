import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementJobDescriptionComponent } from './placement-job-description.component';

describe('PlacementJobDescriptionComponent', () => {
  let component: PlacementJobDescriptionComponent;
  let fixture: ComponentFixture<PlacementJobDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacementJobDescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacementJobDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
