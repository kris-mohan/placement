import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondRoundComponent } from './second-round.component';

describe('SecondRoundComponent', () => {
  let component: SecondRoundComponent;
  let fixture: ComponentFixture<SecondRoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondRoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
