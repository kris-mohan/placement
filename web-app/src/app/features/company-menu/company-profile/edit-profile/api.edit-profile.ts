import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import {
  Companydatum,
  PatchCompanyDatum,
  PostCompanydatum,
} from "src/app/services/types/Companydatum";
import { Industry } from "src/app/services/types/Industry";
import { ODataEntity } from "src/app/services/types/OData";

@Injectable({
  providedIn: "root",
})
export class EditProfileApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  public GetAllIndustries(): Observable<ODataEntity<Industry[]>> {
    return this.apiHttpService.get<ODataEntity<Industry[]>>(`/Industry`);
  }

  PatchCompanyDetails(
    id: number,
    profileData: PatchCompanyDatum
  ): Observable<any> {
    return this.apiHttpService.patch(`/Companydatum?key=${id}`, profileData);
  }
}
