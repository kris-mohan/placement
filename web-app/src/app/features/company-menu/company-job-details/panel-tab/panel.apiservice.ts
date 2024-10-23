import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PanelAPIService {
  constructor(private apiHttpService: ApiHttpService) {}

  public GetAllPanelData(): Observable<any> {
    return this.apiHttpService.get(
      "/Jobinterviewpanel"
    );
  }

  public GetPanelDataById(id: number): Observable<any> {
    return this.apiHttpService.get(`/Jobinterviewpanel?filter=Id eq ${id}`);
  }

  public DeletePanel(id: number): Observable<any> {
    const url = `/Jobinterviewpanel?key=${id}`;
    const data = { isdeleted: true };
    return this.apiHttpService.patch(url, data);
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
