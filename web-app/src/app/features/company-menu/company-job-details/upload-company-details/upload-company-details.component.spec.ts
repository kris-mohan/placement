import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCompanyDetailsComponent } from './upload-company-details.component';

describe('UploadCompanyDetailsComponent', () => {
  let component: UploadCompanyDetailsComponent;
  let fixture: ComponentFixture<UploadCompanyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadCompanyDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadCompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
