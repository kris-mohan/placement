import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { ODataEntity } from "src/app/services/types/OData";
import { Template } from "src/app/services/types/Template";
import { TemplateCategory } from "src/app/services/types/TemplateCategory";

@Injectable({
  providedIn: "root",
})
export class TemplateGeneratorService {
  constructor(private apiHttpService: ApiHttpService) {}

  getTemplateCategories(
    index: number,
    size: number
  ): Observable<ODataEntity<TemplateCategory[]>> {
    const skip = index * size;
    const top = size;
    return this.apiHttpService.get<ODataEntity<TemplateCategory[]>>(
      `/TemplateCategory?$count=true&$top=${top}&$skip=${skip}`
    );
  }

  getTemplates(
    index: number,
    size: number
  ): Observable<ODataEntity<Template[]>> {
    const skip = index * size;
    const top = size;
    return this.apiHttpService.get<ODataEntity<Template[]>>(
      `/Template?$expand=Category&$count=true&$top=${top}&$skip=${skip}`
    );
  }

  createTemplateCategory(categoryName: string, description: string) {
    return this.apiHttpService.post<ODataEntity<TemplateCategory>>(
      `/TemplateCategory`,
      {
        Name: categoryName,
        Description: description,
      }
    );
  }

  updateTemplateCategory(
    Id: number,
    categoryName: string,
    description: string
  ) {
    return this.apiHttpService.patch<ODataEntity<TemplateCategory>>(
      `/TemplateCategory?key=${Id}`,
      {
        Id: Id,
        Name: categoryName,
        Description: description,
      }
    );
  }

  deleteTemplateCategory(Id: number) {
    return this.apiHttpService.delete<ODataEntity<TemplateCategory>>(
      `/TemplateCategory?key=${Id}`
    );
  }

  getSearchedTemplateCategories(searchQuery: string = "") {
    return this.apiHttpService.get<ODataEntity<TemplateCategory[]>>(
      `/TemplateCategory?$filter=contains(Name,'${searchQuery}') or contains(Description, '${searchQuery}')`
    );
  }

  createTemplate(templateData: {
    categoryId: number;
    subject: string;
    content: string;
  }) {
    return this.apiHttpService.post("/Templates", templateData);
  }
}
