import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";

@Injectable({
  providedIn: "root",
})
export class CompanyFileUploadAPIService {
  constructor(
    private apiHttpService: ApiHttpService,
    private http: HttpClient
  ) {}

  uploadDocument(formData: FormData): Observable<any> {
    return this.http.post<any>(
      `https://localhost:44304/api/common/upload-companies"`,
      formData
    );
  }
}
