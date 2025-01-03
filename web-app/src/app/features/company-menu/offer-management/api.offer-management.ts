import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Campusregistration } from "src/app/services/types/Campusregistration";
import { JobpostingSelectedstudent } from "src/app/services/types/JobpostingSelectedstudent";
import { Jobstudentstatus } from "src/app/services/types/Jobstudentstatus";
import { ODataEntity } from "src/app/services/types/OData";
import { Technology } from "src/app/services/types/Technology";
import { TemplateCategory } from "src/app/services/types/TemplateCategory";
import { University } from "src/app/services/types/University";

@Injectable({
  providedIn: "root",
})
export class OfferManagementApiService {
  constructor(
    private apiHttpService: ApiHttpService,
    private http: HttpClient
  ) {}

  GetAllOffers(
    id: number,
    options?: any
  ): Observable<ODataEntity<JobpostingSelectedstudent[]>> {
    let query = `/JobpostingSelectedstudent?$select=Id,JobPostingId,StudentId,HasAcceptedOffer,OfferLetterSentDate,OfferLetterExpiryDate&$expand=JobPosting($select=Id,CompanyId,JobRole),Student($select=Id,FirstName,LastName,Email;$expand=Batch($select=Name)&$expand=Org($select=Email))&$apply=filter(JobPosting/CompanyId eq ${id})`;
    if (options.Status) {
      query += `&Status eq ${options.Status}`;
    }
    return this.apiHttpService.get<ODataEntity<JobpostingSelectedstudent[]>>(
      query
    );
  }

  GetStudent(): Observable<ODataEntity<JobpostingSelectedstudent[]>> {
    return this.apiHttpService.get<ODataEntity<JobpostingSelectedstudent[]>>(
      `/JobpostingSelectedstudent?$filter=HasAcceptedOffer eq 0&$expand=Student($select=Id,FirstName,LastName,Email;$expand=Batch($select=Name)&$expand=Org($select=Email)),JobPosting($select=Id,JobRole,JobDescription)`
    );
  }
  SendOfferLetter(email: {
    To: string;
    Cc: string;
    Bcc: string;
    Subject: string;
    Body: string;
  }) {
    return this.apiHttpService.post(`/Email/`, email);
  }
  GetAllUniversities(): Observable<ODataEntity<University[]>> {
    return this.apiHttpService.get<ODataEntity<University[]>>("/University");
  }

  GetAllColleges(): Observable<ODataEntity<Campusregistration[]>> {
    return this.apiHttpService.get<ODataEntity<Campusregistration[]>>(
      "/Campusregistration"
    );
  }

  GetAllStatuses(): Observable<ODataEntity<Jobstudentstatus[]>> {
    return this.apiHttpService.get<ODataEntity<Jobstudentstatus[]>>(
      "/Jobstudentstatus"
    );
  }

  GetAllTechnologies(): Observable<ODataEntity<Technology[]>> {
    return this.apiHttpService.get<ODataEntity<Technology[]>>("/Technology");
  }
  GetAllTemplateCategories(): Observable<ODataEntity<TemplateCategory[]>> {
    return this.apiHttpService.get<ODataEntity<TemplateCategory[]>>(
      `/TemplateCategory?$filter=contains(Name, 'Offer')&$expand=Templates`
    );
  }
  sendStudentData(studentId: number, jobPostingId: number) {
    const url = `/JobpostingSelectedstudent?$filter=StudentId eq ${studentId} and JobPostingId eq ${jobPostingId}&$expand=Student($select=Id,FirstName,LastName,Email;$expand=Batch($select=Name)&$expand=Org($select=Email)),JobPosting($select=Id,JobRole,JobDescription)`;
    return this.apiHttpService.patch(url, {});
  }
  UpdateOffer(id: number, updateData: { OfferLetterSentDate: Date }) {
    const url = `/JobpostingSelectedstudent?key=${id}`;
    return this.apiHttpService.patch(url, updateData);
  }
  exportOffers(companyId: number): Observable<Blob> {
    const url = `https://localhost:44304/api/common/ExportOffers?companyId=${companyId}`;
    return this.http.get(url, { responseType: "blob" });
  }
}
