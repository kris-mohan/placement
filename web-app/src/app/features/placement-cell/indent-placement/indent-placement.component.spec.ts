import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentPlacementComponent } from './indent-placement.component';

describe('IndentPlacementComponent', () => {
  let component: IndentPlacementComponent;
  let fixture: ComponentFixture<IndentPlacementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndentPlacementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndentPlacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
