import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetDateInYYYYMMDD } from "src/app/core/helper/DateHelper";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Companydatum } from "src/app/services/types/Companydatum";
import { Industry } from "src/app/services/types/Industry";
import { ODataEntity } from "src/app/services/types/OData";

@Injectable({
  providedIn: "root",
})
export class PlacementCompanyApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  GetAllCompanies(): Observable<ODataEntity<Companydatum[]>> {
    return this.apiHttpService.get<ODataEntity<Companydatum[]>>(
      `/Companydatum?$expand=Jobpostings($filter=ValidTill ge ${GetDateInYYYYMMDD(
        new Date()
      )};$select=Id;$expand=Company($expand=Companyindustries($expand= Industry)))`
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
}
