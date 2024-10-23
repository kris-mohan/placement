import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Jobposting } from "src/app/services/types/Jobposting";

@Injectable({
  providedIn: "root",
})
export class StudentJobsApiSerivce {
  constructor(private apiHttpService: ApiHttpService) {}

  GetAllJobPosting(): Observable<Jobposting> {
    return this.apiHttpService.get<Jobposting>("/Jobposting");
  }

  //   private handleError(error: HttpErrorResponse) {
  //     let errorMessage = "";
  //     if (error.error instanceof ErrorEvent) {
  //       errorMessage = `Client-side error: ${error.error.message}`;
  //     } else {
  //       errorMessage = `Server-side error: ${error.status} - ${error.message}`;
  //     }
  //     console.error(errorMessage);
  //     return throwError(() => new Error(errorMessage));
  //   }

  //   public async GetAllJobPosting(): Promise<any> {
  //     try {
  //       const response = await firstValueFrom(
  //         this.apiHttpService
  //           .get("/Jobposting?$filter=Isdeleted eq 0")
  //           .pipe(catchError(this.handleError))
  //       );
  //       return response;
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         throw new Error(`Error in GET request: ${error.message}`);
  //       } else {
  //         throw error;
  //       }
  //     }
  //}
}
