import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyJobAdditionalfiltersModalComponent } from './company-job-additionalfilters-modal.component';

describe('CompanyJobAdditionalfiltersModalComponent', () => {
  let component: CompanyJobAdditionalfiltersModalComponent;
  let fixture: ComponentFixture<CompanyJobAdditionalfiltersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyJobAdditionalfiltersModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyJobAdditionalfiltersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
