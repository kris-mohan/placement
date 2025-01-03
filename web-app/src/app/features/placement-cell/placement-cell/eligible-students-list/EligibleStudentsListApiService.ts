import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";

@Injectable({
  providedIn: "root",
})
export class EligibleStudentsListApiService {
  constructor(
    private apiHttpService: ApiHttpService,
    private http: HttpClient
  ) {}

  GetAllStudents(): Observable<any> {
    return this.apiHttpService.get<any>(
      "/Tblstudent?$expand=Batch($select=Name),Studentacademics($expand=Course,Stream)"
    );
  }

  GetStudentsById(id: number): Observable<any> {
    return this.apiHttpService.get(`/Tblstudent?filter=Id eq ${id}`);
  }
  GetBatches(): Observable<any> {
    return this.apiHttpService.get(`/Batch`);
  }
  GetBranches(): Observable<any> {
    return this.apiHttpService.get(`/Course`);
  }
  ExportEligibleStudents(): Observable<Blob> {
    return this.http.get(
      "https://localhost:44304/api/common/ExportEligibleStudents",
      {
        responseType: "blob",
      }
    );
  }
}
