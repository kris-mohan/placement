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
}
