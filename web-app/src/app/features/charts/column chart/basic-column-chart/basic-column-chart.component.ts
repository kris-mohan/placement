import { CommonModule } from '@angular/common';
import { Component, ViewChild, Input, OnChanges } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexStroke,
  ApexLegend,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-basic-column-chart',
  templateUrl: './basic-column-chart.component.html',
  styleUrls: ['./basic-column-chart.component.css'],
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
})
export class BasicColumnChartComponent implements OnChanges {
  @ViewChild('chart', { static: false }) chart?: ChartComponent;

  @Input() seriesData: ApexAxisChartSeries = [];
  @Input() categoriesData: string[] = [];
  @Input() xLabel: string = '';
  @Input() yLabel: string = '';
  @Input() titleText: string = '';

  public chartOptions: Partial<ChartOptions> = {};

  ngOnChanges(): void {
    this.chartOptions = {
      series: this.seriesData,
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 8,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: this.categoriesData,
        title: {
          text: this.xLabel,
        },
      },
      yaxis: {
        title: {
          text: this.yLabel,
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return val + ' students';
          },
        },
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'center',
      },
    };
  }
}
