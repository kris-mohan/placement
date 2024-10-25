import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, Observable, throwError } from 'rxjs';
import { ApiHttpService } from 'src/app/services/api-services/api-http-services';

@Injectable({
  providedIn: 'root',
})
export class IndentPlacementApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  GetAllIndents(): Observable<any> {
    return this.apiHttpService.get<any>(
      '/IndentForm?$expand=IndentFormDynamicFields'
    );
  }

  GetAllIndentsDynamicField(): Observable<any> {
    return this.apiHttpService.get<any>('/IndentFormDynamicField');
  }

  GetAllIndentsById(id: number): Observable<any> {
    return this.apiHttpService.get(`/IndentForm?filter=Id eq ${id}`);
  }
}
