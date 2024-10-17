import { CommonModule } from '@angular/common';
import { Component, ViewChild, Input, OnChanges } from '@angular/core';
import {
  ChartComponent,
  NgApexchartsModule,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexTitleSubtitle,
} from 'ng-apexcharts';

import { SharedModule } from 'src/app/shared/shared.module';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-simple-pie-chart',
  standalone: true,
  imports: [SharedModule, CommonModule, NgApexchartsModule],
  templateUrl: './simple-pie-chart.component.html',
  styleUrls: ['./simple-pie-chart.component.css'],
})
export class SimplePieChartComponent implements OnChanges {
  @ViewChild('chart', { static: false }) chart?: ChartComponent;

  @Input() branchPlacementSeries: number[] = [];
  @Input() branchLabels: string[] = [];
  @Input() chartTitle: string = 'Branch Wise Placement Status';

  public chartOptions: Partial<ChartOptions> = {};

  ngOnChanges(): void {
    this.chartOptions = {
      series: this.branchPlacementSeries,
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: this.branchLabels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      title: {
        text: this.chartTitle,
        align: 'center',
      },
    };
  }
}
