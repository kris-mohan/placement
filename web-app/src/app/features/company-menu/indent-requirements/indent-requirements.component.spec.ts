import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentRequirementsComponent } from './indent-requirements.component';

describe('IndentRequirementsComponent', () => {
  let component: IndentRequirementsComponent;
  let fixture: ComponentFixture<IndentRequirementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndentRequirementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndentRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
