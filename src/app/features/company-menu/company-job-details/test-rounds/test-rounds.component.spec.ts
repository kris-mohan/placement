import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRoundsComponent } from './test-rounds.component';

describe('TestRoundsComponent', () => {
  let component: TestRoundsComponent;
  let fixture: ComponentFixture<TestRoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestRoundsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestRoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
