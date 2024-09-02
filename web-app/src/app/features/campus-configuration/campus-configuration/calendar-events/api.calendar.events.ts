import { Injectable } from "@angular/core";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { ODataResponse } from "./calendar-events.component";
import { Observable } from "rxjs";
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
} from "@angular-material-components/datetime-picker";

@Injectable({
  providedIn: "root",
})
export class CalendarEventAPIService {
  constructor(private apiHttpService: ApiHttpService) {}

  public loadCalendarEventData(): Observable<ODataResponse<any>> {
    return this.apiHttpService.get("/Calendarevent/?filter=Isdeleted eq false");
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
}
