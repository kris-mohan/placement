import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";

@Injectable({
  providedIn: "root",
})
export class CompanyJobDetailsApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  public GetAllJobPostings(): Observable<any> {
    return this.apiHttpService.get(`/Jobposting/?filter=IsDeleted eq 0`);
  }

  public GetJobPostingsDataById(id: number): Observable<any> {
    return this.apiHttpService.get(`/Jobposting?filter=Id eq ${id}`);
  }

  public DeleteJobPosting(id: number): Observable<any> {
    const url = `/Jobposting?key=${id}`;
    const data = { isdeleted: true };
    return this.apiHttpService.patch(url, data);
  }

  public AddUpdateJobPosting(
    id: number | null,
    JobPostingData: Partial<any>
  ): Observable<any> {
    const url = `/Jobposting?key=${id ? id : ""}`;
    const method = id ? "patch" : "post";
    return this.apiHttpService[method](url, JobPostingData);
  }
}
