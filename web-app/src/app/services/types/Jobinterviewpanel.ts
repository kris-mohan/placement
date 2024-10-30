import { Jobinterviewround } from "./Jobinterviewround";
import { Jobposting } from "./Jobposting";

export type Jobinterviewpanel = {
  Id: number;
  JobPostingId?: number;
  PanelName?: string;
  Description?: string;
  Designation?: string;
  JoInterviewRoundId?: number;
  JobInterviewRound?: Jobinterviewround[];
  JobPosting?: Jobposting;
};
