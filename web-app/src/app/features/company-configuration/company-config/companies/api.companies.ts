import { Injectable } from "@angular/core";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Observable } from "rxjs";
import { ODataResponse } from "./companies.component";
import { companyTableList } from "./companies-model";
import { HttpParams } from "@angular/common/http";
import {
  Companydatum,
  PostCompanydatum,
} from "src/app/services/types/Companydatum";

@Injectable({
  providedIn: "root",
})
export class CompanyAPIService {
  constructor(private apiHttpService: ApiHttpService) {}

  public loadCompanyData(): Observable<ODataResponse<any>> {
    return this.apiHttpService.get(
      "/Companydatum?filter=Isdeleted eq false& $expand= Companyindustries($expand=Industry)"
    );
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
    companydatum: Companydatum | PostCompanydatum
  ): Observable<any> {
    const url = `/Companydatum${id ? `?key=${id}` : ""}`;
    return id
      ? this.apiHttpService.patch(url, companydatum)
      : this.apiHttpService.post(url, companydatum);
  }
}
