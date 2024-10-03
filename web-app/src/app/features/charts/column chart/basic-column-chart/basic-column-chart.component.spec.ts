import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicColumnChartComponent } from './basic-column-chart.component';

describe('BasicColumnChartComponent', () => {
  let component: BasicColumnChartComponent;
  let fixture: ComponentFixture<BasicColumnChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicColumnChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicColumnChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
