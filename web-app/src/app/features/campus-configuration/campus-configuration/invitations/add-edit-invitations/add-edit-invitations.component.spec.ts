import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditInvitationsComponent } from './add-edit-invitations.component';

describe('AddEditInvitationsComponent', () => {
  let component: AddEditInvitationsComponent;
  let fixture: ComponentFixture<AddEditInvitationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditInvitationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditInvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
