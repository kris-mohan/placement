import { Injectable } from "@angular/core";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { ODataResponse } from "./trainers.component";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Trainer } from "src/app/services/types/Trainer";

@Injectable({
  providedIn: "root",
})
export class TrainerAPIService {
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

  GetAllTrainers(): Observable<Trainer[]> {
    return this.apiHttpService.get<Trainer[]>(
      "/Trainer?$filter=Isdeleted eq 0"
    );
  }

  public async getTrainers(): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.apiHttpService
          .get("/Trainer?$filter=Isdeleted eq 0")
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

  public getTrainerDataById(id: number): Observable<any> {
    return this.apiHttpService
      .get(`/Trainer?filter=Id eq ${id}`)
      .pipe(catchError(this.handleError));
  }

  public deleteTrainer(id: number): Observable<any> {
    const url = `/Trainer?key=${id}`;
    const data = { IsDeleted: 1 };
    return this.apiHttpService.patch(url, data);
  }

  public addUpdateTrainer(
    id: number | null,
    trainerData: Partial<Trainer>
  ): Observable<any> {
    const url = `/Trainer?key=${id ? id : ""}`;
    const method = id ? "patch" : "post";
    return this.apiHttpService[method](url, trainerData);
  }
}
