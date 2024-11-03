import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Campusregistration } from "src/app/services/types/Campusregistration";
import { Companydatum } from "src/app/services/types/Companydatum";
import { Jobinterviewround } from "src/app/services/types/Jobinterviewround";
import { Jobposting } from "src/app/services/types/Jobposting";
import { JobpostingSelectedstudent } from "src/app/services/types/JobpostingSelectedstudent";
import { Jobstudentstatus } from "src/app/services/types/Jobstudentstatus";
import { ODataEntity } from "src/app/services/types/OData";
import { Technology } from "src/app/services/types/Technology";
import { University } from "src/app/services/types/University";

@Injectable({
  providedIn: "root",
})
export class OfferManagementApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  GetAllOffers(
    id: number,
    options?: any
  ): Observable<ODataEntity<JobpostingSelectedstudent[]>> {
    let query = `/JobpostingSelectedstudent?$select=Id,JobPostingId,StudentId,HasAcceptedOffer,OfferLetterSentDate,OfferLetterExpiryDate&$expand=JobPosting($select=Id,CompanyId,JobRole),Student($select=Id,FirstName,LastName)&$apply=filter(JobPosting/CompanyId eq ${id})`;
    if (options.Status) {
      query += `&Status eq ${options.Status}`;
    }
    return this.apiHttpService.get<ODataEntity<JobpostingSelectedstudent[]>>(
      query
    );
  }

  GetAllUniversities(): Observable<ODataEntity<University[]>> {
    return this.apiHttpService.get<ODataEntity<University[]>>("/University");
  }

  GetAllColleges(): Observable<ODataEntity<Campusregistration[]>> {
    return this.apiHttpService.get<ODataEntity<Campusregistration[]>>(
      "/Campusregistration"
    );
  }

  GetAllStatuses(): Observable<ODataEntity<Jobstudentstatus[]>> {
    return this.apiHttpService.get<ODataEntity<Jobstudentstatus[]>>(
      "/Jobstudentstatus"
    );
  }

  GetAllTechnologies(): Observable<ODataEntity<Technology[]>> {
    return this.apiHttpService.get<ODataEntity<Technology[]>>("/Technology");
  }
}
