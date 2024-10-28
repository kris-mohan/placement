import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Jobposting } from "src/app/services/types/Jobposting";
import { ODataEntity } from "src/app/services/types/OData";

@Injectable({
  providedIn: "root",
})
export class CompanyJobDetailsApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  public GetAllJobPostings(id: number): Observable<ODataEntity<Jobposting[]>> {
    return this.apiHttpService.get<ODataEntity<Jobposting[]>>(
      `/Jobposting?$filter=CompanyId eq ${id}`
    );
  }

  public GetJobPostingsDataById(
    id: number
  ): Observable<ODataEntity<Jobposting>> {
    return this.apiHttpService.get(`/Jobposting?filter=Id eq ${id}`);
  }

  public DeleteJobPosting(id: number): Observable<ODataEntity<Jobposting>> {
    const url = `/Jobposting?key=${id}`;
    const data = { isdeleted: true };
    return this.apiHttpService.patch(url, data);
  }

  public AddUpdateJobPosting(
    id: number | null,
    JobPostingData: Partial<ODataEntity<Jobposting>>
  ): Observable<any> {
    const url = `/Jobposting?key=${id ? id : ""}`;
    const method = id ? "patch" : "post";
    return this.apiHttpService[method](url, JobPostingData);
  }
}
