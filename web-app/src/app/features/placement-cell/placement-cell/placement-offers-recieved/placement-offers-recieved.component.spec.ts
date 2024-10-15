import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementOffersRecievedComponent } from './placement-offers-recieved.component';

describe('PlacementOffersRecievedComponent', () => {
  let component: PlacementOffersRecievedComponent;
  let fixture: ComponentFixture<PlacementOffersRecievedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacementOffersRecievedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacementOffersRecievedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
