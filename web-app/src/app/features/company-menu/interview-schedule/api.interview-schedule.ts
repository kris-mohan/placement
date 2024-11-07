import { catchError, firstValueFrom, Observable } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Injectable } from "@angular/core";
import { ODataResponse } from "../interview/interview.component";
import { ODataEntity } from "src/app/services/types/OData";
import { Colleges, Universities } from "src/app/services/types/Universities";

@Injectable({
  providedIn: "root",
})
export class InterviewScheduleAPIService {
  constructor(private apiHttpService: ApiHttpService) {}

  getUniversities(): Observable<ODataEntity<Universities[]>> {
    return this.apiHttpService.get<ODataEntity<Universities[]>>(
      `/University`
    );
  }

  getColleges(): Observable<ODataEntity<Colleges[]>> {
    return this.apiHttpService.get<ODataEntity<Colleges[]>>(`/Campusregistration?$select=Id,CollegeName`)
  }

}
