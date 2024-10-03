import { CommonModule } from '@angular/common';
import { Component, ViewChild, Input, OnChanges } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { SharedModule } from 'src/app/shared/shared.module';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};

@Component({
  selector: 'app-stacked-column-chart',
  standalone: true,
  imports: [SharedModule, CommonModule, NgApexchartsModule],
  templateUrl: './stacked-column-chart.component.html',
  styleUrls: ['./stacked-column-chart.component.css'], // Corrected 'styleUrl' to 'styleUrls'
})
export class StackedColumnChartComponent implements OnChanges {
  @ViewChild('chart', { static: false }) chart?: ChartComponent;

  @Input() seriesData: ApexAxisChartSeries = [];
  @Input() categoriesData: string[] = [];

  public chartOptions: Partial<ChartOptions> = {};

  ngOnChanges(): void {
    this.chartOptions = {
      series: this.seriesData,
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      xaxis: {
        type: 'category',
        categories: this.categoriesData, // Dynamically set categories (salary ranges)
      },
      legend: {
        position: 'right',
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
    };
  }
}
