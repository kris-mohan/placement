import { Injectable } from "@angular/core";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Observable } from "rxjs";
import { ODataResponse } from "./companies.component";
import { companyTableList } from "./companies-model";
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CompanyAPIService {
  constructor(private apiHttpService: ApiHttpService) {}

  public loadCompanyData(): Observable<ODataResponse<any>> {
    return this.apiHttpService.get("/Companydatum/?filter=Isdeleted eq false");
  }

  public getCompanyDataById(id: number): Observable<ODataResponse<any>> {
    return this.apiHttpService.get(`/Companydatum?filter=Id eq ${id}`);
  }

  public deleteCompany(id: number): Observable<any> {
    const url = `/Companydatum?key=${id}`;
    const data = { isdeleted: true };
    return this.apiHttpService.patch(url, data);
  }

  public addUpdateCompany(
    id: number | null,
    CompanyData: Partial<any>
  ): Observable<any> {
    const url = `/Companydatum?key=${id ? id : ""}`;
    const method = id ? "patch" : "post";
    return this.apiHttpService[method](url, CompanyData);
  }
}
