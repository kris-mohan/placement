import { Jobposting } from "./Jobposting";
import { Stream } from "./Stream";

export type CompanyJobStream = {
  Id: number;
  JobPostingId?: number;
  StreamId?: number;
  Stream?: Stream;
  JobPosting?: Jobposting;
};
