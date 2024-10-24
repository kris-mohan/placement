import { Jobposting } from "./Jobposting";
import { JobpostStudentround } from "./JobpostStudentround";

export type Jobinterviewround = {
    Id: number;
    JobPostingId?: number;
    Name?: string;
    Description?: string;
    Priority?: number;
    JobPosting: Jobposting;
    JobpostStudentrounds: JobpostStudentround[];
}