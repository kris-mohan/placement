import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { CampusCompany } from "src/app/services/types/CampusCompany";
import { Companydatum } from "src/app/services/types/Companydatum";
import { ODataEntity } from "src/app/services/types/OData";

@Injectable({
  providedIn: "root",
})
export class PlacementCompanyJobDetailsApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  GetCompanyById(id: number): Observable<ODataEntity<Companydatum[]>> {
    return this.apiHttpService.get<ODataEntity<Companydatum[]>>(
      `/Companydatum?$expand=Jobpostings($filter = IsDeleted eq 0)&$filter=id eq ${id} and IsDeleted eq 0`
    );
  }

  GetCampusCompanyById(
    id: number | null
  ): Observable<ODataEntity<CampusCompany[]>> {
    return this.apiHttpService.get<ODataEntity<CampusCompany[]>>(
      `/CampusCompany?filter=CompanyId eq ${id}`
    );
  }

  DeleteCompanyById(id: number): Observable<any> {
    return this.apiHttpService.delete<ODataEntity<any>>(
      `/CampusCompany?key=${id}`
    );
  }
}
