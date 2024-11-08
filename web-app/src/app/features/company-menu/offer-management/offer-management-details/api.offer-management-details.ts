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
export class OfferManagementDetailsApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  GetInterviewDetails(
    jobPostingId: number,
    studentId: number
  ): Observable<ODataEntity<Jobposting[]>> {
    let query = `/Jobposting?$filter=Id eq ${jobPostingId} &expand=Jobinterviewrounds($expand=JobpostStudentrounds($filter = StudentId eq ${studentId} ;$expand=Student) )`;
    return this.apiHttpService.get<ODataEntity<Jobposting[]>>(query);
  }
  GetInterviewDetailsbystudent(
    jobPostingId: number,
    studentId: number
  ): Observable<ODataEntity<Jobposting[]>> {
    let query = `/Jobposting?$filter=Id eq ${jobPostingId}&$expand=Jobinterviewrounds($expand=JobpostStudentrounds($filter=StudentId eq ${studentId};$expand=Student($expand=Studentacademics($expand=Course,Stream),Batch))),Collegejobpostings($expand=College)`;
    return this.apiHttpService.get<ODataEntity<Jobposting[]>>(query);
  }
  updateOfferStatus(
    jobPostingId: number,
    studentId: number,
    HasAcceptedOffer: number,
    id: number
  ): Observable<any> {
    const body = {
      jobPostingId: jobPostingId,
      studentId: studentId,
      HasAcceptedOffer: HasAcceptedOffer,
      id: id,
    };
    return this.apiHttpService.patch(
      `/JobpostingSelectedstudent?key=${id}`,
      body
    );
  }
}
