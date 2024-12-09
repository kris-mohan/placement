import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Jobposting } from "src/app/services/types/Jobposting";
import { Jobinterviewround } from "src/app/services/types/Jobinterviewround";
import { ODataEntity } from "src/app/services/types/OData";
import { JobpostingsEligiblestudent } from "src/app/services/types/JobpostingsEligibleStudent";
import { JobpostStudentround } from "src/app/services/types/JobpostStudentround";

@Injectable({
  providedIn: "root",
})
export class InterviewStudentListApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  public GetAllStudentInterviewList(
    id: number
  ): Observable<ODataEntity<Jobposting[]>> {
    return this.apiHttpService.get<any>(
      `/Jobposting?$filter=CompanyId eq ${id} & expand=Jobinterviewrounds(expand=JobpostStudentrounds),JobpostingSelectedstudents,JobpostingsEligiblestudents`
    );
  }

  public GetAllStudentsByJobInterviewRounds(
    id: number
  ): Observable<ODataEntity<Jobposting[]>> {
    return this.apiHttpService.get<ODataEntity<Jobposting[]>>(
      `/Jobposting?$expand=Jobinterviewrounds($expand=JobpostStudentrounds($expand=Student($expand=Org,Batch,Studentacademics($expand=Course))))&$filter=Id eq ${id}`
    );
  }

  public GetJobpostingsAcceptedStudents(
    id: number
  ): Observable<ODataEntity<JobpostingsEligiblestudent[]>> {
    return this.apiHttpService.get<ODataEntity<JobpostingsEligiblestudent[]>>(
      `/JobpostingsEligiblestudent?filter=JobPostingId eq ${id} & expand=JobPosting(expand=Jobinterviewrounds(expand=JobpostStudentrounds)),Status,Student(expand=Batch,Studentacademics(expand=Course))`
    );
  }

  public GetAllJobInterviewStudentsData(
    id: number
  ): Observable<ODataEntity<Jobinterviewround[]>> {
    return this.apiHttpService.get<ODataEntity<Jobinterviewround[]>>(
      `/Jobinterviewround?$filter=Id eq ${id} & expand = JobPosting, JobpostStudentrounds(expand =Student(expand=Batch,Org,Studentacademics(expand=Course,Stream)))`
    );
  }
  public GetAllStudentsByRoundId(
    Id: number
  ): Observable<ODataEntity<Jobinterviewround[]>> {
    return this.apiHttpService.get<ODataEntity<Jobinterviewround[]>>(
      `/Jobinterviewround?$expand=JobpostStudentrounds($expand=Student($expand=Batch,Studentacademics($expand=Course)))&$filter=Id eq ${Id}`
    );
  }
}
