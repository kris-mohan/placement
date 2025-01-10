import { Injectable } from '@angular/core';
import { ApiHttpService } from 'src/app/services/api-services/api-http-services';
import { ODataResponse } from './schedules.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainerScheduleAPIService {
  constructor(private apiHttpService: ApiHttpService) {}

  public loadTrainerScheduleData(): Observable<ODataResponse<any>> {
    return this.apiHttpService.get('/Trainerschedule/?filter=Isdeleted eq 0');
  }

  public loadAllBatches(): Observable<ODataResponse<any>> {
    return this.apiHttpService.get('/Batch');
  }

  public loadAllCourses(): Observable<ODataResponse<any>> {
    return this.apiHttpService.get('/Course');
  }

  public loadAllStudentsData(): Observable<ODataResponse<any>> {
    return this.apiHttpService.get(
      '/Tblstudent?$expand=Batch($select=Name),Studentacademics($expand=Course)'
    );
  }

  public loadAllTrainingCourses(): Observable<ODataResponse<any>> {
    return this.apiHttpService.get(`/Trainingcourse`);
  }

  public loadAllTrainersData(): Observable<ODataResponse<any>> {
    return this.apiHttpService.get('/Trainer');
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
    const url = `/Trainerschedule?key=${id ? id : ''}`;
    const method = id ? 'patch' : 'post';
    return this.apiHttpService[method](url, TrainerScheduleData);
  }
}
