import { Injectable } from "@angular/core";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { ODataResponse } from "./company-industry.component";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CompanyindustryAPIService {
  constructor(private apiHttpService: ApiHttpService) {}

  public loadCompanyindustryData(): Observable<ODataResponse<any>> {
    return this.apiHttpService.get(
      "/Companyindustry/?filter=Isdeleted eq false"
    );
  }

  public getCompanyindustryDataById(
    id: number
  ): Observable<ODataResponse<any>> {
    return this.apiHttpService.get(`/Companyindustry?filter=Id eq ${id}`);
  }

  public deleteCompanyindustry(id: number): Observable<any> {
    const url = `/Companyindustry?key=${id}`;
    const data = { isdeleted: true };
    return this.apiHttpService.patch(url, data);
  }

  public addUpdateCompanyindustry(
    id: number | null,
    InvitationData: Partial<any>
  ): Observable<any> {
    const url = `/Companyindustry?key=${id ? id : ""}`;
    const method = id ? "patch" : "post";
    return this.apiHttpService[method](url, InvitationData);
  }
}
