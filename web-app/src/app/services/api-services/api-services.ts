import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ODataResponse } from "src/app/features/company-configuration/company-config/companies/companies.component";
import { employeeDataList } from "src/app/features/placement-cell/placement-cell/eligible-students-list/eligible-students-list-model";
import { companyTableList } from "src/app/features/company-configuration/company-config/companies/companies-model";

@Injectable({
  providedIn: "root",
})
export class APIService {
  private baseUrl = "http://20.219.120.124:92/odata";
  constructor(private http: HttpClient) {}

  getCompanyList(): Observable<ODataResponse<companyTableList>> {
    return this.http.get<ODataResponse<companyTableList>>(
      `${this.baseUrl}/Companydetail`
    );
  }

  addOrUpdateCompany(
    id: number | null,
    company: Partial<companyTableList>
  ): Observable<void> {
    if (id) {
      return this.http.patch<void>(
        `${this.baseUrl}/Companydetail?id=${id}`,
        company
      );
    } else {
      return this.http.post<void>(`${this.baseUrl}/Companydetail`, company);
    }
  }

  getCompanyById(id: number): Observable<ODataResponse<companyTableList>> {
    const filterQuery = `${this.baseUrl}/Companydetail?$filter=CompanyId eq ${id}`;
    return this.http.get<ODataResponse<companyTableList>>(filterQuery);
  }

  getEmployeeDetailsByCompanyId(
    id: number
  ): Observable<ODataResponse<{ Employeedetails: employeeDataList[] }>> {
    const filterQuery = `${this.baseUrl}/Companydetail?$filter=CompanyId eq ${id}&$expand=EmployeeDEtails&$select=EmployeeDEtails`;
    return this.http.get<
      ODataResponse<{ Employeedetails: employeeDataList[] }>
    >(filterQuery);
  }

  getSinglePdf(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/Companydetail/singlePdf`, {
      responseType: "blob",
    });
  }

  getPdf(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/Companydetail/singlePdf`, {
      responseType: "blob",
    });
  }
}
