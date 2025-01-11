import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { ODataEntity } from "src/app/services/types/OData";
import { TemplateCategory } from "src/app/services/types/TemplateCategory";

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
  GetTemplateCategory(): Observable<ODataEntity<TemplateCategory[]>> {
    return this.apiHttpService.get<ODataEntity<TemplateCategory[]>>(
      `/TemplateCategory?$filter=contains(Name, 'Student Invitation')&$expand=Templates`
    );
  }
  GetTemplate(): Observable<ODataEntity<TemplateCategory[]>> {
    return this.apiHttpService.get<ODataEntity<TemplateCategory[]>>(
      `/TemplateCategory?$filter=contains(Name, 'OTP Verification')&$expand=Templates`
    );
  }
  SendOfferLetter(email: {
    To: string;
    Cc: string;
    Bcc: string;
    Subject: string;
    Body: string;
  }) {
    return this.apiHttpService.post(`/Email/`, email);
  }
  getStudentLoginDetails(studentId: number): Observable<any> {
    return this.apiHttpService.get(`/Login?$filter=StudentId eq ${studentId}`);
  }
  updateStudentStatus(id: number, data: { IsSentInvitation: boolean }) {
    const url = `/TblStudent?key=${id}`;
    return this.apiHttpService.patch(url, data);
  }
  updateStudentLoginDetails(id: number, updatedData: any) {
    return this.apiHttpService.patch(`/Login?key=${id}`, {
      Password: updatedData.Password,
    });
  }
}
