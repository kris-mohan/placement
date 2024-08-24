import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInterviewsComponent } from './test-interviews.component';

describe('TestInterviewsComponent', () => {
  let component: TestInterviewsComponent;
  let fixture: ComponentFixture<TestInterviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestInterviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestInterviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
