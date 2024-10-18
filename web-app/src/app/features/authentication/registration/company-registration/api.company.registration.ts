import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { ODataResponse } from "./company-registration.component";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CompanyRegistrationAPIService {
  constructor(private apiHttpService: ApiHttpService) {}

  public loadCampusRegistrationData(): Observable<ODataResponse<any>> {
    return this.apiHttpService.get("/Login/?filter=Isdeleted eq false");
  }

  public getCompanyRegistrationDataById(
    id: number
  ): Observable<ODataResponse<any>> {
    return this.apiHttpService.get(`/Login?filter=Id eq ${id}`);
  }

  public deleteCompanyRegistration(id: number): Observable<any> {
    const url = `/Login?key=${id}`;
    const data = { isdeleted: true };
    return this.apiHttpService.patch(url, data);
  }

  public addUpdateCompanyRegistration(
    id: number | null,
    CompanyData: Partial<any>
  ): Observable<any> {
    const url = `/Companydatum?key=${id ? id : ""}`;
    const method = id ? "patch" : "post";
    return this.apiHttpService[method](url, CompanyData);
  }
}
