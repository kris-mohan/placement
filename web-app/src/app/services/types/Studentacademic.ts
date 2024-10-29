import { Course } from "./Course";
import { Stream } from "./Stream";
import { StudentSemesterMark } from "./StudentSemesterMark";
import { Tblstudent } from "./Tblstudent";

export type Studentacademic = {
  length: number;
  Id: number;
  StudentId: number;
  CourseId: number;
  StreamId: number;
  Cgpa: number;
  Course: Course;
  Stream: Stream;
  Student: Tblstudent;
  StudentSemesterMarks: StudentSemesterMark[];
};
