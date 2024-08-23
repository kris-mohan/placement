import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourthRoundComponent } from './fourth-round.component';

describe('FourthRoundComponent', () => {
  let component: FourthRoundComponent;
  let fixture: ComponentFixture<FourthRoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FourthRoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourthRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
