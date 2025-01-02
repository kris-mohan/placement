import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Companydatum } from "src/app/services/types/Companydatum";
import { Industry } from "src/app/services/types/Industry";
import { Jobinterviewround } from "src/app/services/types/Jobinterviewround";
import { ODataEntity } from "src/app/services/types/OData";
export interface ODataResponse<T> {
  value: T[];
}

@Injectable({
  providedIn: "root",
})
export class interviewApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  GetJobInterviewRounds(): Observable<ODataEntity<Jobinterviewround[]>> {
    return this.apiHttpService.get<ODataEntity<Jobinterviewround[]>>(
      `/Jobinterviewround?$expand=JobPosting($select=JobRole,JobDescription,ValidFrom,ValidTill;$expand=Company($select=Name,LogoPath)),JobpostStudentrounds($expand=Student($expand=Org,Batch,Studentacademics($expand=Course)))`
    );
  }

  loadCompanyData(): Observable<ODataResponse<any>> {
    return this.apiHttpService.get(
      "/Companydatum?filter=Isdeleted eq 0& $expand= Companyindustries($expand=Industry)"
    );
  }
  loadIndustryData(): Observable<ODataEntity<Industry[]>> {
    return this.apiHttpService.get(`/Industry?filter=Isdeleted eq 0`);
  }
  loadInterviewRounds(): Observable<ODataEntity<Jobinterviewround[]>> {
    return this.apiHttpService.get(`/Jobinterviewround`);
  }

  loadJobRole(): Observable<ODataEntity<Jobinterviewround[]>> {
    return this.apiHttpService.get(
      `/Jobposting?$select=JobRole&$expand=Company($select=Name) `
    );
  }
}
