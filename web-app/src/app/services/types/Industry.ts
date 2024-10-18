import { Companyindustry } from "./Companyindustry";

export type industry = {
    Id: number;
    Type?: string;
    Description?: string;
    IsDeleted: boolean;
    Companyindustries: Companyindustry[];
}