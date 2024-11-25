import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Jobinterviewround } from "src/app/services/types/Jobinterviewround";
import { ODataEntity } from "src/app/services/types/OData";

@Injectable({
  providedIn: "root",
})
export class interviewApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  GetJobInterviewRounds(): Observable<ODataEntity<Jobinterviewround[]>> {
    // return this.apiHttpService.get<ODataEntity<Jobinterviewround[]>>(
    //   "/Companydatum?$filter=Id eq 4&expand=Jobpostings(expand=Jobinterviewrounds)"
    // );
    return this.apiHttpService.get<ODataEntity<Jobinterviewround[]>>(
      `/Jobinterviewround?expand=JobPosting(expand=Company)`
    );
  }

  GetJobInterviewRoundsByCompanyId(
    companyId: number
  ): Observable<ODataEntity<Jobinterviewround[]>> {
    // return this.apiHttpService.get<ODataEntity<Jobinterviewround[]>>(
    //   "/Companydatum?$filter=Id eq 4&expand=Jobpostings(expand=Jobinterviewrounds)"
    // );
    return this.apiHttpService.get<ODataEntity<Jobinterviewround[]>>(
      `/Jobinterviewround?expand=JobPosting(expand=Company)${
        companyId != 0 ? `&filter=JobPosting/CompanyId eq ${companyId}` : ""
      }`
    );
  }

  GetJobInterviewRoundsByStudentId(
    studentId: number
  ): Observable<ODataEntity<any[]>> {
    // return this.apiHttpService.get<ODataEntity<Jobinterviewround[]>>(
    //   "/Companydatum?$filter=Id eq 4&expand=Jobpostings(expand=Jobinterviewrounds)"
    // );
    return this.apiHttpService.get<ODataEntity<any[]>>(
      `/Tblstudent?${
        studentId != 0 ? `$filter=Id eq ${studentId}` : ""
      }&$expand=JobpostStudentrounds($expand=JobPostingRound($expand=JobPosting($expand=Company)))`
    );
  }
  GetBatches(): Observable<any> {
    return this.apiHttpService.get(`/Batch`);
  }
  GetBranches(): Observable<any> {
    return this.apiHttpService.get(`/Course`);
  }
  GetUniversities(): Observable<any> {
    return this.apiHttpService.get(`/University`);
  }
  GetAllColleges(): Observable<any> {
    return this.apiHttpService.get("/Campusregistration");
  }
}
