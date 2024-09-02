import { Injectable } from "@angular/core";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { ODataResponse } from "./invitations.component";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class InvitationAPIService {
  constructor(private apiHttpService: ApiHttpService) {}

  public loadInvitationData(): Observable<ODataResponse<any>> {
    return this.apiHttpService.get("/Invitation/?filter=Isdeleted eq false");
  }

  public getInvitationDataById(id: number): Observable<ODataResponse<any>> {
    return this.apiHttpService.get(`/Invitation?filter=Id eq ${id}`);
  }

  public deleteInvitation(id: number): Observable<any> {
    const url = `/Invitation?key=${id}`;
    const data = { isdeleted: true };
    return this.apiHttpService.patch(url, data);
  }

  public addUpdateInvitation(
    id: number | null,
    InvitationData: Partial<any>
  ): Observable<any> {
    const url = `/Invitation?key=${id ? id : ""}`;
    const method = id ? "patch" : "post";
    return this.apiHttpService[method](url, InvitationData);
  }
}
