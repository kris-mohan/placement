import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import {
  Calendarevent,
  PostCalendarevent,
} from "src/app/services/types/Calendarevent";
import { Jobposting } from "src/app/services/types/Jobposting";
import { ODataEntity } from "src/app/services/types/OData";

@Injectable({
  providedIn: "root",
})
export class InterviewScheduleApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  public GetAllJobPostings(id: number): Observable<ODataEntity<Jobposting[]>> {
    return this.apiHttpService.get<any>(
      `/Jobposting?$filter=CompanyId eq ${id} & expand=Jobinterviewrounds`
    );
  }
  GetInterview(): Observable<ODataEntity<Jobposting[]>> {
    return this.apiHttpService.get<ODataEntity<Jobposting[]>>("/Jobposting");
  }

  GetInterviewSchedule(): Observable<ODataEntity<Jobposting[]>> {
    return this.apiHttpService.get<ODataEntity<Jobposting[]>>(
      `/Jobposting?$expand=Jobinterviewrounds`
    );
  }

  GetInterviewSchedule1(): Observable<ODataEntity<Jobposting[]>> {
    return this.apiHttpService.get<ODataEntity<Jobposting[]>>(
      `/Jobposting?$filter=CompanyId eq 4&$expand=Jobinterviewrounds`
    );
  }
  GetCalendarData(): Observable<ODataEntity<Calendarevent[]>> {
    return this.apiHttpService.get<ODataEntity<Calendarevent[]>>(
      `/Calendarevent`
    );
  }
  saveCalendarEvent(
    event: PostCalendarevent
  ): Observable<ODataEntity<Calendarevent>> {
    return this.apiHttpService.post<ODataEntity<Calendarevent>>(
      `/Calendarevent`,
      event
    );
  }
  // saveCalendarEvent(
  //   event: PostCalendarevent,
  //   id: number | null
  // ): Observable<ODataEntity<Calendarevent>> {
  //   const url = `/Calendarevent(${id})`;
  //   //const url = `/Calendarevent${id ? `?key=${id}` : ""}`;
  //   return this.apiHttpService.patch<ODataEntity<Calendarevent>>(url, event);
  //   return this.apiHttpService.post<ODataEntity<Calendarevent>>(
  //     "/Calendarevent",
  //     event
  //   );
  // }
  updateCalendarEvent(id: number, event: PostCalendarevent): Observable<any> {
    return this.apiHttpService.patch(`/Calendarevent?key=${id}`, event);
  }
}
