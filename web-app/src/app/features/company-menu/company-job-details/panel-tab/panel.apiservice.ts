import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PanelAPIService {
  [x: string]: any;
  constructor(private apiHttpService: ApiHttpService) {}

  public GetAllPanelData(id: number | null): Observable<any> {
    return this.apiHttpService.get(
      `/Jobinterviewpanel?filter=JobPostingId eq ${id}`
    );
  }

  public GetPanelDataById(id: number | null): Observable<any> {
    return this.apiHttpService.get(`/Jobinterviewpanel?filter=Id eq ${id}`);
  }

  public DeletePanel(id: number): Observable<any> {
    const url = `/Jobinterviewpanel?key=${id}`;
    const data = { isdeleted: true };
    return this.apiHttpService.delete(url);
  }

  public AddUpdatePanel(
    id: number | null,
    PanelData: Partial<any>
  ): Observable<any> {
    const url = `/Jobinterviewpanel?key=${id ? id : ""}`;
    const method = id ? "patch" : "post";
    return this.apiHttpService[method](url, PanelData);
  }
}
