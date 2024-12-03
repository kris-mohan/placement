import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import {
  Companydatum,
  PostCompanydatum,
} from "src/app/services/types/Companydatum";
import { Documents } from "src/app/services/types/Documents";
import { ODataEntity } from "src/app/services/types/OData";

@Injectable({
  providedIn: "root",
})
export class CompanyProfileApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  GetCompanyProfile(): Observable<ODataEntity<Companydatum[]>> {
    return this.apiHttpService.get<ODataEntity<Companydatum[]>>(
      "/Companydatum"
    );
  }
  GetCompanyProfileDocuments(): Observable<ODataEntity<Documents[]>> {
    return this.apiHttpService.get<ODataEntity<Documents[]>>("/Document");
  }

  GetCompanyProfileById(id: number): Observable<ODataEntity<Companydatum[]>> {
    return this.apiHttpService.get<ODataEntity<Companydatum[]>>(
      `/Companydatum?$expand=Jobpostings,Companyindustries($expand=Industry)&$filter=id eq ${id}`
    );
  }

  public deleteCompany(id: number): Observable<ODataEntity<Companydatum[]>> {
    const url = `/Companydatum?key=${id}`;
    const data = { isdeleted: true };
    return this.apiHttpService.patch(url, data);
  }

  public addUpdateCompany(
    id: number | null,
    companydatum: Companydatum | PostCompanydatum
  ): Observable<ODataEntity<Companydatum[]>> {
    const url = `/Companydatum${id ? `?key=${id}` : ""}`;
    return id
      ? this.apiHttpService.patch(url, companydatum)
      : this.apiHttpService.post(url, companydatum);
  }
}
