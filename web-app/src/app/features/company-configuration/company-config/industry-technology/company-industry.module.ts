export type CompanyIndustry = {
  Id: number;
  CompanyId: number;
  IndustryId: string;
};

// export type companyIndustries = {
//   Id: number;
//   CompanyIndustries: CompanyIndustry[];
// };

export interface CompanyIndustryUI {
  Id: number;
  CompanyName: string;
  IndustryType: string;
}
