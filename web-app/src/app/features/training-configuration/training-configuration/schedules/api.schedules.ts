import { Injectable } from "@angular/core";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { ODataResponse } from "./schedules.component";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TrainerScheduleAPIService {
  constructor(private apiHttpService: ApiHttpService) {}

  public loadTrainerScheduleData(): Observable<ODataResponse<any>> {
    return this.apiHttpService.get(
      "/Trainerschedule/?filter=Isdeleted eq false"
    );
  }

  public getTrainerScheduleDataById(
    id: number
  ): Observable<ODataResponse<any>> {
    return this.apiHttpService.get(`/Trainerschedule?filter=Id eq ${id}`);
  }

  public deleteTrainerSchedule(id: number): Observable<any> {
    const url = `/Trainerschedule?key=${id}`;
    const data = { isdeleted: true };
    return this.apiHttpService.patch(url, data);
  }

  public addUpdateTrainerSchedule(
    id: number | null,
    TrainerScheduleData: Partial<any>
  ): Observable<any> {
    const url = `/Trainerschedule?key=${id ? id : ""}`;
    const method = id ? "patch" : "post";
    return this.apiHttpService[method](url, TrainerScheduleData);
  }
}
