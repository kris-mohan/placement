import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HpStackedColumnchartComponent } from './hp-stacked-columnchart.component';

describe('HpStackedColumnchartComponent', () => {
  let component: HpStackedColumnchartComponent;
  let fixture: ComponentFixture<HpStackedColumnchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HpStackedColumnchartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HpStackedColumnchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
