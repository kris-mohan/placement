import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentOfferRecievedComponent } from './student-offer-recieved.component';

describe('StudentOfferRecievedComponent', () => {
  let component: StudentOfferRecievedComponent;
  let fixture: ComponentFixture<StudentOfferRecievedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentOfferRecievedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentOfferRecievedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
