import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoundsModalComponent } from './add-rounds-modal.component';

describe('AddRoundsModalComponent', () => {
  let component: AddRoundsModalComponent;
  let fixture: ComponentFixture<AddRoundsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRoundsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRoundsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
