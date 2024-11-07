import { Jobposting } from './Jobposting';
import { Tblstudent } from './Tblstudent';

export type JobpostingSelectedstudent = {
  Id: number;
  JobPostingId: number;
  StudentId: number;
  HasAcceptedOffer: number;
  DateOfJoining: Date;
  OfferLetterSentDate: Date;
  OfferLetterExpiryDate: Date;
  JobPosting: Jobposting;
  Student: Tblstudent;
};
