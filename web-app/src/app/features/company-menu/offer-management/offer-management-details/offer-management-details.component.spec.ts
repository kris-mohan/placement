import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferManagementDetailsComponent } from './offer-management-details.component';

describe('OfferManagementDetailsComponent', () => {
  let component: OfferManagementDetailsComponent;
  let fixture: ComponentFixture<OfferManagementDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferManagementDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferManagementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
