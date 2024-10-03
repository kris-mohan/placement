import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SimpleDonutChartComponent } from '../../charts/pie chart/simple-donut-chart/simple-donut-chart.component';
import { SimplePieChartComponent } from '../../charts/pie chart/simple-pie-chart/simple-pie-chart.component';
import { HpStackedColumnchartComponent } from '../../charts/column chart/hp-stacked-columnchart/hp-stacked-columnchart.component';
import { StackedColumnChartComponent } from '../../charts/column chart/stacked-column-chart/stacked-column-chart.component';
import { ColumnChartDatalabelsComponent } from '../../charts/column chart/column-chart-datalabels/column-chart-datalabels.component';
import { BasicColumnChartComponent } from '../../charts/column chart/basic-column-chart/basic-column-chart.component';
import { BasicLineChartComponent } from '../../charts/line chart/basic-line-chart/basic-line-chart.component';

@Component({
  selector: 'app-company-dashboard',
  standalone: true,
  imports: [
    BasicLineChartComponent,
    BasicColumnChartComponent,
    ColumnChartDatalabelsComponent,
    StackedColumnChartComponent,
    HpStackedColumnchartComponent,
    SimplePieChartComponent,
    SimpleDonutChartComponent,
    CommonModule,
    SharedModule,
  ],
  templateUrl: './company-dashboard.component.html',
  styleUrl: './company-dashboard.component.css',
})
export class CompanyDashboardComponent {}
