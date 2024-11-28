import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Jobinterviewround } from "src/app/services/types/Jobinterviewround";
import { ODataResponse } from "../../company-configuration/company-config/companies/companies.component";

@Injectable({
  providedIn: "root",
})
export class CompanyjobdescriptionApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  Getjobdescription(): Observable<any> {
    return this.apiHttpService.get<any>("/Jobposting?");
  }

  public getCompanyJobDescriptionById(
    id: number
  ): Observable<ODataResponse<any>> {
    return this.apiHttpService.get(
      //`/Jobposting?filter=Id eq ${id}&$expand=Company($select=Name),Collegejobpostings($expand=College($select=CollegeName)),CompanyJobStreams($expand=Stream($select=Name)),CompanyJobBatches($expand=Batch($select=Name)),CompanyJobCourses($expand=Course($select=Name))`
      `/Jobposting?$filter= Id eq ${id} & expand = CompanyJobBatches(expand=Batch),CompanyJobCourses(expand=Course),CompanyJobStreams(expand=Stream),JobpostingSkills(expand =Skill(expand=SkillType))`
    );
  }
}
