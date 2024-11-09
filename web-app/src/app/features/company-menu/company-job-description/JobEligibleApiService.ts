import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";

@Injectable({
  providedIn: "root",
})
export class StudentEligibleApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  GetAllEligibleStudents(): Observable<any> {
    return this.apiHttpService.get<any>(
      `/Studentacademic?$expand=Student($expand=Batch),Course,Stream`
    );
  }
}
