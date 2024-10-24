import { Companydatum } from "./Companydatum";
import { Technology } from "./Technology";

export type Companytechnology = {
  Id: number;
  CompanyId?: number;
  TechnologyId?: number;
  IsDeleted: boolean;
  Company: Companydatum[];
  Technology: Technology[];
};
