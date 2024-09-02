import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { ODataResponse } from "./courses.component";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TrainingCourseAPIService {
  constructor(private apiHttpService: ApiHttpService) {}

  public loadTrainingCourseData(): Observable<ODataResponse<any>> {
    return this.apiHttpService.get(
      "/Trainingcourse/?filter=Isdeleted eq false"
    );
  }

  public getTrainingCourseDataById(id: number): Observable<ODataResponse<any>> {
    return this.apiHttpService.get(`/Trainingcourse?filter=Id eq ${id}`);
  }

  public deleteTrainingCourse(id: number): Observable<any> {
    const url = `/Trainingcourse?key=${id}`;
    const data = { isdeleted: true };
    return this.apiHttpService.patch(url, data);
  }

  public addUpdateTrainingCourse(
    id: number | null,
    TrainingcourseData: Partial<any>
  ): Observable<any> {
    const url = `/Trainingcourse?key=${id ? id : ""}`;
    const method = id ? "patch" : "post";
    return this.apiHttpService[method](url, TrainingcourseData);
  }
}
