import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditJobPostingsComponent } from './add-edit-job-postings.component';

describe('AddEditJobPostingsComponent', () => {
  let component: AddEditJobPostingsComponent;
  let fixture: ComponentFixture<AddEditJobPostingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditJobPostingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditJobPostingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
