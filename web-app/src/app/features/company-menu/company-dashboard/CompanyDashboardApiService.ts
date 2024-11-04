import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, Observable, throwError } from 'rxjs';
import { ApiHttpService } from 'src/app/services/api-services/api-http-services';
import { ODataEntity } from 'src/app/services/types/OData';

@Injectable({
  providedIn: 'root',
})
export class CompanyDashboardApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  public GetUpcomingWeeklyDrives(): Observable<any> {
    return this.apiHttpService.get<any>('/');
  }

  public GetUpcomingWeeklyDrivesById(id: number): Observable<any> {
    return this.apiHttpService.get<any>(`/`);
  }

  GetNotifications(): Observable<any> {
    return this.apiHttpService.get<any>('/');
  }

  GetScheduledInterviews(): Observable<any> {
    return this.apiHttpService.get<any>('/');
  }
}
