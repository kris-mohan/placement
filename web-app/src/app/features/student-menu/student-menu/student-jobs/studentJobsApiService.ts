import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Jobposting } from "src/app/services/types/Jobposting";
import { ODataEntity } from "src/app/services/types/OData";

@Injectable({
  providedIn: "root",
})
export class StudentJobsApiSerivce {
  constructor(private apiHttpService: ApiHttpService) {}

  GetAllJobPostings(): Observable<ODataEntity<Jobposting[]>> {
    return this.apiHttpService.get<ODataEntity<Jobposting[]>>(
      `/Jobposting?expand=Company($select=Name)`
    );
  }

  GetJobPostingById(id?: number): Observable<ODataEntity<Jobposting[]>> {
    return this.apiHttpService.get<ODataEntity<Jobposting[]>>(
      `/Jobposting?expand=Company&$filter=id eq ${id}`
    );
  }
}
