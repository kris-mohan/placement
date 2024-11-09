import { JobpostingsEligiblestudent } from "./JobpostingsEligibleStudent";

export type Jobstudentstatus = {
  Id: number;
  Name?: string;
  JobpostingsEligiblestudents?: JobpostingsEligiblestudent[];
};

export type PostJobstudentstatus = {
  JobpostingsEligiblestudents?: {
    StudentId?: number;
    JobPostingId?: number;
    StatusId?: number;
  }[];
};
