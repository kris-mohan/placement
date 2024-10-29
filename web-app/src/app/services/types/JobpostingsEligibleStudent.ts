import { Jobposting } from "./Jobposting";
import { Jobstudentstatus } from "./Jobstudentstatus";
import { Tblstudent } from "./Tblstudent";

export type JobpostingsEligiblestudent = {
  Id: number;
  StudentId?: number;
  JobPostingId?: number;
  StatusId?: number;
  JobPosting: Jobposting;
  Status?: Jobstudentstatus;
  Student?: Tblstudent;
};
