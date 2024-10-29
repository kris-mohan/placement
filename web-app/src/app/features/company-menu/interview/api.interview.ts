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

  // }
  GetJobInterviewRounds(): Observable<ODataEntity<Jobinterviewround[]>> {
    // return this.apiHttpService.get<ODataEntity<Jobinterviewround[]>>(
    //   "/Companydatum?$filter=Id eq 4&expand=Jobpostings(expand=Jobinterviewrounds)"
    // );
    return this.apiHttpService.get<ODataEntity<Jobinterviewround[]>>(
      "/Jobinterviewround?expand=JobPosting(expand=Company)"
    );
  }

  // GetJobInterviewRounds1(): Observable<ODataEntity<Jobinterviewround[]>> {
  //   // return this.apiHttpService.get<ODataEntity<Jobinterviewround[]>>(
  //   //   "/Companydatum?$filter=Id eq 4&expand=Jobpostings(expand=Jobinterviewrounds)"
  //   // );
  //   return this.apiHttpService.post<ODataEntity<Jobinterviewround[]>>(
  //     "/Jobinterviewround", {

  //     }
  //   );
  // }
}
