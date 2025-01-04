import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Companydatum } from "src/app/services/types/Companydatum";
import { ODataEntity } from "src/app/services/types/OData";
import { Studentacademic } from "src/app/services/types/Studentacademic";
import { StudentSkill } from "src/app/services/types/StudentSkill";
import { Tblstudent } from "src/app/services/types/Tblstudent";
import { Documents } from "src/app/services/types/Documents";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class StudentDetailsDialogApiService {
  constructor(
    private apiHttpService: ApiHttpService,
    private http: HttpClient
  ) {}

  baseUrl = environment.API_BASE_URL1;

  GetStudentDetails(): Observable<ODataEntity<Tblstudent[]>> {
    return this.apiHttpService.get<ODataEntity<Tblstudent[]>>("/Tblstudent");
  }

  GetStudentDetailsById(id: number): Observable<ODataEntity<Tblstudent[]>> {
    return this.apiHttpService.get<ODataEntity<Tblstudent[]>>(
      `/Tblstudent?$filter=id eq ${id} &expand=Studentacademics(expand=Course,Stream,StudentSemesterMarks),Batch`
    );
  }

  GetStudentSkillsByStudentId(
    studentId: number
  ): Observable<ODataEntity<StudentSkill[]>> {
    return this.apiHttpService.get<ODataEntity<StudentSkill[]>>(
      `/StudentSkill?$filter=StudentId eq ${studentId}&expand=Skill(expand=SkillType)`
    );
  }
  GetCompanyDetails(
    studentId: number
  ): Observable<ODataEntity<Companydatum[]>> {
    return this.apiHttpService.get<ODataEntity<Companydatum[]>>(
      `/JobpostingsEligiblestudent?$filter=StudentId eq ${studentId} & expand=JobPosting(expand=Company),Status`
    );
  }
  GetSemesterData(id: number): Observable<ODataEntity<Studentacademic[]>> {
    return this.apiHttpService.get<ODataEntity<Studentacademic[]>>(
      `/Studentacademic?$filter=StudentId eq ${id} & expand =StudentSemesterMarks`
    );
  }

  GetDocumentsFilePath(
    parentType: string,
    parentId: number
  ): Observable<ODataEntity<Documents[]>> {
    return this.apiHttpService.get<ODataEntity<Documents[]>>(
      `/Document?$filter=ParentType eq '${parentType}' and ParentId eq ${parentId}`
    );
  }

  openDocuments(FilePath: string): Observable<Blob> {
    // return this.apiHttpService.downloadFile<ODataEntity<Blob>>(`/Document`);
    const fileURL = `${this.baseUrl}/api/Files/DownloadFile?filePath=${FilePath}`;
    // Use window.open() to open the file in a new tab
    // window.open(fileURL, "_blank");
    return this.http.get(fileURL, { responseType: "blob" });
  }
}
