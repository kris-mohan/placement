import { CommonModule } from '@angular/common';
import { Component, ViewChild, Input, OnChanges } from '@angular/core';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from 'ng-apexcharts';
import { SharedModule } from 'src/app/shared/shared.module';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  title: {
    text: string; // Title for the chart
    align: string; // Alignment of the title
  };
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

  // Input properties for dynamic data
  @Input() branchPlacementSeries: number[] = [];
  @Input() branchLabels: string[] = [];
  @Input() chartTitle: string = 'Branch Wise Placement Status'; // Input for chart title

  public chartOptions: Partial<ChartOptions> = {};

  ngOnChanges(): void {
    this.chartOptions = {
      series: this.branchPlacementSeries, // Dynamic data for branches
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: this.branchLabels, // Dynamic labels for branches
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
        text: this.chartTitle, // Set the title from input
        align: 'center', // Center the title
      },
    };
  }
}
