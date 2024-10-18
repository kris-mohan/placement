import { Companydesignation } from "./Companydesignation";
import { Companyindustry } from "./Companyindustry";
import { Companytechonology } from "./Companytechonology";
import { Jobposting } from "./Jobposting";
import { Login } from "./Login";
import { Paatashalaregistration } from "./Paatasalagistration";

export type Companydatum = {
    Id: number;
    Url?: string;
    Name?: string;
    Address?: string;
    PhoneNumber?: string;
    Gstnumber?: string;
    ContactPerson?: string;
    AddressLine1?: string;
    City?: string;
    State?: string;
    ZipCode?: string;
    Country?: string;
    ParentCompanyId?: number;
    IsDeleted: boolean;
    Companydesignations : Companydesignation[];
    Companytechnologies : Companytechonology[];
    Companyindustires: Companyindustry[];
    Jobpostings: Jobposting[];
    Logins: Login[];
    Paatashalaregistrations: Paatashalaregistration[];
}