import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { ODataEntity } from "src/app/services/types/OData";
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
      `/TemplateCategory?$count=true&$orderby=CreatedAt desc&$top=${top}&$skip=${skip}`
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
