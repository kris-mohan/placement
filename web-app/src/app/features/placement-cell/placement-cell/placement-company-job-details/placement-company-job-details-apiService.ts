import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Companydatum } from "src/app/services/types/Companydatum";
import { ODataEntity } from "src/app/services/types/OData";

@Injectable({
  providedIn: "root",
})
export class PlacementCompanyJobDetailsApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  GetCompanyById(id: number): Observable<ODataEntity<Companydatum[]>> {
    return this.apiHttpService.get<ODataEntity<Companydatum[]>>(
      `/Companydatum?$expand=Jobpostings&$filter=id eq ${id}`
    );
  }
}
