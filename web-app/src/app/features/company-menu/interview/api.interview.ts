import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Jobinterviewround } from "src/app/services/types/Jobinterviewround";
import { ODataEntity } from "src/app/services/types/OData";
import { ODataResponse } from "./interview.component";
import { Industry } from "src/app/services/types/Industry";

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
      //`/Jobinterviewround?expand=JobPosting(expand=Company)`
      `/Jobinterviewround?expand=JobPosting(expand=Company,JobpostingsEligiblestudents(expand=Status)),JobpostStudentrounds($expand=Student($expand=Studentacademics($expand=Course),Batch))`
    );
  }

  GetJobInterviewRoundsByCompanyId(
    companyId: number
  ): Observable<ODataEntity<Jobinterviewround[]>> {
    // return this.apiHttpService.get<ODataEntity<Jobinterviewround[]>>(
    //   "/Companydatum?$filter=Id eq 4&expand=Jobpostings(expand=Jobinterviewrounds)"
    // );
    return this.apiHttpService.get<ODataEntity<Jobinterviewround[]>>(
      `/Jobinterviewround?expand=JobPosting(expand=Company),JobpostStudentrounds($expand=Student($expand=Studentacademics($expand=Course),Batch))${
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
      }&$expand=JobpostStudentrounds($expand=JobPostingRound($expand=JobPosting(expand=Company,JobpostingsEligiblestudents(expand=Status))))`
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
  public loadCompanyData(): Observable<ODataResponse<any>> {
    return this.apiHttpService.get(
      "/Companydatum?filter=Isdeleted eq 0& $expand= Companyindustries($expand=Industry)"
    );
  }
  public loadIndustryData(): Observable<ODataEntity<Industry[]>> {
    return this.apiHttpService.get(`/Industry?filter=Isdeleted eq 0`);
  }

  loadInterviewRounds(): Observable<ODataEntity<Jobinterviewround[]>> {
    return this.apiHttpService.get(`/Jobinterviewround`);
  }
}
