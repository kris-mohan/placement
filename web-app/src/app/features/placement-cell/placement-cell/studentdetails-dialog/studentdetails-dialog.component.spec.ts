import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentdetailsDialogComponent } from './studentdetails-dialog.component';

describe('StudentdetailsDialogComponent', () => {
  let component: StudentdetailsDialogComponent;
  let fixture: ComponentFixture<StudentdetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentdetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentdetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
