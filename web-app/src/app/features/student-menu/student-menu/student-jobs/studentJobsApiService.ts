import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Jobposting } from "src/app/services/types/Jobposting";

@Injectable({
  providedIn: "root",
})
export class StudentJobsApiSerivce {
  constructor(private apiHttpService: ApiHttpService) {}

  GetAllJobPosting(): Observable<Jobposting> {
    return this.apiHttpService.get<Jobposting>("/Jobposting");
  }
}
