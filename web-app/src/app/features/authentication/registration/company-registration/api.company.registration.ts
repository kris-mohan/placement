import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { ODataResponse } from "./company-registration.component";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { CompanyRegistration } from "./company-registration.module";

@Injectable({
  providedIn: "root",
})
export class CompanyRegistrationAPIService {
  constructor(private apiHttpService: ApiHttpService) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  public async getCompanyDetails(): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.apiHttpService
          .get("/Companydatum")
          .pipe(catchError(this.handleError))
      );
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error in GET request: ${error.message}`);
      } else {
        throw error;
      }
    }
  }

  public loadCampusRegistrationData(): Observable<ODataResponse<any>> {
    return this.apiHttpService.get("/Companydatum/?filter=Isdeleted eq false");
  }

  public getCompanyRegistrationDataById(
    id: number
  ): Observable<ODataResponse<any>> {
    return this.apiHttpService.get(`/Login?filter=Id eq ${id}`);
  }

  public deleteCompanyRegistration(id: number): Observable<any> {
    const url = `/Login?key=${id}`;
    const data = { isdeleted: true };
    return this.apiHttpService.patch(url, data);
  }

  public addUpdateCompanyRegistration(
    id: number | null,
    CompanyData: Partial<any>
  ): Observable<any> {
    const url = `/Companydatum?key=${id ? id : ""}`;
    const method = id ? "patch" : "post";
    return this.apiHttpService[method](url, CompanyData);
  }
}
