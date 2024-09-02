import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { ODataResponse } from "./technologies.component";
import { Observable } from "rxjs";
import { Technology } from "./technologies-module";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TechnologyAPIService {
  constructor(private apiHttpService: ApiHttpService) {}

  public loadTechnologyData(): Observable<ODataResponse<any>> {
    return this.apiHttpService.get("/Technology/?filter=Isdeleted eq false");
  }

  public getTechnologyDataById(
    id: number
  ): Observable<ODataResponse<Technology>> {
    return this.apiHttpService.get(`/Technology?filter=Id eq ${id}`);
  }

  public deleteTechnology(id: number): Observable<any> {
    const url = `/Technology?key=${id}`;
    const data = { isdeleted: true };
    return this.apiHttpService.patch(url, data);
  }

  public addUpdateTechnology(
    id: number | null,
    technologyData: Partial<Technology>
  ): Observable<any> {
    const url = `/Technology?key=${id ? id : ""}`;
    const method = id ? "patch" : "post";
    return this.apiHttpService[method](url, technologyData);
  }
}
