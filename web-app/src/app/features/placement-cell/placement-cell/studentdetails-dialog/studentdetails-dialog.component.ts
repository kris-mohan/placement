import { Component, Inject, signal } from '@angular/core';
import { AMGModules } from 'src/AMG-Module/AMG-module';
import { MatTableDataSource } from '@angular/material/table';
import { Tblstudent } from 'src/app/services/types/Tblstudent';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentDetailsDialogApiService } from './studentDetailsApiService';
import { Studentacademic } from 'src/app/services/types/Studentacademic';
import { StudentSemesterMark } from 'src/app/services/types/StudentSemesterMark';
import { StudentSkill } from 'src/app/services/types/StudentSkill';
import { GetDate } from 'src/app/core/helper/DateHelper';
import { CommonModule } from '@angular/common';
import { JobStatus } from 'src/app/services/common-dropdowns/JobStatus';

@Component({
  selector: 'app-studentdetails-dialog',
  standalone: true,
  imports: [AMGModules, CommonModule],
  templateUrl: './studentdetails-dialog.component.html',
  styleUrl: './studentdetails-dialog.component.css',
})
export class StudentdetailsDialogComponent {
  studentById: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) private studentId: number,
    private studentDetailsApiService: StudentDetailsDialogApiService
  ) {
    this.studentById = studentId;
  }
  studentData = signal<Tblstudent[]>([]);
  studentAcademicsData = signal<Studentacademic[]>([]);
  studentSemesterMarksData = signal<StudentSemesterMark[]>([]);
  JobStatus: string[] = JobStatus;
  studentSkillsData = new MatTableDataSource<{
    skillType: string;
    skills: string;
  }>([]);
  statusData = new MatTableDataSource<{
    companyName: string;
    status: string;
    interviewDate: string;
  }>([]);

  studentSemWiseMarksData = new MatTableDataSource<{
    semesterName: string;
    sgpa: number;
    actions: string;
    status?: string;
  }>();

  class12thMarksData = new MatTableDataSource<{
    semesterName: string;
    sgpa: number;
  }>();

  class10thMarksData = new MatTableDataSource<{
    semesterName: string;
    sgpa: number;
  }>();

  displayedSkillsColumns: string[] = ['skillType', 'skills'];

  displayedStatusColumns: string[] = [
    'companyName',
    'jobRole',
    'status',
    'interviewDate',
  ];
  displayedSemesterColumns: string[] = ['semesterName', 'sgpa', 'actions'];

  ngOnInit(): void {
    this.getStudentDetails();
    this.getStudentSkills();
    this.getstatusData();
    this.getSemesterData();
  }

  getStudentDetails = () => {
    this.studentDetailsApiService
      .GetStudentDetailsById(this.studentById)
      .subscribe({
        next: (response) => {
          const data: Tblstudent[] = response.value;
          this.studentData.set(data);
          this.studentAcademicsData.set(data[0].Studentacademics);
          this.studentSemesterMarksData.set(
            this.studentAcademicsData()[0].StudentSemesterMarks
          );
          console.log(this.studentSemesterMarksData());
        },
        error: (error) => {
          console.error('Error fetching Student details:', error);
        },
      });
  };

  getStudentSkills = () => {
    this.studentDetailsApiService
      .GetStudentSkillsByStudentId(this.studentById)
      .subscribe({
        next: (response) => {
          const data: StudentSkill[] = response.value;
          const groupedData: { [key: string]: string[] } = {};
          data.forEach((item) => {
            const skillTypeName = item.Skill?.SkillType?.Name || '';
            const skillName = item.Skill?.Name || '';
            if (!groupedData[skillTypeName]) {
              groupedData[skillTypeName] = [];
            }
            groupedData[skillTypeName].push(skillName);
          });
          this.studentSkillsData.data = Object.keys(groupedData).map((key) => ({
            skillType: key,
            skills: groupedData[key].join(', '),
          }));
          console.log(this.studentSkillsData);
        },
        error: (error) => {
          console.error('Error fetching Student details:', error);
        },
      });
  };

  getstatusData = () => {
    this.studentDetailsApiService
      .GetCompanyDetails(this.studentById)
      .subscribe({
        next: (response) => {
          const formattedData = response.value.map((item: any) => {
            const driveDate = item.JobPosting?.DriveDate;
            const interviewDate = driveDate ? GetDate(new Date(driveDate)) : '';

            return {
              companyName: item.JobPosting?.Company?.Name || '',
              jobRole: item.JobPosting?.JobRole || '',
              status: item.Status?.Name || '',
              interviewDate,
            };
          });
          this.statusData.data = formattedData;
        },
        error: (error) => {
          console.error('Error fetching status data:', error);
        },
      });
  };
  getSemesterData = () => {
    this.studentDetailsApiService.GetSemesterData(this.studentById).subscribe({
      next: (response) => {
        const data = response.value.flatMap((item: any) =>
          (item.StudentSemesterMarks || []).map((mark: any) => ({
            semesterName: `Sem ${mark.Semester || 0}`,
            sgpa: mark.Sgpa || 0,
            actions: '',
            status: '',
          }))
        );
        console.log('Data Source:', this.studentSemWiseMarksData.data);
        let class12thDataSet = {
          semesterName: '12th',
          sgpa: response.value[0].TwelthMarks,
          actions: '',
          status: '',
        };
        const class12thData: {
          semesterName: string;
          sgpa: number;
        }[] = [];
        class12thData.push(class12thDataSet);

        let class10thDataset = {
          semesterName: '10th',
          sgpa: response.value[0].TenthMarks,
          actions: '',
        };
        const class10thData: { semesterName: string; sgpa: number }[] = [];
        class10thData.push(class10thDataset);

        this.studentSemWiseMarksData.data = data;
        this.class12thMarksData.data = class12thData;
        this.class10thMarksData.data = class10thData;
        console.log('Mapped Semester Data:', data);
        console.log('class 12th marks Data:', class12thData);
        console.log('class 10th marks Data:', class10thData);
      },
      error: (error) => {
        console.error('Error fetching status data:', error);
      },
    });
  };

  onApproveClick(sem: any): void {
    sem.status = 'approved';
    console.log('Approved', sem);
    // alert(`Approved: ${sem.semesterName}, SGPA: ${sem.sgpa}`);
  }
  onRejectClick(sem: any): void {
    sem.status = 'rejected';
    console.log('Rejected', sem);
    // alert(`Rejected: ${sem.semesterName}, SGPA: ${sem.sgpa}`);
  }
}
