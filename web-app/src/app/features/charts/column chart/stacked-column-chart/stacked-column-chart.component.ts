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
  ApexTitleSubtitle,
} from 'ng-apexcharts';
import { SharedModule } from 'src/app/shared/shared.module';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  legend: ApexLegend;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-stacked-column-chart',
  standalone: true,
  imports: [SharedModule, CommonModule, NgApexchartsModule],
  templateUrl: './stacked-column-chart.component.html',
  styleUrls: ['./stacked-column-chart.component.css'], //
})
export class StackedColumnChartComponent implements OnChanges {
  @ViewChild('chart', { static: false }) chart?: ChartComponent;

  @Input() seriesData: ApexAxisChartSeries = [];
  @Input() categoriesData: string[] = [];
  @Input() xLabel: string = '';
  @Input() yLabel: string = '';
  @Input() titleText: string = 'Student Placement Based on Salary';

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
        categories: this.categoriesData,
      },
      yaxis: {
        title: {
          text: this.yLabel,
        },
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
