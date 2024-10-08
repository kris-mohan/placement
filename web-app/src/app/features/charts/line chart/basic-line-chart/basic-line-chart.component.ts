import { CommonModule } from '@angular/common';
import { Component, input, Input, OnInit, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { SharedModule } from 'src/app/shared/shared.module';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-basic-line-chart',
  standalone: true,
  imports: [SharedModule, CommonModule, NgApexchartsModule],
  templateUrl: './basic-line-chart.component.html',
  styleUrl: './basic-line-chart.component.css',
})
export class BasicLineChartComponent implements OnInit {
  @ViewChild('chart', { static: false }) chart?: ChartComponent;
  public chartOptions: Partial<ChartOptions> = {};

  // Accept dynamic data as inputs
  @Input() seriesData: ApexAxisChartSeries = [];
  @Input() categoriesData: string[] = [];
  @Input() titleText: string = 'Dynamic Line Chart';
  @Input() xLabel: string = '';
  @Input() yLabel: string = '';

  ngOnChanges(): void {
    this.chartOptions = {
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      stroke: {
        curve: 'smooth',
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      yaxis: {
        title: {
          text: 'A',
        },
        min: 5,
        max: 40,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    };
  }
  ngOnInit(): void {
    this.chartOptions.series = this.seriesData;
    this.chartOptions.xaxis = {
      categories: this.categoriesData,
      title: {
        text: this.xLabel,
      },
    };
    this.chartOptions.yaxis = {
      title: {
        text: this.yLabel,
      },
    };
    this.chartOptions.title = {
      text: this.titleText,
      align: 'left',
    };
  }
}
