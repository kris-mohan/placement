import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Jobinterviewround } from "src/app/services/types/Jobinterviewround";
import { JobpostStudentround } from "src/app/services/types/JobpostStudentround";
import { ODataEntity } from "src/app/services/types/OData";

@Injectable({
  providedIn: "root",
})
export class StudentCalendarApiService {
  constructor(private apiHttpService: ApiHttpService) {}
  GetCalendarData(
    studentId: number
  ): Observable<ODataEntity<JobpostStudentround[]>> {
    return this.apiHttpService.get<ODataEntity<JobpostStudentround[]>>(
      `/JobpostStudentround?$filter=StudentId eq ${studentId} &expand=JobPostingRound(expand=Event)`
    );
  }
  public GetAllRounds(
    id: number
  ): Observable<ODataEntity<Jobinterviewround[]>> {
    return this.apiHttpService.get<ODataEntity<Jobinterviewround[]>>(
      `/Jobinterviewround?filter=JobPostingId eq ${id}`
    );
  }
}
