import { Observable } from "rxjs";
import { ODataResponse } from "./industry.component";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class IndustryAPIService {
  constructor(private apiHttpService: ApiHttpService) {}

  public loadIndustryData(): Observable<ODataResponse<any>> {
    return this.apiHttpService.get(`/Industry?filter=Isdeleted eq false`);
  }

  public getIndustryDataById(id: number): Observable<ODataResponse<any>> {
    return this.apiHttpService.get(`/Industry?filter=Id eq ${id}`);
  }

  public deleteIndustry(id: number): Observable<any> {
    const url = `/Industry?key=${id}`;
    const data = { isdeleted: true };
    return this.apiHttpService.patch(url, data);
  }

  public addUpdateIndustry(
    id: number | null,
    companyData: Partial<any>
  ): Observable<any> {
    const url = `/Industry?key=${id ? id : ""}`;
    const method = id ? "patch" : "post";
    return this.apiHttpService[method](url, companyData);
  }
}
