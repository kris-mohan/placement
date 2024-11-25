import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementOfferRecievedUploadFileComponent } from './placement-offer-recieved-upload-file.component';

describe('PlacementOfferRecievedUploadFileComponent', () => {
  let component: PlacementOfferRecievedUploadFileComponent;
  let fixture: ComponentFixture<PlacementOfferRecievedUploadFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacementOfferRecievedUploadFileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacementOfferRecievedUploadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
