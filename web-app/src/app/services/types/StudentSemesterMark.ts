import { Studentacademic } from "./Studentacademic";

export type StudentSemesterMark = {
  Id: number;
  StudentAcademicId?: number;
  Semester?: number;
  Sgpa?: number;
  Status?: string;
  StudentAcademic?: Studentacademic;
};
