import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { ODataResponse } from "./student-registration.component";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StudentRegistrationAPIService {
  constructor(private apiHttpService: ApiHttpService) {}

  public loadStudentRegistrationData(): Observable<ODataResponse<any>> {
    return this.apiHttpService.get("/Login/?filter=Isdeleted eq false");
  }

  public getStudentRegistrationDataById(
    id: number
  ): Observable<ODataResponse<any>> {
    return this.apiHttpService.get(`/Login?filter=Id eq ${id}`);
  }

  public deleteStudentRegistration(id: number): Observable<any> {
    const url = `/Login?key=${id}`;
    const data = { isdeleted: true };
    return this.apiHttpService.patch(url, data);
  }

  public addUpdateStudentRegistration(
    id: number | null,
    StudentData: Partial<any>
  ): Observable<any> {
    const url = `/Studentregistartion?key=${id ? id : ""}`;
    const method = id ? "patch" : "post";
    return this.apiHttpService[method](url, StudentData);
  }
}
