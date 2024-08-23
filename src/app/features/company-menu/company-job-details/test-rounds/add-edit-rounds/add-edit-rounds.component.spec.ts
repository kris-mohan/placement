import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRoundsComponent } from './add-edit-rounds.component';

describe('AddEditRoundsComponent', () => {
  let component: AddEditRoundsComponent;
  let fixture: ComponentFixture<AddEditRoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditRoundsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditRoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
