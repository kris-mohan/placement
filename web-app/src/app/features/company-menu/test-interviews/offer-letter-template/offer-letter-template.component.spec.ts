import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferLetterTemplateComponent } from './offer-letter-template.component';

describe('OfferLetterTemplateComponent', () => {
  let component: OfferLetterTemplateComponent;
  let fixture: ComponentFixture<OfferLetterTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferLetterTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferLetterTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
