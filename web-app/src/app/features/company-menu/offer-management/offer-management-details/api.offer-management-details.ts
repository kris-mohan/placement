import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Campusregistration } from "src/app/services/types/Campusregistration";
import { Companydatum } from "src/app/services/types/Companydatum";
import { Jobinterviewround } from "src/app/services/types/Jobinterviewround";
import { Jobposting } from "src/app/services/types/Jobposting";
import { JobpostingSelectedstudent } from "src/app/services/types/JobpostingSelectedstudent";
import { Jobstudentstatus } from "src/app/services/types/Jobstudentstatus";
import { ODataEntity } from "src/app/services/types/OData";
import { Technology } from "src/app/services/types/Technology";
import { University } from "src/app/services/types/University";

@Injectable({
  providedIn: "root",
})
export class OfferManagementDetailsApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  GetAllDetails(id: number): Observable<ODataEntity<Jobinterviewround[]>> {
    let query = `/Jobinterviewround?$filter=JobPostingId eq ${id}&expand=JobpostStudentrounds`;
    // if (options.Status) {
    //   query += `&Status eq ${options.Status}`;
    // }
    return this.apiHttpService.get<ODataEntity<Jobinterviewround[]>>(query);
  }
}
