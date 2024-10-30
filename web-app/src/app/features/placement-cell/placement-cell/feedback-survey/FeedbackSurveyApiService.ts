import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, Observable, throwError } from 'rxjs';
import { ApiHttpService } from 'src/app/services/api-services/api-http-services';
import { ODataEntity } from 'src/app/services/types/OData';

@Injectable({
  providedIn: 'root',
})
export class FeedbackSurveyApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  public GetAllFeedbacks(): Observable<any> {
    return this.apiHttpService.get<any>('/');
  }

  public GetAllFeedbackById(id: number): Observable<any> {
    return this.apiHttpService.get<any>(`/`);
  }

  public GetAllSurveys(): Observable<any> {
    return this.apiHttpService.get<any>('/');
  }

  public GetSurveyById(id: number): Observable<any> {
    return this.apiHttpService.get<any>(`/`);
  }

  public deleteFeedback(id: number): Observable<any> {
    const url = `/Companydatum?key=${id}`;
    const data = { isdeleted: true };
    return this.apiHttpService.patch(url, data);
  }
  public deleteSurvey(id: number): Observable<any> {
    const url = `/Companydatum?key=${id}`;
    const data = { isdeleted: true };
    return this.apiHttpService.patch(url, data);
  }
  public addUpdateFeedbackSurvey(
    id: number | null
    // IndentForm: IndentForm
  ): Observable<any> {
    const url = `/Companydatum${id ? `?key=${id}` : ''}`;
    return id
      ? this.apiHttpService.patch(url, '')
      : this.apiHttpService.post(url, '');
  }
}
