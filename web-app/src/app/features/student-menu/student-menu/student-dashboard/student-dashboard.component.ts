import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BasicColumnChartComponent } from 'src/app/features/charts/column chart/basic-column-chart/basic-column-chart.component';
import { ColumnChartDatalabelsComponent } from 'src/app/features/charts/column chart/column-chart-datalabels/column-chart-datalabels.component';
import { HpStackedColumnchartComponent } from 'src/app/features/charts/column chart/hp-stacked-columnchart/hp-stacked-columnchart.component';
import { StackedColumnChartComponent } from 'src/app/features/charts/column chart/stacked-column-chart/stacked-column-chart.component';
import { BasicLineChartComponent } from 'src/app/features/charts/line chart/basic-line-chart/basic-line-chart.component';
import { SimpleDonutChartComponent } from 'src/app/features/charts/pie chart/simple-donut-chart/simple-donut-chart.component';
import { SimplePieChartComponent } from 'src/app/features/charts/pie chart/simple-pie-chart/simple-pie-chart.component';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-student-dashboard',
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
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css',
})
export class StudentDashboardComponent {}
