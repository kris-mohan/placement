import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { ODataResponse } from "./company-technology.component";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { CompanyTechnologies } from "./company-technology-module";

@Injectable({
  providedIn: "root",
})
export class CompanyTechnologyAPIService {
  constructor(private apiHttpService: ApiHttpService) {}

  public loadCompanyTechnologyData(): Observable<ODataResponse<any>> {
    return this.apiHttpService.get(
      `/Companytechonology?filter=Isdeleted eq false&$expand=Company&$expand=Technology`
    );
  }

  public getCompanyTechnologyDataById(
    id: number
  ): Observable<ODataResponse<any>> {
    return this.apiHttpService.get(`/Companytechonology?filter=Id eq ${id}`);
  }

  public deleteCompanyTechnology(id: number): Observable<any> {
    const url = `/Companytechonology?key=${id}`;
    const data = { isdeleted: true };
    return this.apiHttpService.patch(url, data);
  }

  public addUpdateCompanyTechnology(
    id: number | null,
    companyData: Partial<CompanyTechnologies>
  ): Observable<any> {
    const url = `/Companydatum?key=${id ? id : ""}`;
    const method = id ? "patch" : "post";
    return this.apiHttpService[method](url, companyData);
  }
}
