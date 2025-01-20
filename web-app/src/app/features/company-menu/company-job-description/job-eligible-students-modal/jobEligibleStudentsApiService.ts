import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Jobposting } from "src/app/services/types/Jobposting";
import { ODataEntity } from "src/app/services/types/OData";
import { Tblstudent } from "src/app/services/types/Tblstudent";
import {
  JobpostingsEligiblestudent,
  PostJobpostingsEligiblestudent,
} from "src/app/services/types/JobpostingsEligibleStudent";

@Injectable({
  providedIn: "root",
})
export class JobEligibleStudentApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  GetAllStudents(): Observable<any> {
    return this.apiHttpService.get<any>("/Tblstudent");
  }

  GetAllStudentsById(id: number): Observable<any> {
    return this.apiHttpService.get(`/Tblstudent?filter=Id eq ${id}`);
  }

  GetAllInvitingStudents(query: string): Observable<ODataEntity<Tblstudent[]>> {
    return this.apiHttpService.get<ODataEntity<Tblstudent[]>>(query);
  }

  public GetJobPostingDetailsById(
    companyId: number,
    jobPostingId: number
  ): Observable<ODataEntity<Jobposting[]>> {
    return this.apiHttpService.get<ODataEntity<Jobposting[]>>(
      `/Jobposting?filter=CompanyId eq ${companyId} and Id eq ${jobPostingId} &$expand=CompanyJobBatches,CompanyJobCourses,CompanyJobStreams`
    );
  }

  InviteJobPostToStudents(
    students: PostJobpostingsEligiblestudent[]
  ): Observable<any> {
    const requests: any[] = [];
    students.map((stud, index) => {
      requests.push({
        id: `${index + 1}`,
        method: "POST",
        url: "/odata/JobpostingsEligiblestudent",
        body: stud,
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
    return this.apiHttpService.post("/$batch", { requests });
  }

  GetStudentJobPostStatus(
    studentIds: number[]
  ): Observable<ODataEntity<JobpostingsEligiblestudent[]>> {
    const filterQuery = studentIds
      .map((id) => `StudentId eq ${id}`)
      .join(" or ");
    const url = `/JobpostingsEligiblestudent?$filter=${filterQuery}&$expand=Status`;

    return this.apiHttpService.get<ODataEntity<JobpostingsEligiblestudent[]>>(
      url
    );
  }

  GetAllJobPostToStudentToApply(
    studentId: number,
    companyId: number
  ): Observable<ODataEntity<JobpostingsEligiblestudent[]>> {
    return this.apiHttpService.get<ODataEntity<JobpostingsEligiblestudent[]>>(
      `/JobpostingsEligiblestudent?filter = StudentId eq ${studentId} and JobPostingId eq ${companyId} &  $expand=Status`
    );
  }

  ApplyJobPostByStudent(id: number, statusId: number): Observable<any> {
    return this.apiHttpService.patch(`/JobpostingsEligiblestudent?key=${id}`, {
      StatusId: statusId,
    });
  }

  GetstudentStatusOfInvitedJobPost(
    jobPostId: number,
    statusId: number
  ): Observable<ODataEntity<JobpostingsEligiblestudent[]>> {
    return this.apiHttpService.get<ODataEntity<JobpostingsEligiblestudent[]>>(
      `/JobpostingsEligiblestudent?$filter=JobPostingId eq ${jobPostId} and StatusId eq ${statusId} & expand = Student(expand=Batch,Studentacademics(expand=Course,Stream),Org),Status,JobPosting(expand=Company)`
    );
  }
  GetBatches(): Observable<any> {
    return this.apiHttpService.get(`/Batch`);
  }
  GetBranches(): Observable<any> {
    return this.apiHttpService.get(`/Course`);
  }
  deleteJobPosting(id: number): Observable<any> {
    const url = `/JobPosting?key=${id}`;
    const data = { IsDeleted: 1 };
    return this.apiHttpService.patch(url, data);
  }
}
