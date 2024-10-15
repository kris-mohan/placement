import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementOfferRecievedComponent } from './placement-offer-recieved.component';

describe('PlacementOfferRecievedComponent', () => {
  let component: PlacementOfferRecievedComponent;
  let fixture: ComponentFixture<PlacementOfferRecievedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacementOfferRecievedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacementOfferRecievedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
