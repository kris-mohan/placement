import { Injectable } from "@angular/core";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Observable } from "rxjs";
import { ODataEntity } from "src/app/services/types/OData";
import {
  CampusCompany,
  PostCampusCompany,
} from "src/app/services/types/CampusCompany";
import { PostCompanydatum } from "src/app/services/types/Companydatum";

@Injectable({
  providedIn: "root",
})
export class CompanyDetailDialogModalAPIService {
  constructor(private apiHttpService: ApiHttpService) {}

  //   public loadCompanyData(): Observable<ODataEntity<any>> {
  //     return this.apiHttpService.get(
  //       "/Companydatum?filter=Isdeleted eq false& $expand= Companyindustries($expand=Industry)"
  //     );
  //   }

  //   public getCompanyDataById(id: number): Observable<ODataResponse<any>> {
  //     return this.apiHttpService.get(`/Companydatum?filter=Id eq ${id}`);
  //   }

  //   public deleteCompany(id: number): Observable<any> {
  //     const url = `/Companydatum?key=${id}`;
  //     const data = { isdeleted: true };
  //     return this.apiHttpService.patch(url, data);
  //   }

  public addCampusCompany(
    campusCompany: CampusCompany | PostCampusCompany
  ): Observable<any> {
    const url = `/CampusCompany`;
    return this.apiHttpService.post(url, campusCompany);
  }

  //   public getCompanyIndustry(): Observable<ODataResponse<any>> {
  //     return this.apiHttpService.get(`/Industry?$select=Type`);
  //   }
}
