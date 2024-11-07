import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Jobposting } from "src/app/services/types/Jobposting";
import { Jobinterviewround } from "src/app/services/types/Jobinterviewround";
import { ODataEntity } from "src/app/services/types/OData";

@Injectable({
  providedIn: "root",
})
export class IndentRequirementsApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  public GetAllStudentInterviewList(
    id: number
  ): Observable<ODataEntity<Jobposting[]>> {
    return this.apiHttpService.get<any>(
      `/Jobposting?$filter=CompanyId eq ${id} & expand=Jobinterviewrounds(expand=JobpostStudentrounds),JobpostingSelectedstudents,JobpostingsEligiblestudents`
    );
  }

  public GetAllStudentsByJobInterviewRounds(
    id: number
  ): Observable<ODataEntity<Jobposting[]>> {
    return this.apiHttpService.get<ODataEntity<Jobposting[]>>(
      `/Jobposting?$expand=Jobinterviewrounds($expand=JobpostStudentrounds($expand=Student($expand=Org,Batch,Studentacademics($expand=Course))))&$filter=Id eq ${id}`
    );
  }

  //   public GetAllIndentsDynamicField(): Observable<ODataEntity<Jobposting[]>> {
  //     return this.apiHttpService.get<any>('/IndentFormDynamicField');
  //   }
}
