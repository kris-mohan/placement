import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { IndentForm } from "src/app/services/types/IndentForm";
import { ODataEntity } from "src/app/services/types/OData";

@Injectable({
  providedIn: "root",
})
export class IndentRequirementsApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  GetAllIndents(): Observable<any> {
    return this.apiHttpService.get<any>("/IndentForm");
  }

  GetAllIndentsDynamicField(): Observable<any> {
    return this.apiHttpService.get<any>("/IndentFormDynamicField");
  }

  public GetAllIndentsDynamicFieldById(
    id: number
  ): Observable<ODataEntity<IndentForm[]>> {
    return this.apiHttpService.get<ODataEntity<IndentForm[]>>(
      `/IndentFormDynamicField?filter=Id eq ${id}`
    );
  }

  public GetAllIndentsById(id: number): Observable<ODataEntity<IndentForm[]>> {
    return this.apiHttpService.get<ODataEntity<IndentForm[]>>(
      `/IndentForm?filter=Id eq ${id}&$expand=IndentFormDynamicFields`
    );
  }

  public deleteCompany(id: number): Observable<ODataEntity<IndentForm[]>> {
    const url = `/Companydatum?key=${id}`;
    const data = { isdeleted: true };
    return this.apiHttpService.patch(url, data);
  }

  public addUpdateCompany(
    id: number | null,
    IndentForm: IndentForm
  ): Observable<ODataEntity<IndentForm[]>> {
    const url = `/Companydatum${id ? `?key=${id}` : ""}`;
    return id
      ? this.apiHttpService.patch(url, IndentForm)
      : this.apiHttpService.post(url, IndentForm);
  }
  CreateIndent(data: any): Observable<any> {
    return this.apiHttpService.post("/IndentForm", data);
  }

  CreateUpdateIndent(id: number | null, data: any): Observable<any> {
    const url = `/IndentForm${id ? `?key=${id}` : ""}`;
    return id
      ? this.apiHttpService.patch(url, data)
      : this.apiHttpService.post(url, data);
  }
}
