import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferRecievedComponent } from './offer-recieved.component';

describe('OfferRecievedComponent', () => {
  let component: OfferRecievedComponent;
  let fixture: ComponentFixture<OfferRecievedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferRecievedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferRecievedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
