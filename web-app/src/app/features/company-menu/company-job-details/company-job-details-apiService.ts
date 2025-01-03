import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHttpService } from 'src/app/services/api-services/api-http-services';
import { Jobposting } from 'src/app/services/types/Jobposting';
import { ODataEntity } from 'src/app/services/types/OData';
import { JobpostingWithApplicants } from './company-job-details.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CompanyJobDetailsApiService {
  constructor(
    private apiHttpService: ApiHttpService,
    private http: HttpClient
  ) {}
  

  public GetAllJobPostings(
    id: number
  ): Observable<ODataEntity<JobpostingWithApplicants[]>> {
    return this.apiHttpService.get<ODataEntity<JobpostingWithApplicants[]>>(
      `/Jobposting?$filter=CompanyId eq ${id} and IsDeleted eq 0 &expand=JobpostingsEligiblestudents,JobpostingSkills(expand=Skill(expand=SkillType))`
    );
  }

  public GetJobPostingsDataById(
    id: number
  ): Observable<ODataEntity<Jobposting>> {
    return this.apiHttpService.get(`/Jobposting?filter=Id eq ${id}`);
  }

  public DeleteJobPosting(id: number): Observable<ODataEntity<Jobposting>> {
    const url = `/Jobposting?key=${id}`;
    const data = { isdeleted: true };
    return this.apiHttpService.patch(url, data);
  }

  public AddUpdateJobPosting(
    id: number | null,
    JobPostingData: Partial<ODataEntity<Jobposting>>
  ): Observable<any> {
    const url = `/Jobposting?key=${id ? id : ''}`;
    const method = id ? 'patch' : 'post';
    return this.apiHttpService[method](url, JobPostingData);
  }
  exportJobPostingsToExcel(): Observable<Blob> {
    const url = `https://localhost:44304/api/common/Export-Jobpostings`;
    return this.http.get(url, { responseType: "blob" });
  }

  uploadJobPostingsFile(formData: FormData): Observable<any> {
    return this.http.post<any>(
      `https://localhost:44304/api/common/upload-jobpostings`,
      formData
    );
  }


  // getJobPostingsTemplate(): Observable<any> {
  //   return this.http.get<any>(
  //     `https://localhost:44304/api/common/download-jobpostings-template`
  //   );
  // }

  getJobPostingsTemplate(FilePath: string): void {
    const downloadURL = `https://localhost:44304/api/common/download-jobpostings-template`;
    const link = document.createElement("a");
    link.href = downloadURL;

    const fileName = FilePath.split("/").pop() || "downloaded-file";
    link.download = fileName;

    link.click();
    window.URL.revokeObjectURL(downloadURL);
  }
}
