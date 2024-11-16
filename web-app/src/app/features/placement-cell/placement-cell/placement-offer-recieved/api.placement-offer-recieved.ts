import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
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
      "/JobpostingSelectedstudent?$expand=JobPosting($select=Id,JobRole,Salary,Location;$expand=Company($select=Name)),Student($select=Id,FirstName,LastName;$expand=Batch,StudentSkills($expand=Skill),Studentacademics($expand=Course))"
    );
  }
}
