import { JobPostingList } from "src/app/features/company-menu/company-job-details/company-job-details-model";
import { Jobposting } from "./Jobposting";
import { JobpostStudentround } from "./JobpostStudentround";

export type Jobinterviewround = {
  Id: number;
  JobPostingId?: number;
  Name?: string;
  Description?: string;
  Priority?: number;
  EventId: number;
  JobPosting: Jobposting;
  JobpostStudentrounds: JobpostStudentround[];
};

export type PatchJobinterviewround = Jobinterviewround | {};
