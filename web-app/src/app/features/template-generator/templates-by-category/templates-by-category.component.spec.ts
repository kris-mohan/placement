import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesByCategoryComponent } from './templates-by-category.component';

describe('TemplatesByCategoryComponent', () => {
  let component: TemplatesByCategoryComponent;
  let fixture: ComponentFixture<TemplatesByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplatesByCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplatesByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
