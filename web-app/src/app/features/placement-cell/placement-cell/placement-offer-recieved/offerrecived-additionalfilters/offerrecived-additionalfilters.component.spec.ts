import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferrecivedAdditionalfiltersComponent } from './offerrecived-additionalfilters.component';

describe('OfferrecivedAdditionalfiltersComponent', () => {
  let component: OfferrecivedAdditionalfiltersComponent;
  let fixture: ComponentFixture<OfferrecivedAdditionalfiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferrecivedAdditionalfiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferrecivedAdditionalfiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
