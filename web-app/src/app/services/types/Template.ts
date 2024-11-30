import { TemplateCategory } from "./TemplateCategory";
import { TemplatePlaceholder } from "./TemplatePlaceholder";

export type Template = {
  Id: number;
  CategoryId: number;
  Name: string;
  Subject: string;
  Body: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  Category: TemplateCategory;
  TemplatePlaceholders: TemplatePlaceholder[];
};
