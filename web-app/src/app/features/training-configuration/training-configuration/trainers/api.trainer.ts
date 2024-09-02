import { Injectable } from "@angular/core";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { ODataResponse } from "./trainers.component";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TrainerAPIService {
  constructor(private apiHttpService: ApiHttpService) {}

  public loadTrainerData(): Observable<ODataResponse<any>> {
    return this.apiHttpService.get("/Trainer/?filter=Isdeleted eq false");
  }

  public getTrainerDataById(id: number): Observable<ODataResponse<any>> {
    return this.apiHttpService.get(`/Trainer?filter=Id eq ${id}`);
  }

  public deleteTrainer(id: number): Observable<any> {
    const url = `/Trainer?key=${id}`;
    const data = { isdeleted: true };
    return this.apiHttpService.patch(url, data);
  }

  public addUpdateTrainer(
    id: number | null,
    TrainerData: Partial<any>
  ): Observable<any> {
    const url = `/Trainer?key=${id ? id : ""}`;
    const method = id ? "patch" : "post";
    return this.apiHttpService[method](url, TrainerData);
  }
}
