import { Jobinterviewround } from "./Jobinterviewround";
import { Tblstudent } from "./Tblstudent";

export type JobpostStudentround = {
    Id: number;
    StudentId?: number;
    JobPostingRoundId?: number;
    Feedback?: string;
    HasPassed?: boolean;
    Score?: number;
    RoundDate?: Date;
    Col?: string;
    JobPostingRound: Jobinterviewround;
    Student: Tblstudent;
}