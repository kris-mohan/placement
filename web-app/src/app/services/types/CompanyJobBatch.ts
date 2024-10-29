import { Batch } from "./Batch";
import { Jobposting } from "./Jobposting";

export type CompanyJobBatch = {
  Id: number;
  JobPostingId?: number;
  BatchId?: number;
  Batch?: Batch;
  JobPosting?: Jobposting;
};
