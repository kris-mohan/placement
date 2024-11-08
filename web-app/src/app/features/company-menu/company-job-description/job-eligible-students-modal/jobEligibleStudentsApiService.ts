import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { observableToBeFn } from "rxjs/internal/testing/TestScheduler";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Jobposting } from "src/app/services/types/Jobposting";
import { ODataEntity } from "src/app/services/types/OData";
import { Tblstudent } from "src/app/services/types/Tblstudent";

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

  GetAllInvitingStudents(query: string): Observable<ODataEntity<Tblstudent[]>> {
    return this.apiHttpService.get<ODataEntity<Tblstudent[]>>(query);
  }

  public GetJobPostingDetailsById(
    companyId: number,
    jobPostingId: number
  ): Observable<ODataEntity<Jobposting[]>> {
    return this.apiHttpService.get<ODataEntity<Jobposting[]>>(
      `/Jobposting?filter=CompanyId eq ${companyId} and Id eq ${jobPostingId} &$expand=CompanyJobBatches,CompanyJobCourses,CompanyJobStreams`
    );
  }
}
