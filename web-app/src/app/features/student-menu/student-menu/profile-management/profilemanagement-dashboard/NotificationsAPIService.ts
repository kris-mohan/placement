import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  catchError,
  firstValueFrom,
  Observable,
  ObservableLike,
  throwError,
} from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { notification } from "src/app/services/types/Notifications";
import { ODataEntity } from "src/app/services/types/OData";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class NotificationsApiService {
  constructor(
    private apiHttpService: ApiHttpService,
    private http: HttpClient
  ) {}
  baseUrl = environment.API_BASE_URL;

  Notification(notification: any): Observable<any> {
    return this.apiHttpService.post(`/Notification`, notification);
  }
  GetNotification(): Observable<ODataEntity<notification[]>> {
    return this.apiHttpService.get<ODataEntity<notification[]>>(
      ` /Notification `
    );
  }
  GetNotificationForCompanyId(
    id: number
  ): Observable<ODataEntity<notification[]>> {
    return this.apiHttpService.get<ODataEntity<notification[]>>(
      `/Notification?$filter=CompanyId eq ${id}`
    );
  }
  GetNotificationForCampusId(
    id: number
  ): Observable<ODataEntity<notification[]>> {
    return this.apiHttpService.get<ODataEntity<notification[]>>(
      `/Notification?$filter=CampusId eq ${id}`
    );
  }
  GetNotificationStudentId(
    id: number
  ): Observable<ODataEntity<notification[]>> {
    return this.apiHttpService.get<ODataEntity<notification[]>>(
      `/Notification?$filter=StudentId eq ${id} or ParentType eq 'student'`
    );
  }
}
