import { Campusregistration } from "./Campusregistration";
import { Jobposting } from "./Jobposting";

export type Collegejobposting = {
    Id : number;
    JobPostingId?: number;
    CollegeId?: number;
    College : Campusregistration;
    JobPosting: Jobposting;
}