import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";

@Injectable({
  providedIn: "root",
})
export class JobEligibleStudentApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  GetAllStudents(): Observable<any> {
    return this.apiHttpService.get<any>("/Tblstudent");
  }

  GetAllStudentsById(id: number): Observable<any> {
    return this.apiHttpService.get(`/Tblstudent?filter=Id eq ${id}`);
  }
}
