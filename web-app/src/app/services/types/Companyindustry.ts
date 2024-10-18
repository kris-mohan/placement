import { Industry } from "src/app/features/company-configuration/company-config/companies/companies-model";
import { Companydatum } from "./Companydatum";

export type Companyindustry = {
    Id: number;
    CompanyId?: number;
    IndustryId?: number;
    IsDeleted: boolean;
    Company: Companydatum[];
    Industry: Industry[];
}