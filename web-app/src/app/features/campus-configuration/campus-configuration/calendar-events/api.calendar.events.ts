import { Injectable } from "@angular/core";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { ODataResponse } from "./calendar-events.component";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CalendarEventAPIService {
  constructor(
    private apiHttpService: ApiHttpService,
    private http: HttpClient
  ) {}

  public loadCalendarEventData(): Observable<ODataResponse<any>> {
    return this.apiHttpService.get("/Calendarevent/?filter=Isdeleted eq 0");
  }

  public getCalendarEventById(id: number): Observable<ODataResponse<any>> {
    return this.apiHttpService.get(`/Calendarevent?filter=Id eq ${id}`);
  }

  public deleteCalendarEvent(id: number): Observable<any> {
    const url = `/Calendarevent?key=${id}`;
    const data = { isdeleted: true };
    return this.apiHttpService.patch(url, data);
  }

  public addUpdateCalendarEvent(
    id: number | null,
    CalendarEventData: Partial<any>
  ): Observable<any> {
    const url = `/Calendarevent?key=${id ? id : ""}`;
    const method = id ? "patch" : "post";
    return this.apiHttpService[method](url, CalendarEventData);
  }
  downloadCalendarevent(): Observable<Blob> {
    const url = `https://localhost:44304/api/common/ExportCampusCalendarEvents`;
    return this.http.get(url, { responseType: "blob" });
  }
}
