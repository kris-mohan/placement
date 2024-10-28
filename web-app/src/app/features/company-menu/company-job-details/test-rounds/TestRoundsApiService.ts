import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Jobinterviewround } from "src/app/services/types/Jobinterviewround";

@Injectable({
  providedIn: "root",
})
export class TestRoundsApiService {
  constructor(private apiHttpService: ApiHttpService) {}
 
  GetAllRounds(): Observable<any> {
    return this.apiHttpService.get<any>("/Jobinterviewround");
  }

  GetRoundsById(id: number): Observable<any> {
    return this.apiHttpService.get(`/Jobinterviewround?filter=Id eq ${id}`);
  }
  CreateRound(data: any): Observable<any> {
    return this.apiHttpService.post("/Jobinterviewround", data);
  }

  deleteRound(id: number): Observable<any> {
    const url = `/Jobinterviewround?key=${id}`;
    const data = { isdeleted: true };
    return this.apiHttpService.delete(url);
  }

  addUpdateRounds(
    id: number | null,
    TrainingcourseData: Partial<any>
  ): Observable<any> {
    const url = `/Trainingcourse?key=${id ? id : ""}`;
    const method = id ? "patch" : "post";
    return this.apiHttpService[method](url, TrainingcourseData);
  }
}
