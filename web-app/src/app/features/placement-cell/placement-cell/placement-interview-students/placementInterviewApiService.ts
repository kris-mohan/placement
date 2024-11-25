import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";

@Injectable({
  providedIn: "root",
})
export class InterviewPlacementApiservice {
  constructor(private apiHttpService: ApiHttpService) {}

  GetAllStudents(id: number): Observable<any> {
    return this.apiHttpService.get<any>(
      `/Jobposting?$expand=Jobinterviewrounds($expand=JobpostStudentrounds($expand=Student($expand=Org,Batch,Studentacademics($expand=Course))))&$filter=Id eq ${id}`
    );
  }

  GetAllStudentsById(id: number): Observable<any> {
    return this.apiHttpService.get(`/Tblstudent?filter=Id eq ${id}`);
  }
}
