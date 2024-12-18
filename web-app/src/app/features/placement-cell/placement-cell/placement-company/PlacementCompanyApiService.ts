import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetDateInYYYYMMDD } from "src/app/core/helper/DateHelper";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { CampusCompany } from "src/app/services/types/CampusCompany";
import { Companydatum } from "src/app/services/types/Companydatum";
import { Industry } from "src/app/services/types/Industry";
import { ODataEntity } from "src/app/services/types/OData";
import { ODataResponse } from "./placement-company.component";

@Injectable({
  providedIn: "root",
})
export class PlacementCompanyApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  GetAllCompanies(): Observable<ODataEntity<Companydatum[]>> {
    return this.apiHttpService.get<ODataEntity<Companydatum[]>>(
      `/Companydatum?$expand=Jobpostings($filter=ValidTill ge ${GetDateInYYYYMMDD(
        new Date()
      )};$select=Id,Vacancies;$expand=Company($expand=Companyindustries($expand= Industry)))`
    );
  }

  GetAllCompanyCampuses(id: number): Observable<ODataEntity<CampusCompany[]>> {
    return this.apiHttpService.get<ODataEntity<CampusCompany[]>>(
      `/CampusCompany?$expand=Company($expand=Jobpostings($filter=ValidTill ge ${GetDateInYYYYMMDD(
        new Date()
      )};$select=Id,Vacancies;$expand=Company($expand=Companyindustries($expand= Industry))))&filter=CampusId eq ${id}`
    );
  }

  GetCompanyById(id: number): Observable<ODataEntity<Companydatum[]>> {
    return this.apiHttpService.get<ODataEntity<Companydatum[]>>(
      `/Companydatum?$expand=Jobpostings&$filter=id eq ${id}`
    );
  }
  GetAllIndustries(): Observable<ODataEntity<Industry[]>> {
    return this.apiHttpService.get<ODataEntity<Industry[]>>(`/Industry`);
  }
  public loadCompanyData(): Observable<ODataResponse<any>> {
    return this.apiHttpService.get(
      "/Companydatum?filter=Isdeleted eq 0& $expand= Companyindustries($expand=Industry)"
    );
  }
  public loadIndustryData(): Observable<ODataEntity<Industry[]>> {
    return this.apiHttpService.get(`/Industry?filter=Isdeleted eq 0`);
  }
}
