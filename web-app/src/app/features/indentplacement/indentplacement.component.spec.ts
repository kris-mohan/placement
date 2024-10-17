import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentplacementComponent } from './indentplacement.component';

describe('IndentplacementComponent', () => {
  let component: IndentplacementComponent;
  let fixture: ComponentFixture<IndentplacementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndentplacementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndentplacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
