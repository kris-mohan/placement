import { Injectable } from "@angular/core";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { ODataResponse } from "./job-postings.component";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class JobPostingAPIService {
  constructor(private apiHttpService: ApiHttpService) {}

  public loadJobPostingData(): Observable<ODataResponse<any>> {
    return this.apiHttpService.get(`/Jobposting?filter=Isdeleted eq false`);
  }

  public getJobPostingDataById(id: number): Observable<ODataResponse<any>> {
    return this.apiHttpService.get(`/Jobposting?filter=Id eq ${id}`);
  }

  public deleteJobPosting(id: number): Observable<any> {
    const url = `/Jobposting?key=${id}`;
    const data = { isdeleted: true };
    return this.apiHttpService.patch(url, data);
  }

  public addUpdateJobPosting(
    id: number | null,
    jobPostingData: Partial<any>
  ): Observable<any> {
    const url = `/Jobposting?key=${id ? id : ""}`;
    const method = id ? "patch" : "post";
    return this.apiHttpService[method](url, jobPostingData);
  }
}
