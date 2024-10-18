import { Companydatum } from "./Companydatum";
import { Technology } from "./Technology";

export type Companytechonology = {
    Id: number;
    CompanyId?: number;
    TechnologyId?: number;
    IsDeleted: boolean;
    Company: Companydatum[];
    Technology: Technology[];
}