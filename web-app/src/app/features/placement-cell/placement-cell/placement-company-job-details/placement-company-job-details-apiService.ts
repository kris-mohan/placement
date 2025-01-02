import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { CampusCompany } from "src/app/services/types/CampusCompany";
import { Companydatum } from "src/app/services/types/Companydatum";
import { ODataEntity } from "src/app/services/types/OData";
import { Template } from "src/app/services/types/Template";
import { TemplateCategory } from "src/app/services/types/TemplateCategory";

@Injectable({
  providedIn: "root",
})
export class PlacementCompanyJobDetailsApiService {
  constructor(
    private apiHttpService: ApiHttpService,
    private http: HttpClient
  ) {}

  GetCompanyById(id: number): Observable<ODataEntity<Companydatum[]>> {
    return this.apiHttpService.get<ODataEntity<Companydatum[]>>(
      `/Companydatum?$expand=Jobpostings($filter = IsDeleted eq 0;$expand=JobpostingsEligiblestudents,JobpostingSkills($expand=Skill($expand=SkillType)))&$filter=id eq ${id} and IsDeleted eq 0`
    );
  }

  GetCampusCompanyById(
    id: number | null
  ): Observable<ODataEntity<CampusCompany[]>> {
    return this.apiHttpService.get<ODataEntity<CampusCompany[]>>(
      `/CampusCompany?filter=CompanyId eq ${id}`
    );
  }

  DeleteCompanyById(id: number): Observable<any> {
    return this.apiHttpService.delete<ODataEntity<any>>(
      `/CampusCompany?key=${id}`
    );
  }
  getTemplates(): Observable<ODataEntity<TemplateCategory[]>> {
    let url = `/TemplateCategory?$filter=contains(Name, 'Invitation')&$expand=Templates`;
    return this.apiHttpService.get<ODataEntity<TemplateCategory[]>>(url);
  }

  sendEmail(email: {
    To: string;
    Cc: string;
    Bcc: string;
    Subject: string;
    Body: string;
  }) {
    return this.apiHttpService.post(`/Email/`, email);
  }
  exportToExcel(companyId: number): Observable<Blob> {
    return this.http.get<Blob>(
      `https://localhost:44304/api/common/ExportCompanyJobposting?CompanyId=${companyId}`,
      {
        responseType: "blob" as "json",
      }
    );
  }
}
