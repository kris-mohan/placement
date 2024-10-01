import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyJobDescriptionComponent } from './company-job-description.component';

describe('CompanyJobDescriptionComponent', () => {
  let component: CompanyJobDescriptionComponent;
  let fixture: ComponentFixture<CompanyJobDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyJobDescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyJobDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
