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
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class EditProfileApiService {
  constructor(
    private apiHttpService: ApiHttpService,
    private http: HttpClient
  ) {}

  public GetAllIndustries(): Observable<ODataEntity<Industry[]>> {
    return this.apiHttpService.get<ODataEntity<Industry[]>>(`/Industry`);
  }

  PatchCompanyDetails(
    id: number,
    profileData: PatchCompanyDatum
  ): Observable<any> {
    return this.apiHttpService.patch(`/Companydatum?key=${id}`, profileData);
  }

  uploadDocument(formData: FormData): Observable<any> {
    return this.http.post<any>(
      `https://localhost:44304/api/Files/UploadFiles`,
      formData
    );
  }

  saveDocumentDetails(doc: any): Observable<any> {
    return this.apiHttpService.post(`/Document`, doc);
  }
}
