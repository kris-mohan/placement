export type companyTableList = {
  Id: number;
  Name: string;
  Address: string;
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
