import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Companydatum } from "src/app/services/types/Companydatum";
import { Jobinterviewround } from "src/app/services/types/Jobinterviewround";
import { ODataEntity } from "src/app/services/types/OData";

@Injectable({
  providedIn: "root",
})
export class OfferManagementDetailsApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  GetAllOffers(
    id: number,
    options?: any
  ): Observable<ODataEntity<Companydatum[]>> {
    let query = `Companydatum/?$select=Id&expand=Jobpostings($select=JobRole;$expand=JobpostingSelectedstudents($select=HasAcceptedOffer;$expand=Student($select=FirstName,LastName)))&$filter=Id eq ${id}`;
    if (options.Status) {
      query += `and Status eq ${options.Status}`;
    }
    return this.apiHttpService.get<ODataEntity<Companydatum[]>>(query);
  }
}
