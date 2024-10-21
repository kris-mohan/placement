import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Companydatum } from "src/app/services/types/Companydatum";

@Injectable({
  providedIn: "root",
})
export class PlacementCompanyApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  GetAllCompanies(): Observable<Companydatum[]> {
    return this.apiHttpService.get<Companydatum[]>("/Companydatum");
  }
 

}
