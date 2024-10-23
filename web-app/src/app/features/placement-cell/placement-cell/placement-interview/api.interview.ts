import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Jobinterviewround } from "src/app/services/types/Jobinterviewround";

@Injectable({
  providedIn: "root",
})
export class interviewApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  // public async GetAllRounds(): Promise<any> {
  //   try {
  //     const response = await firstValueFrom(
  //       this.apiService
  //         .get("/Jobinterviewround")
  //         .pipe(catchError(this.handleError))
  //     );
  //     return response;
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       throw new Error(`Error in GET request: ${error.message}`);
  //     } else {
  //       throw error;
  //     }
  //   }
  //   // return this.apiService.get<Jobinterviewround[]>("/Jobinterviewround");
  // }
  Getinterview(): Observable<any> {
    return this.apiHttpService.get<any>("/Jobinterviewround");
  }

  //   GetRoundsById(id: number): Observable<any> {
  //     return this.apiHttpService.get(`/Jobinterviewround?filter=Id eq ${id}`);
  //   }

  //   deleteRound(id: number): Observable<any> {
  //     const url = `/Trainingcourse?key=${id}`;
  //     const data = { isdeleted: true };
  //     return this.apiHttpService.patch(url, data);
  //   }

  //   addUpdateRounds(
  //     id: number | null,
  //     TrainingcourseData: Partial<any>
  //   ): Observable<any> {
  //     const url = `/Trainingcourse?key=${id ? id : ""}`;
  //     const method = id ? "patch" : "post";
  //     return this.apiHttpService[method](url, TrainingcourseData);
  //   }
}
