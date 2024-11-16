import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFileUploadComponent } from './company-file-upload.component';

describe('CompanyFileUploadComponent', () => {
  let component: CompanyFileUploadComponent;
  let fixture: ComponentFixture<CompanyFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyFileUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
