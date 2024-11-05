import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, Observable, throwError } from 'rxjs';
import { ApiHttpService } from 'src/app/services/api-services/api-http-services';
import { Jobposting } from 'src/app/services/types/Jobposting';
import { ODataEntity } from 'src/app/services/types/OData';

@Injectable({
  providedIn: 'root',
})
export class InterviewScheduleApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  public GetAllJobPostings(id: number): Observable<ODataEntity<Jobposting[]>> {
    return this.apiHttpService.get<any>(
      `/Jobposting?$filter=CompanyId eq ${id} & expand=Jobinterviewrounds`
    );
  }

  //   public GetAllJobPostingsById(
  //     id: number
  //   ): Observable<ODataEntity<Jobposting[]>> {
  //     return this.apiHttpService.get(`/Jobposting?filter=Id eq ${id}`);
  //   }

  //   public deleteJobPosting(id: number): Observable<ODataEntity<Jobposting[]>> {
  //     const url = `/Jobposting?key=${id}`;
  //     const data = { isdeleted: true };
  //     return this.apiHttpService.patch(url, data);
  //   }

  //   public addJobPosting(
  //     id: number | null,
  //     IndentForm: Jobposting
  //   ): Observable<ODataEntity<Jobposting[]>> {
  //     const url = `/Jobposting${id ? `?key=${id}` : ''}`;
  //     return id
  //       ? this.apiHttpService.patch(url, IndentForm)
  //       : this.apiHttpService.post(url, IndentForm);
  //   }
}
