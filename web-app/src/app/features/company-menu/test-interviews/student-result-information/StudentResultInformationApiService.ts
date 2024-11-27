import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Jobposting } from "src/app/services/types/Jobposting";
import { Jobinterviewround } from "src/app/services/types/Jobinterviewround";
import { ODataEntity } from "src/app/services/types/OData";
import {
  JobpostStudentround,
  PostJobpostStudentround,
} from "src/app/services/types/JobpostStudentround";

@Injectable({
  providedIn: "root",
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
    const url = `/JobpostStudentround${id ? `?key=${id}` : ""}`;
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
}
