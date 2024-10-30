import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Industry } from "src/app/services/types/Industry";
import { Jobinterviewround } from "src/app/services/types/Jobinterviewround";
import { ODataEntity } from "src/app/services/types/OData";
import { Tblstudent } from "src/app/services/types/Tblstudent";

@Injectable({
  providedIn: "root",
})
export class StudentOfferRecievedApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  GetAllSelectedStudents(id: number): Observable<ODataEntity<Tblstudent[]>> {
    return this.apiHttpService.get<ODataEntity<Tblstudent[]>>(
      `/Tblstudent?select=Id,BatchId&filter=id eq ${id} & expand=JobpostingSelectedstudents(expand=JobPosting($select=JobRole,Salary,Location,Shift,ModeOfWork;$expand=Company($select=Name,LogoPath)))`
    );
  }

  GetAllIndustries(): Observable<ODataEntity<Industry[]>> {
    return this.apiHttpService.get<ODataEntity<Industry[]>>(`/Industry`);
  }
}
