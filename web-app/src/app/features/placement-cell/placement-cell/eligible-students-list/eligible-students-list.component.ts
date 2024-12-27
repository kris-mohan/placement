import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { AMGModules } from 'src/AMG-Module/AMG-module';
import { PeriodicElement } from 'src/app/features/customers/customer-list/customer-list.component';
import { SweetAlertService } from 'src/app/services/sweet-alert-service/sweet-alert-service';
import { SharedModule } from 'src/app/shared/shared.module';
import { employeeDataList } from './eligible-students-list-model';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StudentdetailsDialogComponent } from '../studentdetails-dialog/studentdetails-dialog.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Tblstudent } from 'src/app/services/types/Tblstudent';
import { EligibleStudentsListApiService } from './EligibleStudentsListApiService';
import { PlacementUploadFileComponent } from '../company-list-details/placement-upload-file/placement-upload-file.component';
import * as XLSX from 'xlsx';

export interface ODataResponse<T> {
  value: T[];
}

@Component({
  selector: 'app-eligible-students-list',
  standalone: true,
  imports: [CommonModule, SharedModule, AMGModules],
  templateUrl: './eligible-students-list.component.html',
  styleUrl: './eligible-students-list.component.css',
})
export class EligibleStudentsListComponent {
  readonly dialog = inject(MatDialog);
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService,
    private location: Location,
    private eligibleStudentsListApiService: EligibleStudentsListApiService
  ) {}
  StudentDataSource = new MatTableDataSource<employeeDataList>([]);

  isLargeScreen() {
    return window.innerWidth > 768;
  }

  displayedColumns: string[] = [
    'select',
    // "StudentID",
    'StudentName',
    'Branch',
    'Batch',
    'CGPA',
    'Status',
    'ApplicationApprovalStatus',
  ];
  columns = [
    { key: 'StudentID', label: 'Student ID' },
    { key: 'StudentName', label: 'Student Name' },
    { key: 'Branch', label: 'Branch' },
    { key: 'Batch', label: 'Batch' },
    { key: 'CGPA', label: 'CGPA' },
    { key: 'Status', label: 'Registration Status' },
    { key: 'ApplicationApprovalStatus', label: 'Application Approval Status' },
  ];

  status: string[] = ['Invite', 'Accepted', 'Invited', 'Rejected', 'Pending'];
  branches: string[] = [];
  batches: number[] = [];
  // Inject BreakpointObserver
  private breakpointObserver = inject(BreakpointObserver);
  statusControl = new FormControl<string[]>([]);
  branchControl = new FormControl<string[] | null>(null);
  batchControl = new FormControl<any[] | null>(null);
  searchControl = new FormControl('');

  selection = new SelectionModel<employeeDataList>(true, []);

  ngOnInit() {
    this.getAllStudents();
    this.getBatches();
    this.getBranches();
    this.StudentDataSource.filterPredicate = (
      data: employeeDataList,
      filter: string
    ) => {
      if (!filter) {
        return true;
      }
      const [statusFilter, branchFilter, batchFilter, searchFilter] =
        filter.split('|');
      const statusArray = statusFilter ? statusFilter.split(',') : [];
      const branchArray = branchFilter ? branchFilter.split(',') : [];
      const batchArray = batchFilter ? batchFilter.split(',') : [];
      const searchString = searchFilter ? searchFilter.toLowerCase() : '';

      const statusMatch =
        statusArray.length === 0 || statusArray.includes(data.Status);
      const branchMatch =
        branchArray.length === 0 || branchArray.includes(data.Branch);
      const batchMatch =
        batchArray.length === 0 || batchArray.includes(data.Batch);
      const searchMatch =
        !searchString || data.StudentName.toLowerCase().includes(searchString);

      return statusMatch && branchMatch && batchMatch && searchMatch;
    };

    this.statusControl.valueChanges.subscribe(() => {
      this.applyFilter();
    });

    this.branchControl.valueChanges.subscribe(() => {
      this.applyFilter();
    });

    this.batchControl.valueChanges.subscribe(() => {
      this.applyFilter();
    });

    this.searchControl.valueChanges.subscribe(() => {
      this.applyFilter();
    });

    this.applyFilter();

    this.route.paramMap.subscribe((params) => {
      const companyId = Number(params.get('id'));
      if (companyId) {
      }
    });
  }

  exportToExcel(): void {
    const studentData = this.StudentDataSource.data.map(
      (student: employeeDataList) => ({
        'Student ID': student.StudentID,
        'Student Name': student.StudentName,
        Branch: student.Branch,
        Batch: student.Batch,
        CGPA: student.CGPA,
        'Registration Status': student.Status,
        'Application Approval Status': student.ApplicationApprovalStatus,
      })
    );
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(studentData);
    const workbook: XLSX.WorkBook = {
      Sheets: { Students: worksheet },
      SheetNames: ['Students'],
    };
    XLSX.writeFile(workbook, 'Students.xlsx');
  }

  applyFilter() {
    const selectedStatuses = this.statusControl.value || [];
    const selectedBranches = this.branchControl.value || [];
    const selectedBatch = this.batchControl.value || [];
    const searchText = this.searchControl.value || '';

    const statusFilter = selectedStatuses.join(',');
    const branchFilter = selectedBranches.join(',');
    const batchFilter = selectedBatch.join(',');

    this.StudentDataSource.filter = `${statusFilter}|${branchFilter}|${batchFilter}|${searchText}`;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.StudentDataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.StudentDataSource.data);
  }

  checkboxLabel(row?: employeeDataList): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.StudentID + 1
    }`;
  }

  getChipStyle(action: string): any {
    switch (action) {
      case 'Invite':
        return { 'background-color': '#bee2e9', color: 'white !important' };
      case 'Accepted':
        return { 'background-color': '#9aee9a', color: 'white' };
      case 'Invited':
        return { 'background-color': '#8cade2', color: 'white' };
      case 'Rejected':
        return { 'background-color': '#fb6767', color: 'white' };
      case 'Pending':
        return { 'background-color': 'grey', color: 'white' };
      default:
        return { 'background-color': 'blue', color: 'white' };
    }
  }

  getApplicationApproveChipStyle(action: string): any {
    switch (action) {
      case 'Verify':
        return { 'background-color': '#bee2e9', color: 'white !important' };
      case 'Accepted':
        return { 'background-color': '#9aee9a', color: 'white' };
      case 'Rejected':
        return { 'background-color': '#fb6767', color: 'white' };
      default:
        return { 'background-color': 'blue', color: 'white' };
    }
  }

  getBadgeColor(action: string): ThemePalette {
    switch (action) {
      case 'Invite':
        return 'primary';
      case 'Verify':
        return 'primary';
      case 'Accepted':
        return 'accent';
      case 'Invited':
        return 'warn';
      case 'Rejected':
      case 'Blocked':
        return 'warn';
      default:
        return 'primary';
    }
  }

  goBack(): void {
    this.location.back();
  }

  openStudentDetailsDialog(id: number) {
    this.dialog.open(StudentdetailsDialogComponent, {
      data: id,
      width: '90vw',
      height: '90vh',
      maxWidth: '100vw',
      panelClass: 'custom-dialog-container',
    });
  }

  verifyApplicationStatus(id?: number) {
    this.router.navigate(['/students/student-details-approval', id]);
  }

  getAllStudents = () => {
    this.eligibleStudentsListApiService.GetAllStudents().subscribe({
      next: (response) => {
        const data: Tblstudent[] = response.value;
        console.log('Tblstudent', data);
        this.StudentDataSource.data = data.map((student: Tblstudent) => {
          return {
            StudentID: student.Id,
            StudentName: student.FirstName,
            Batch: student?.Batch?.Name,
            CGPA:
              student?.Studentacademics?.length > 0
                ? student?.Studentacademics[0]?.Cgpa?.toString()
                : '',
            Branch:
              student?.Studentacademics?.length > 0
                ? student.Studentacademics[0].Course?.FullForm ?? ''
                : '',
            Status: 'Pending',
            ApplicationApprovalStatus: 'Pending',
          };
        });
        console.log(this.StudentDataSource);
      },
      error: (error: any) => {
        console.log('Error fetching students: ', error);
      },
    });
  };
  openUploadExcel(id?: number) {
    // if (id !== undefined) {
    //   this.router.navigate(["/placement-upload-file", id]);
    // } else {
    //   this.router.navigate(["/placement-upload-file", ""]);
    // }

    const dialogRef: MatDialogRef<PlacementUploadFileComponent> =
      this.dialog.open(PlacementUploadFileComponent, {
        data: id,
        width: '500px',
        height: '250px',
      });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllStudents();
        this.getBatches();
        this.getBranches();
      }
    });
  }
  getBatches(): void {
    this.eligibleStudentsListApiService.GetBatches().subscribe({
      next: (batchData) => {
        this.batches = batchData.value.map((batch: any) => batch.Name);
        console.log('Available batches:', this.batches);
      },
      error: (error) => {
        console.error('Error fetching batches:', error);
      },
    });
  }

  getBranches(): void {
    this.eligibleStudentsListApiService.GetBranches().subscribe({
      next: (branchData) => {
        this.branches = branchData.value.map((branch: any) => branch.FullForm);
        console.log('Available branches:', this.branches);
      },
      error: (error) => {
        console.error('Error fetching branches:', error);
      },
    });
  }
}
