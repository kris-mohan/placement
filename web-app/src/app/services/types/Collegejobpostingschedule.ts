import { Campusregistration } from "./Campusregistration";
import { Jobposting } from "./Jobposting";

export type Collegejobpostingschedule = {
    Id: number;
    CollegeId?: number;
    JobPostingId?: number;
    ScheduledDate?: Date;
    College: Campusregistration[];
    JobPosting: Jobposting[];
}