import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPanelModalComponent } from './add-edit-panel-modal.component';

describe('AddEditPanelModalComponent', () => {
  let component: AddEditPanelModalComponent;
  let fixture: ComponentFixture<AddEditPanelModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditPanelModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPanelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
