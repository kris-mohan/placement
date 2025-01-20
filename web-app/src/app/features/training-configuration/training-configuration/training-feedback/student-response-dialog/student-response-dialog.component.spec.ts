import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentResponseDialogComponent } from './student-response-dialog.component';

describe('StudentResponseDialogComponent', () => {
  let component: StudentResponseDialogComponent;
  let fixture: ComponentFixture<StudentResponseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentResponseDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentResponseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
