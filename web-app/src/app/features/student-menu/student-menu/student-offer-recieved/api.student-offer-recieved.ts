import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Industry } from "src/app/services/types/Industry";
import { Jobinterviewround } from "src/app/services/types/Jobinterviewround";
import { JobpostingSelectedstudent } from "src/app/services/types/JobpostingSelectedstudent";
import { ODataEntity } from "src/app/services/types/OData";
import { Tblstudent } from "src/app/services/types/Tblstudent";

@Injectable({
  providedIn: "root",
})
export class StudentOfferRecievedApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  GetAllOfferRecieved(
    id: number
  ): Observable<ODataEntity<JobpostingSelectedstudent[]>> {
    return this.apiHttpService.get<ODataEntity<JobpostingSelectedstudent[]>>(
      //`/Tblstudent?select=Id,BatchId&filter=id eq ${id} & expand=JobpostingSelectedstudents(expand=JobPosting($select=JobRole,Salary,Location,Shift,ModeOfWork;$expand=Company($select=Name,LogoPath)))`
      // `/JobpostStudentround?$filter=StudentId eq ${studentId}& expand = JobPostingRound(expand=JobPosting($expand=Company)),Student($expand=Studentacademics)`
      `/JobpostingSelectedstudent?$filter=StudentId eq ${id} & expand =JobPosting(expand= Company),Student`
    );
  }

  GetAllIndustries(): Observable<ODataEntity<Industry[]>> {
    return this.apiHttpService.get<ODataEntity<Industry[]>>(`/Industry`);
  }
}
