import { Observable } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { ODataResponse } from "./campus-registration.component";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CampusRegistrationAPIService {
  constructor(private apiHttpService: ApiHttpService) {}

  public loadCampusRegistrationData(): Observable<ODataResponse<any>> {
    return this.apiHttpService.get(
      "/Campusregistration/?filter=Isdeleted eq false"
    );
  }

  public getCampusRegistrationDataById(
    id: number
  ): Observable<ODataResponse<any>> {
    return this.apiHttpService.get(`/Campusregistration?filter=Id eq ${id}`);
  }

  public deleteCampusRegistration(id: number): Observable<any> {
    const url = `/Campusregistration?key=${id}`;
    const data = { isdeleted: true };
    return this.apiHttpService.patch(url, data);
  }

  public addUpdateCampusRegistration(
    id: number | null,
    CompanyData: Partial<any>
  ): Observable<any> {
    const url = `/Campusregistration?key=${id ? id : ""}`;
    const method = id ? "patch" : "post";
    return this.apiHttpService[method](url, CompanyData);
  }
}
