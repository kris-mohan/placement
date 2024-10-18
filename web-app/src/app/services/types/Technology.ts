import { Companytechonology } from "./Companytechonology";
import { Jobposting } from "./Jobposting";

export type Technology = {
    Id: number;
    Name?: string;
    Description?: string;
    IsDeleted: boolean;
    Companytechonologies?: Companytechonology[];
    Jobpostings?: Jobposting[];
    JobpostingsNavigation?: Jobposting[];
};
