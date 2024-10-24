import { Jobposting } from "./Jobposting";
import { Tblstudent } from "./Tblstudent";

export type JobpostingSelectedstudent = {
    Id: number;
    JobPostingId?: number;
    StudentId?: number;
    HasAcceptedOffer?: boolean;
    JobPosting: Jobposting;
    Student: Tblstudent;
}