import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, Observable, throwError } from 'rxjs';
import { ApiHttpService } from 'src/app/services/api-services/api-http-services';
import { Jobposting } from 'src/app/services/types/Jobposting';
import { Jobinterviewround } from 'src/app/services/types/Jobinterviewround';
import { ODataEntity } from 'src/app/services/types/OData';
import { Template } from 'src/app/services/types/Template';
import {
  JobpostStudentround,
  PostJobpostStudentround,
} from 'src/app/services/types/JobpostStudentround';
import { JobpostingSelectedstudent } from 'src/app/services/types/JobpostingSelectedstudent';
import { postJobpostingSelectedstudent } from 'src/app/services/types/postjobpostingselectedstudent';
import { TemplateCategory } from 'src/app/services/types/TemplateCategory';
import { Email } from 'src/app/services/types/Email';
import { Tblstudent } from 'src/app/services/types/Tblstudent';

@Injectable({
  providedIn: 'root',
})
export class StudentResultInformationApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  public GetAllStudentResult(
    id: number
  ): Observable<ODataEntity<Jobposting[]>> {
    return this.apiHttpService.get<ODataEntity<Jobposting[]>>(
      `/Jobposting?$filter=CompanyId eq ${id} & expand=Jobinterviewrounds(expand=JobpostStudentrounds)`
    );
  }

  GetnextRoundTemplate(): Observable<ODataEntity<TemplateCategory[]>> {
    return this.apiHttpService.get<ODataEntity<TemplateCategory[]>>(
      `/TemplateCategory?$filter=contains(Name, 'Notification')&$expand=Templates`
    );
  }

  GetStudentEmail(id: number): Observable<ODataEntity<Tblstudent[]>> {
    return this.apiHttpService.get<ODataEntity<Tblstudent[]>>(
      `/Tblstudent?$filter=Id eq ${id}&$select=Email,Id,FirstName,LastName`
    );
  }

  public deleteStudentResult(
    id: number
  ): Observable<ODataEntity<Jobposting[]>> {
    const url = `/Companydatum?key=${id}`;
    const data = { isdeleted: true };
    return this.apiHttpService.patch(url, data);
  }

  public addUpdateStudentResult(
    id: number | null,
    IndentForm: Jobposting
  ): Observable<ODataEntity<Jobposting[]>> {
    const url = `/JobpostStudentround${id ? `?key=${id}` : ''}`;
    return id
      ? this.apiHttpService.patch(url, IndentForm)
      : this.apiHttpService.post(url, IndentForm);
  }

  public GetJobInterviewRounds(
    id: number
  ): Observable<ODataEntity<Jobposting[]>> {
    return this.apiHttpService.get<ODataEntity<Jobposting[]>>(
      `/Jobposting?$expand=Jobinterviewrounds($expand=JobpostStudentrounds($expand=Student($expand=Org,Batch,Studentacademics($expand=Course))))&$filter=Id eq ${id}`
    );
  }

  public MoveToNextRoundOrReject(
    JobpostStudentround: PostJobpostStudentround
  ): Observable<any> {
    const url = `/JobpostStudentround`;
    return this.apiHttpService.post(url, JobpostStudentround);
  }

  public generateOffer(
    JobpostStudentround: postJobpostingSelectedstudent
  ): Observable<any> {
    const url = `/JobpostingSelectedstudent`;
    return this.apiHttpService.post(url, JobpostStudentround);
  }

  public JobpostStudentround(
    studentId: number,
    jobPostingId: number
  ): Observable<ODataEntity<JobpostStudentround[]>> {
    return this.apiHttpService.get<ODataEntity<JobpostStudentround[]>>(
      `/JobpostStudentround?$filter=StudentId eq ${studentId} and JobPostingRound/JobPostingId eq ${jobPostingId}`
    );
  }

  selectedForNextRoundEmail(email: Email) {
    return this.apiHttpService.post<Email>(`/Email`, email);
  }

  getNextRoundTemplates(): Observable<ODataEntity<Template[]>> {
    let url = `/Template?filter= Name eq 'Upcoming Interview Round Notificaion'`;
    return this.apiHttpService.get<ODataEntity<Template[]>>(url);
  }

  // public selectedForNextRoundEmail(
  //   Email: PostJobpostStudentround
  // ): Observable<any> {
  //   const url = `/JobpostStudentround`;
  //   return this.apiHttpService.post(url, JobpostStudentround);
  // }
}
