import { Jobposting } from "./Jobposting";
import { Jobstudentstau } from "./Jobstudentstau";
import { Tblstudent } from "./Tblstudent";

export type JobpostingsEligiblestudent = {
    Id: number;
    StudentId?: number;
    JobPostingId?: number;
    StatusId?: number;
    JobPosting: Jobposting;
    Status: Jobstudentstau;
    Student: Tblstudent;
}