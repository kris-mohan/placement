import { Injectable } from '@angular/core';
import { ApiHttpService } from 'src/app/services/api-services/api-http-services';
import { Observable } from 'rxjs';
import { ODataResponse } from './student-training-feedback.component';

@Injectable({
  providedIn: 'root',
})
export class StudentFeedbackApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  public loadFeedbackQuestions(): Observable<ODataResponse<any>> {
    return this.apiHttpService.get(
      `/Trainingfeedbackques?&filter=IsDeleted eq false`
    );
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
