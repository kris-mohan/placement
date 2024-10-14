import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexXAxis,
  ApexLegend,
  ChartComponent,
  ApexTitleSubtitle,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { SharedModule } from 'src/app/shared/shared.module';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  colors: string[];
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-funnel-chart',
  standalone: true,
  imports: [CommonModule, SharedModule, NgApexchartsModule],
  templateUrl: './funnel-chart.component.html',
  styleUrl: './funnel-chart.component.css',
})
export class FunnelChartComponent {
  @ViewChild('chart', { static: false }) chart?: ChartComponent;
  public chartOptions: Partial<ChartOptions> = {};

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'Funnel Series',
          data: [1380, 1100, 990, 880, 740, 548, 330, 200],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 0,
          horizontal: true,
          barHeight: '80%',
          isFunnel: true,
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val;
        },
        dropShadow: {
          enabled: true,
        },
      },
      title: {
        text: 'Recruitment Funnel',
        align: 'center',
      },
      xaxis: {
        categories: [
          'Sourced',
          'Screened',
          'Assessed',
          'HR Interview',
          'Technical',
          'Verify',
          'Offered',
          'Hired',
        ],
      },
      legend: {
        show: false,
      },
    };
  }
}
