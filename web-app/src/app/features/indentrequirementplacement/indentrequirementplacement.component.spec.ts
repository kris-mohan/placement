import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentrequirementplacementComponent } from './indentrequirementplacement.component';

describe('IndentrequirementplacementComponent', () => {
  let component: IndentrequirementplacementComponent;
  let fixture: ComponentFixture<IndentrequirementplacementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndentrequirementplacementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndentrequirementplacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
