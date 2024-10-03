import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentviewComponent } from './indentview.component';

describe('IndentviewComponent', () => {
  let component: IndentviewComponent;
  let fixture: ComponentFixture<IndentviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndentviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndentviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
