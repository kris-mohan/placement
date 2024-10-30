import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Batch } from "src/app/services/types/Batch";
import { Campusregistration } from "src/app/services/types/Campusregistration";
import { Course } from "src/app/services/types/Course";
import { Jobposting, PostJobposting } from "src/app/services/types/Jobposting";
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
    const filterQuery =
      ids.length > 0 ? ids.map((id) => `Id eq ${id}`).join(" or ") : "";
    const odataUrl = filterQuery
      ? `/SkillType?$filter=${filterQuery}&$expand=Skills`
      : `/SkillType?$expand=Skills`;

    return this.apiHttpService.get<ODataEntity<SkillType[]>>(odataUrl);
  }

  public GetJobPostingById(id: number): Observable<ODataEntity<Jobposting[]>> {
    return this.apiHttpService.get<ODataEntity<Jobposting[]>>(
      `/Jobposting?$filter=Id eq ${id}`
    );
  }

  public addUpdateJobPosting(
    id: number | null,
    jobPosting: PostJobposting
  ): Observable<any> {
    const url = `/Jobposting${id ? `?key=${id}` : ""}`;
    return id
      ? this.apiHttpService.patch(url, jobPosting)
      : this.apiHttpService.post(url, jobPosting);
  }
}
