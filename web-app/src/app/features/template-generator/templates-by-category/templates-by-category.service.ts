import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { ODataEntity } from "src/app/services/types/OData";
import { Template } from "src/app/services/types/Template";
import { TemplateCategory } from "src/app/services/types/TemplateCategory";

@Injectable({
  providedIn: "root",
})
export class TemplatesByCategoryService {
  constructor(private apiHttpService: ApiHttpService) {}

  getTemplateCategoryDetails(Id: number) {
    return this.apiHttpService.get<ODataEntity<TemplateCategory[]>>(
      `/TemplateCategory?$filter=Id eq ${Id}`
    );
  }

  getTemplates(
    templateCategoryId: number,
    index: number,
    size: number,
    searchQuery: string = ""
  ): Observable<ODataEntity<Template[]>> {
    const skip = index * size;
    const top = size;
    let url = `/Template?$expand=Category&$count=true&$top=${top}&$skip=${skip}`;
    if (templateCategoryId || searchQuery) {
      url += `&filter=`;
      if (searchQuery) {
        url += `(contains(Name, '${searchQuery}') or contains(Subject, '${searchQuery}'))`;
      }
      if (searchQuery && templateCategoryId) {
        url += ` and `;
      }
      if (templateCategoryId) {
        url += `CategoryId eq ${templateCategoryId}`;
      }
    }
    return this.apiHttpService.get<ODataEntity<Template[]>>(url);
  }

  createTemplate(templateData: any) {
    return this.apiHttpService.post("/Template", templateData);
  }

  updateTemplate(Id: number, body: any) {
    return this.apiHttpService.patch("/Template?key=" + Id, body);
  }

  getSearchedTemplates(searchQuery: string = "") {
    return this.apiHttpService.get<ODataEntity<Template[]>>(
      `/Template?$filter=contains(Name,'${searchQuery}') or contains(Subject, '${searchQuery}')`
    );
  }

  deleteTemplateById(Id: number) {
    return this.apiHttpService.delete("/Template?key=" + Id);
  }
}
