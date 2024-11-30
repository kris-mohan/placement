import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, Observable, throwError } from 'rxjs';
import { ApiServiceDashboard } from 'src/app/services/api-services/api-service-dashboard';
import { ODataEntity } from 'src/app/services/types/OData';

@Injectable({
  providedIn: 'root',
})
export class PlacementDashboardApiService {
  constructor(private apiHttpService: ApiServiceDashboard) {}

  GetPlacementsByGender(): Observable<any> {
    return this.apiHttpService.get<any>('/placements-by-gender');
  }

  GetStudentPlacementData(): Observable<any> {
    return this.apiHttpService.get<any>('/GetStudentPlacementData');
  }

  GetBranchPlacements(): Observable<any> {
    return this.apiHttpService.get<any>(`/branch-placements`);
  }

  GetYearlyPlacements(): Observable<any> {
    return this.apiHttpService.get<any>(`/yearly-placement-comparison`);
  }

  GetSkillDemand(): Observable<any> {
    return this.apiHttpService.get<any>(`/skill-demand`);
  }

  GetUpcomingDrives(): Observable<any> {
    return this.apiHttpService.get<any>(`/Jobposting`);
  }

  GetUpcomingDriveById(id: number): Observable<any> {
    return this.apiHttpService.get<any>(`/Jobposting?$filter=Id eq ${id}`);
  }
}
