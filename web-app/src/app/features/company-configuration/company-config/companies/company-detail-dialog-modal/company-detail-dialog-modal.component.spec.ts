import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDetailDialogModalComponent } from './company-detail-dialog-modal.component';

describe('CompanyDetailDialogModalComponent', () => {
  let component: CompanyDetailDialogModalComponent;
  let fixture: ComponentFixture<CompanyDetailDialogModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyDetailDialogModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyDetailDialogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
