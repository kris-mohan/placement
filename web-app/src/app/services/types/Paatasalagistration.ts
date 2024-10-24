import { Companydatum } from "./Companydatum";

export type Paatashalaregistration = {
    Id: number;
    CompanyId?: number;
    OrgId?: number;
    Company: Companydatum;
}