import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, Observable, throwError } from 'rxjs';
import { ApiHttpService } from 'src/app/services/api-services/api-http-services';
import { ODataEntity } from 'src/app/services/types/OData';

@Injectable({
  providedIn: 'root',
})
export class IndentRequirementsApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  public GetAllapprovals(): Observable<any> {
    return this.apiHttpService.get<any>('/');
  }

  public GetApprovalById(id: number): Observable<any> {
    return this.apiHttpService.get<any>(`/`);
  }

//   public addUpdateApproval(
//     id: number | null
//     // IndentForm: IndentForm
//   ): Observable<any> {
//     const url = `/`;
//     return id
//       ? this.apiHttpService.patch(url, IndentForm)
//       : this.apiHttpService.post(url, IndentForm);
//   }
}
