import { Companydatum } from "src/app/services/types/Companydatum";

export type companyTableList = {
  Id: number;
  Name: string;
  Address: string;
  Email: string;
  Password: string;
  Url: string;
  PhoneNumber: string;
  Gstnumber: string;
  ContactPerson: string;
  AddressLine1: string;
  City: string;
  State: string;
  ZipCode: string;
  Country: string;
  ParentCompanyId: number;
  Isdeleted: boolean;
  Companyindustries: CompanyIndustry[];
  CompanySize: number;
  About: string;
  HeadQuarters: string;
  VideoPath: string;
  PresentationPath: string;
  DocumentPath: string;
  AudioPath: string;
};
export type CompanyIndustry = {
  Id: number;
  CompanyId?: number;
  IndustryId?: number;
  IsDeleted: boolean;
  Industry: Industry;
};

export type Industry = {
  Id: number;
  Type: string;
  Description?: string;
  IsDeleted: boolean;
};
