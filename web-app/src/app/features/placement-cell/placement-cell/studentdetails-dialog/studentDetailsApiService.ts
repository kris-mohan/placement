import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, Observable, throwError } from 'rxjs';
import { ODataResponse } from 'src/app/features/company-menu/company-job-details/test-rounds/add-rounds-modal/api-add-rounds-modal';
import { ApiHttpService } from 'src/app/services/api-services/api-http-services';
import { Companydatum } from 'src/app/services/types/Companydatum';
import { ODataEntity } from 'src/app/services/types/OData';
import { Studentacademic } from 'src/app/services/types/Studentacademic';
import { StudentSkill } from 'src/app/services/types/StudentSkill';
import { Tblstudent } from 'src/app/services/types/Tblstudent';

@Injectable({
  providedIn: 'root',
})
export class StudentDetailsDialogApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  GetStudentDetails(): Observable<ODataEntity<Tblstudent[]>> {
    return this.apiHttpService.get<ODataEntity<Tblstudent[]>>('/Tblstudent');
  }

  GetStudentDetailsById(id: number): Observable<ODataEntity<Tblstudent[]>> {
    return this.apiHttpService.get<ODataEntity<Tblstudent[]>>(
      `/Tblstudent?$filter=id eq ${id} &expand=Studentacademics(expand=Course,Stream,StudentSemesterMarks),Batch`
    );
  }

  GetStudentSkillsByStudentId(
    studentId: number
  ): Observable<ODataEntity<StudentSkill[]>> {
    return this.apiHttpService.get<ODataEntity<StudentSkill[]>>(
      `/StudentSkill?$filter=StudentId eq ${studentId}&expand=Skill(expand=SkillType)`
    );
  }
  GetCompanyDetails(
    studentId: number
  ): Observable<ODataEntity<Companydatum[]>> {
    return this.apiHttpService.get<ODataEntity<Companydatum[]>>(
      `/JobpostingsEligiblestudent?$filter=StudentId eq ${studentId} & expand=JobPosting(expand=Company),Status`
    );
  }
  GetSemesterData(id: number): Observable<ODataEntity<Studentacademic[]>> {
    return this.apiHttpService.get<ODataEntity<Studentacademic[]>>(
      `/Studentacademic?$filter=StudentId eq ${id} & expand =StudentSemesterMarks`
    );
  }

  VerifyAcademicStatus(
    id: number,
    formData: Partial<Studentacademic>
  ): Observable<Observable<any>> {
    return this.apiHttpService.patch<Observable<any>>(
      `/Studentacademic?key=${id}`,
      formData
    );
  }
}
