import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Industry } from "src/app/services/types/Industry";
import { Jobinterviewround } from "src/app/services/types/Jobinterviewround";
import { JobpostingSelectedstudent } from "src/app/services/types/JobpostingSelectedstudent";
import { ODataEntity } from "src/app/services/types/OData";

@Injectable({
  providedIn: "root",
})
export class PlacementOfferRecievedApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  GetAllOffersRecieved(): Observable<ODataEntity<JobpostingSelectedstudent[]>> {
    return this.apiHttpService.get<ODataEntity<JobpostingSelectedstudent[]>>(
      "/JobpostingSelectedstudent?$expand=JobPosting($select=Id,JobRole,Salary,Location,JobType;$expand=Company($select=Name,Id;$expand=Companyindustries($expand= Industry))),Student($select=Id,FirstName,LastName,RollNo;$expand=Batch,StudentSkills($expand=Skill),Studentacademics($expand=Course))"
    );
  }
  GetAllIndustries(): Observable<ODataEntity<Industry[]>> {
    return this.apiHttpService.get<ODataEntity<Industry[]>>(`/Industry`);
  }
  GetBatches(): Observable<any> {
    return this.apiHttpService.get(`/Batch`);
  }
  GetBranches(): Observable<any> {
    return this.apiHttpService.get(`/Course`);
  }
}
