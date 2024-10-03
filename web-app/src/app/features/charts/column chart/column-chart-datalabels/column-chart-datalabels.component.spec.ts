import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnChartDatalabelsComponent } from './column-chart-datalabels.component';

describe('ColumnChartDatalabelsComponent', () => {
  let component: ColumnChartDatalabelsComponent;
  let fixture: ComponentFixture<ColumnChartDatalabelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnChartDatalabelsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnChartDatalabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
