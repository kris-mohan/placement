export type CompanyIndustry = {
  Id: number;
  CompanyId: number;
  IndustryId: string;
};

export type companyIndustries = {
  Id: number;
  CompanyIndustries: CompanyIndustry[];
};

export type CompanyIndustryUI = {
  Id: number;
  CompanyName: string;
  IndustryTypes: [];
  Industries: string;
};
