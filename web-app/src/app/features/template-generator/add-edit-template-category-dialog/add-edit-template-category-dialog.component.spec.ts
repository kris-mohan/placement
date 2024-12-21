import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTemplateCategoryDialogComponent } from './add-edit-template-category-dialog.component';

describe('AddEditTemplateCategoryDialogComponent', () => {
  let component: AddEditTemplateCategoryDialogComponent;
  let fixture: ComponentFixture<AddEditTemplateCategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditTemplateCategoryDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditTemplateCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
