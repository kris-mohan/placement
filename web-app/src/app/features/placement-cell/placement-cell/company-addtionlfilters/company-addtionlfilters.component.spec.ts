import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAddtionlfiltersComponent } from './company-addtionlfilters.component';

describe('CompanyAddtionlfiltersComponent', () => {
  let component: CompanyAddtionlfiltersComponent;
  let fixture: ComponentFixture<CompanyAddtionlfiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyAddtionlfiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyAddtionlfiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
