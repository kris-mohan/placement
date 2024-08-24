import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMappingJobPostComponent } from './add-edit-mapping-job-post.component';

describe('AddEditMappingJobPostComponent', () => {
  let component: AddEditMappingJobPostComponent;
  let fixture: ComponentFixture<AddEditMappingJobPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditMappingJobPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditMappingJobPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
