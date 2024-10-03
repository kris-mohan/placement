import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AMGModules } from 'src/AMG-Module/AMG-module';
import { BasicColumnChartComponent } from 'src/app/features/charts/column chart/basic-column-chart/basic-column-chart.component';
import { ColumnChartDatalabelsComponent } from 'src/app/features/charts/column chart/column-chart-datalabels/column-chart-datalabels.component';
import { StackedColumnChartComponent } from 'src/app/features/charts/column chart/stacked-column-chart/stacked-column-chart.component';
import { HpStackedColumnchartComponent } from 'src/app/features/charts/column chart/hp-stacked-columnchart/hp-stacked-columnchart.component';
import { SimplePieChartComponent } from 'src/app/features/charts/pie chart/simple-pie-chart/simple-pie-chart.component';
import { SimpleDonutChartComponent } from 'src/app/features/charts/pie chart/simple-donut-chart/simple-donut-chart.component';
import { BasicLineChartComponent } from 'src/app/features/charts/line chart/basic-line-chart/basic-line-chart.component';

@Component({
  selector: 'app-placement-dashboard',
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
    AMGModules,
  ],
  templateUrl: './placement-dashboard.component.html',
  styleUrl: './placement-dashboard.component.css',
})
export class PlacementDashboardComponent implements OnInit {
  // chartSeries = [
  //   {
  //     name: 'High - 2023',
  //     data: [30, 32, 35, 38, 36, 34, 32],
  //   },
  //   {
  //     name: 'Low - 2023',
  //     data: [25, 16, 18, 20, 19, 17, 16],
  //   },
  // ];

  // chartCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

  studentYearlySeries: any[] = [];
  yearsLabels: string[] = [];
  studentPlacementData: any[] = [];
  companiesLabels: string[] = [];
  studentSalarySeries: any[] = [];
  salaryRanges: string[] = [];
  branchPlacementSeries: number[] = [];
  branchLabels: string[] = [];

  ngOnInit(): void {
    const apiCall = async () => {
      this.studentYearlySeries = [
        {
          name: 'High - 2023',
          data: [30, 32, 35, 38, 36, 34, 32],
        },
        {
          name: 'Low - 2023',
          data: [25, 16, 18, 20, 19, 17, 16],
        },
      ];
      this.yearsLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    };
    apiCall();

    const placedStudents = async () => {
      this.studentPlacementData = [
        {
          name: 'Placed Students',
          data: [120, 80, 100, 90, 75, 35],
        },
        {
          name: 'Unplaced Students',
          data: [30, 50, 40, 60, 55, 45],
        },
      ];
      this.companiesLabels = [
        'Company A',
        'Company B',
        'Company C',
        'Company D',
        'Company E',
        'Company F',
      ];
    };
    placedStudents();

    const salaryBasedData = async () => {
      this.studentSalarySeries = [
        {
          name: 'Company A',
          data: [10, 20, 30, 40, 50, 60],
        },
        {
          name: 'Company B',
          data: [15, 25, 35, 45, 55, 65],
        },
        {
          name: 'Company C',
          data: [20, 30, 40, 50, 60, 70],
        },
      ];

      this.salaryRanges = [
        '0-2 LPA',
        '2-4 LPA',
        '4-6 LPA',
        '6-8 LPA',
        '8-10 LPA',
        '10+ LPA',
      ];
    };
    salaryBasedData();

    const branchWisePlacementStatus = async () => {
      this.branchPlacementSeries = [120, 150, 80, 90, 50]; // Example data representing number of students placed in each branch
      this.branchLabels = ['CS', 'IS', 'EC', 'ME', 'CV']; // Branch labels
    };
    branchWisePlacementStatus();
  }
}
