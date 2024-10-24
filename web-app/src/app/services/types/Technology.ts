import { Companytechnology } from "./Companytechnology";
import { Jobposting } from "./Jobposting";

export type Technology = {
    Id: number;
    Name?: string;
    Description?: string;
    IsDeleted: boolean;
    Companytechonologies?: Companytechnology[];
    Jobpostings?: Jobposting[];
    JobpostingsNavigation?: Jobposting[];
};
