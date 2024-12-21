import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInvitePopupComponent } from './company-invite-popup.component';

describe('CompanyInvitePopupComponent', () => {
  let component: CompanyInvitePopupComponent;
  let fixture: ComponentFixture<CompanyInvitePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyInvitePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyInvitePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
