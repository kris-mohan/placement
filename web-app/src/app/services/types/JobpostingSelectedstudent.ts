import { Jobposting } from "./Jobposting";
import { StudentSkill } from "./StudentSkill";
import { Tblstudent } from "./Tblstudent";

export type JobpostingSelectedstudent = {
  industriesWithCompanyId: any;
  Id: number;
  JobPostingId: number;
  StudentId: number;
  HasAcceptedOffer: number;
  DateOfJoining: Date;
  OfferLetterSentDate: Date;
  OfferLetterExpiryDate: Date;
  JobPosting: Jobposting;
  Student: Tblstudent;
  StudentSkills: StudentSkill[];
};
