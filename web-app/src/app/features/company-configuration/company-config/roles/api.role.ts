import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { ODataResponse } from "./roles.component";

@Injectable({
  providedIn: "root",
})
export class RoleAPIService {
  constructor(private apiHttpService: ApiHttpService) {}

  public loadRoleData(): Observable<ODataResponse<any>> {
    return this.apiHttpService.get("/Role/?filter=Isdeleted eq false");
  }

  public getRoleDataById(id: number): Observable<ODataResponse<any>> {
    return this.apiHttpService.get(`/Role?filter=Id eq ${id}`);
  }

  public deleteRole(id: number): Observable<any> {
    const url = `/Role?key=${id}`;
    const data = { isdeleted: true };
    return this.apiHttpService.patch(url, data);
  }

  public addUpdateRole(
    id: number | null,
    RoleData: Partial<any>
  ): Observable<any> {
    const url = `/Role?key=${id ? id : ""}`;
    const method = id ? "patch" : "post";
    return this.apiHttpService[method](url, RoleData);
  }
}
