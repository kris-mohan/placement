import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Companydatum } from "src/app/services/types/Companydatum";
import { Jobinterviewround } from "src/app/services/types/Jobinterviewround";
import { JobpostingSelectedstudent } from "src/app/services/types/JobpostingSelectedstudent";
import { ODataEntity } from "src/app/services/types/OData";
import { University } from "src/app/services/types/University";

@Injectable({
  providedIn: "root",
})
export class OfferManagementDetailsApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  GetAllOffers(
    id: number,
    options?: any
  ): Observable<ODataEntity<JobpostingSelectedstudent[]>> {
    let query = `/JobpostingSelectedstudent?$select=Id,JobPostingId,StudentId,HasAcceptedOffer&$expand=JobPosting($select=Id,CompanyId,JobRole),Student($select=Id,FirstName,LastName)&$apply=filter(JobPosting/CompanyId eq ${id})`;
    if (options.Status) {
      query += `&Status eq ${options.Status}`;
    }
    return this.apiHttpService.get<ODataEntity<JobpostingSelectedstudent[]>>(
      query
    );
  }

  GetAllUniversities(): Observable<University[]> {
    return this.apiHttpService.get<University[]>("/University");
  }
}
