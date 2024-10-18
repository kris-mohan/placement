import { Jobposting } from "./Jobposting";
import { Tblstudent } from "./Tblstudent";

export type JobpostingsEligiblestudent = {
    Id: number;
    StudentId?: number;
    JobPostingId?: number;
    JobPosting: Jobposting[];
    Student: Tblstudent[];
}