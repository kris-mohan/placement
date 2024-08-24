import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdRoundComponent } from './third-round.component';

describe('ThirdRoundComponent', () => {
  let component: ThirdRoundComponent;
  let fixture: ComponentFixture<ThirdRoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThirdRoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThirdRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
