import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportCompanyDialogComponent } from './import-company-dialog.component';

describe('ImportCompanyDialogComponent', () => {
  let component: ImportCompanyDialogComponent;
  let fixture: ComponentFixture<ImportCompanyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportCompanyDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportCompanyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
