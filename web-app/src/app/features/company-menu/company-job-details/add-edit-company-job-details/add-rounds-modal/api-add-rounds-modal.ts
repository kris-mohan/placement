import { ApiHttpService } from 'src/app/services/api-services/api-http-services';

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export interface ODataResponse<T> {
  value: T[];
}

@Injectable({
  providedIn: 'root',
})
export class InterviewRoundsAPIService {
  constructor(private apiHttpService: ApiHttpService) {}

  public getInterviewRounds(): Observable<ODataResponse<any>> {
    return this.apiHttpService.get(
      '/Jobinterviewround/?filter=Isdeleted eq false'
    );
  }

  public getInterviewRoundsById(id: number): Observable<ODataResponse<any>> {
    return this.apiHttpService.get(`/Jobinterviewround?filter=Id eq ${id}`);
  }

  public deleteInterviewRounds(id: number): Observable<any> {
    const url = `/Jobinterviewround?key=${id}`;
    const data = { isdeleted: true };
    return this.apiHttpService.patch(url, data);
  }

  public addInterviewRounds(
    id: number | null,
    roundsData: Partial<any>
  ): Observable<any> {
    const url = `/Jobinterviewround?key=${id ? id : ''}`;
    const method = id ? 'patch' : 'post';
    return this.apiHttpService[method](url, roundsData);
  }
}
