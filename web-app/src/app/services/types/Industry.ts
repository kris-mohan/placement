import { Companyindustry } from "./Companyindustry";

export type Industry = {
  Id: number;
  Type?: string;
  Description?: string;
  IsDeleted: boolean;
  Companyindustries: Companyindustry[];
};
