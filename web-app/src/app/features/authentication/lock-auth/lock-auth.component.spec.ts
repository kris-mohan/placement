import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockAuthComponent } from './lock-auth.component';

describe('LockAuthComponent', () => {
  let component: LockAuthComponent;
  let fixture: ComponentFixture<LockAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LockAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LockAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
