import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Batch } from "src/app/services/types/Batch";
import { Campusregistration } from "src/app/services/types/Campusregistration";
import { Course } from "src/app/services/types/Course";
import { ODataEntity } from "src/app/services/types/OData";
import { SkillType } from "src/app/services/types/SkillType";
import { Stream } from "src/app/services/types/Stream";

@Injectable({
  providedIn: "root",
})
export class AddeditCompanyJobDetailsApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  public GetAllCollegeNames(): Observable<ODataEntity<Campusregistration[]>> {
    return this.apiHttpService.get<ODataEntity<Campusregistration[]>>(
      `/Campusregistration?select=CollegeName,Id`
    );
  }

  public GetAllBatches(): Observable<ODataEntity<Batch[]>> {
    return this.apiHttpService.get<ODataEntity<Batch[]>>(`/Batch`);
  }

  public GetAllCourses(): Observable<ODataEntity<Course[]>> {
    return this.apiHttpService.get<ODataEntity<Course[]>>(`/Course`);
  }

  public GetAllStreams(): Observable<ODataEntity<Stream[]>> {
    return this.apiHttpService.get<ODataEntity<Stream[]>>(`/Stream`);
  }

  public GetAllSkills(): Observable<ODataEntity<SkillType[]>> {
    return this.apiHttpService.get<ODataEntity<SkillType[]>>(
      `/SkillType?$expand=Skills`
    );
  }

  public GetSkillsByIds(ids: number[]): Observable<ODataEntity<SkillType[]>> {
    const filterQuery = ids.map((id) => `Id eq ${id}`).join(" or ");
    const odataUrl = `/SkillType?$filter=${filterQuery}&$expand=Skills`;
    return this.apiHttpService.get<ODataEntity<SkillType[]>>(odataUrl);
  }
}
