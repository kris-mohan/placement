import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, Observable, throwError } from 'rxjs';
import { ApiHttpService } from 'src/app/services/api-services/api-http-services';
// import { IndentForm } from 'src/app/services/types/IndentForm';
import { ODataEntity } from 'src/app/services/types/OData';
import { Studentacademic } from 'src/app/services/types/Studentacademic';
import { Stream } from 'src/app/services/types/Stream';
import { Course } from 'src/app/services/types/Course';
import { Batch } from 'src/app/services/types/Batch';

@Injectable({
  providedIn: 'root',
})
export class StudentProfileApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  public GetStudentProfileDataById(
    id: number
  ): Observable<ODataEntity<Studentacademic[]>> {
    return this.apiHttpService.get<ODataEntity<Studentacademic[]>>(
      `/Studentacademic?$expand=Student,Course,Stream&$filter=id eq ${id}`
    );
  }
  public GetAllBatches(): Observable<ODataEntity<Batch[]>> {
    return this.apiHttpService.get<ODataEntity<Batch[]>>('/Batch');
  }

  public GetAllStream(): Observable<ODataEntity<Stream[]>> {
    return this.apiHttpService.get<ODataEntity<Stream[]>>('/Stream');
  }

  public GetAllCourse(): Observable<ODataEntity<Course[]>> {
    return this.apiHttpService.get<ODataEntity<Course[]>>('/Course');
  }
  public deleteStudentProfileData(
    id: number
  ): Observable<ODataEntity<Studentacademic[]>> {
    const url = `/Studentacademic?key=${id}`;
    const data = { isdeleted: true };
    return this.apiHttpService.patch(url, data);
  }

  public addUpdateCompany(
    id: number | null,
    Studentacademic: Studentacademic
  ): Observable<ODataEntity<Studentacademic[]>> {
    const url = `/Studentacademic${id ? `?key=${id}` : ''}`;
    return id
      ? this.apiHttpService.patch(url, Studentacademic)
      : this.apiHttpService.post(url, Studentacademic);
  }
}
