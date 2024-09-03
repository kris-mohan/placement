import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { ODataResponse } from "./login-auth/login-auth.component";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthAPIService {
  //   constructor(private apiHttpService: ApiHttpService) {}
  //   public loadCompanyData(): Observable<ODataResponse<any>> {
  //     return this.apiHttpService.get("/Companydatum/?filter=Isdeleted eq false");
  //   }
  //   public getCompanyDataById(id: number): Observable<ODataResponse<any>> {
  //     return this.apiHttpService.get(`/Companydatum?filter=Id eq ${id}`);
  //   }
  //   public deleteCompany(id: number): Observable<any> {
  //     const url = `/Companydatum?key=${id}`;
  //     const data = { isdeleted: true };
  //     return this.apiHttpService.patch(url, data);
  //   }
  //   public loginpost(id: number | null, Login: Partial<any>): Observable<any> {
  //     // const url = `/Companydatum?key=${id ? id : ""}`;
  //     // const method = id ? "patch" : "post";
  //     return this.apiHttpService.loginpost(
  //       "https://localhost:44304/WeatherForecast/login",
  //       Login
  //     );
  //   }
}
