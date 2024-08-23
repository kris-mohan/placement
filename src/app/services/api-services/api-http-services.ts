import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class ApiHttpService {
  constructor(private http: HttpClient) {}
  baseUrl = environment.API_URL;

  public get(url: string, options?: { responseType?: any }): Observable<any> {
    return this.http.get(this.baseUrl + url, options as { responseType: any });
  }

  public post(url: string, data: any, options?: any): Observable<any> {
    return this.http.post(this.baseUrl + url, data);
  }

  public put(url: string, data: any, options?: any): Observable<any> {
    return this.http.put(this.baseUrl + url, data);
  }
  public delete(url: string, options?: any) {
    return this.http.delete(this.baseUrl + url);
  }
}
