import { Campusregistration } from "./Campusregistration";
import { Companydatum } from "./Companydatum";

export type CampusCompany = {
  Id: number;
  CampusId?: number;
  CompanyId?: number;
  Campus: Campusregistration;
  Company: Companydatum;
};
