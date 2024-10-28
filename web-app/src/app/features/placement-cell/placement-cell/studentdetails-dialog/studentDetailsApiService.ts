import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, Observable, throwError } from 'rxjs';
import { ApiHttpService } from 'src/app/services/api-services/api-http-services';

@Injectable({
  providedIn: 'root',
})
export class StudentDetailsDialogApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  GetStudentDetails(): Observable<any> {
    return this.apiHttpService.get<any>('/Tblstudent');
  }

  GetStudentDetailsById(id: number): Observable<any> {
    return this.apiHttpService.get(
      `/Tblstudent?$filter=id eq ${id} &expand=StudentSkills(expand=SkillType),Studentacademics(expand=Course,Stream)`
    );
  }
}
