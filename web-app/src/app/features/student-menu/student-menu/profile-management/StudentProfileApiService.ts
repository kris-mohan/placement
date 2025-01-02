import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  catchError,
  firstValueFrom,
  Observable,
  ObservableLike,
  throwError,
} from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
// import { IndentForm } from 'src/app/services/types/IndentForm';
import { ODataEntity } from "src/app/services/types/OData";
import {
  PatchStudentAcademic,
  Studentacademic,
} from "src/app/services/types/Studentacademic";
import { Stream } from "src/app/services/types/Stream";
import { Course } from "src/app/services/types/Course";
import { Batch } from "src/app/services/types/Batch";
import { SkillType } from "src/app/services/types/SkillType";
import { Skill } from "src/app/services/types/Skill";
import {
  PatchTblStudent,
  PostTblstudent,
  Tblstudent,
} from "src/app/services/types/Tblstudent";
import { StudentSkill } from "src/app/services/types/StudentSkill";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class StudentProfileApiService {
  constructor(
    private apiHttpService: ApiHttpService,
    private http: HttpClient
  ) {}
  baseUrl = environment.API_BASE_URL1;

  public GetStudentProfileDataById(
    id: number
  ): Observable<ODataEntity<Studentacademic[]>> {
    return this.apiHttpService.get<ODataEntity<Studentacademic[]>>(
      `/Studentacademic?$expand=Student,Course,Stream&$filter=StudentId eq ${id}`
    );
  }

  public GetCoursesByStreamId(id: number): Observable<ODataEntity<Course[]>> {
    return this.apiHttpService.get<ODataEntity<Course[]>>(
      `/Course?$expand=Stream(filter=Id eq ${id})`
    );
  }

  public GetAllBatches(): Observable<ODataEntity<Batch[]>> {
    return this.apiHttpService.get<ODataEntity<Batch[]>>("/Batch");
  }

  public GetAllStream(): Observable<ODataEntity<Stream[]>> {
    return this.apiHttpService.get<ODataEntity<Stream[]>>("/Stream");
  }

  public GetAllCourse(): Observable<ODataEntity<Course[]>> {
    return this.apiHttpService.get<ODataEntity<Course[]>>("/Course");
  }

  public GetAllSkillTypes(): Observable<ODataEntity<SkillType[]>> {
    return this.apiHttpService.get<ODataEntity<SkillType[]>>("/SkillType");
  }

  public GetAllSkills(id: number): Observable<ODataEntity<Skill[]>> {
    return this.apiHttpService.get<ODataEntity<Skill[]>>(
      `/Skill?$filter=SkillTypeId eq ${id}`
    );
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
    const url = `/Studentacademic${id ? `?key=${id}` : ""}`;
    return id
      ? this.apiHttpService.patch(url, Studentacademic)
      : this.apiHttpService.post(url, Studentacademic);
  }

  public GetStudentDataById = (
    id: number
  ): Observable<ODataEntity<Tblstudent[]>> => {
    return this.apiHttpService.get(
      `/Tblstudent?$expand=Studentacademics&$filter=Id eq ${id}`
    );
  };

  public SaveStudentDetails(
    tab: number | null,
    id: number | null,
    studentDetails: PostTblstudent | PatchTblStudent
  ): Observable<any> {
    console.log("Hiiii");
    return this.apiHttpService.patch(
      `/Tblstudent${id ? `?key=${id}` : ""}`,
      studentDetails
    );

    // const url = `/Companydatum${id ? `?key=${id}` : ""}`;
    // return id
    //   ? this.apiHttpService.patch(url, companydatum)
    //   : this.apiHttpService.post(url, companydatum);
  }

  public GetStudentEducationDetails(
    id: number
  ): Observable<ODataEntity<Studentacademic[]>> {
    return this.apiHttpService.get<ODataEntity<Studentacademic[]>>(
      `/Studentacademic?$expand=StudentSemesterMarks&filter=StudentId eq ${id}`
    );
  }

  public addUpdateStudentEducationDetails(
    id: number | null,
    Studentacademic: PatchStudentAcademic
  ): Observable<any> {
    const url = `/Studentacademic${id ? `?key=${id}` : ""}`;
    return id
      ? this.apiHttpService.patch(url, Studentacademic)
      : this.apiHttpService.post(url, Studentacademic);
  }

  GetStudentSkillsByStudentId(
    studentId: number
  ): Observable<ODataEntity<StudentSkill[]>> {
    return this.apiHttpService.get<ODataEntity<StudentSkill[]>>(
      `/StudentSkill?$filter=StudentId eq ${studentId}&expand=Skill(expand=SkillType)`
    );
  }

  uploadDocument(formData: FormData): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/api/Files/UploadFiles`,
      formData
    );
  }

  saveDocumentDetails(doc: any): Observable<any> {
    return this.apiHttpService.post(`/Document`, doc);
  }

  getDocDetails(
    parentId: number,
    parentType: string
  ): Observable<ODataEntity<any[]>> {
    return this.apiHttpService.get<ODataEntity<any[]>>(
      `/Document?filter=ParentId eq ${parentId} and ParentType eq '${parentType}'`
    );
  }
}
