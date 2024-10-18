import { Companydatum } from "./Companydatum";

export type Companydesignation = {
    Id: number;
    CompanyId?: number;
    Name?: string;
    Company: Companydatum[];
}