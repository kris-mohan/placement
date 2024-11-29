import { Template } from "./Template";

export type TemplateCategory = {
  Id: number;
  Name: string;
  Description: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  Templates: Template[];
};
