import { Studentacademic } from "./Studentacademic";

export type StudentSemesterMark = {
  Id: number;
  StudentAcademicId?: number;
  Semester?: number;
  Sgpa?: number;
  Status?: string;
  MarkaPercentage: number;
  ClosedBacklogs: number;
  LiveBacklogs: number;
  StudentAcademic?: Studentacademic;
};
