import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleDonutChartComponent } from './simple-donut-chart.component';

describe('SimpleDonutChartComponent', () => {
  let component: SimpleDonutChartComponent;
  let fixture: ComponentFixture<SimpleDonutChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleDonutChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleDonutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
