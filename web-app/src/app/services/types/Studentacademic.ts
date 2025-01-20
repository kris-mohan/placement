import { Course } from './Course';
import { Stream } from './Stream';
import { StudentSemesterMark } from './StudentSemesterMark';
import { Tblstudent } from './Tblstudent';

export type PatchStudentAcademic = Studentacademic | {};

export type Studentacademic = {
  Id: number;
  StudentId: number;
  CourseId: number;
  StreamId: number;
  Cgpa: number;
  TenthMarks: number;
  TwelthMarks: number;
  TenthBoard: string;
  TwelthBoard: string;
  TenthPassedOutYear: number;
  TwelthPassedOutYear: number;
  TenthSchoolName: string;
  TwelthSchoolName: string;
  DiplomaCollegeName: string;
  LinkedinLink: string;
  Achievements: string;
  Projects: string;
  Internship: string;
  TenthStatus: number | null;
  TwelfthStatus: number | null;
  CourseStatus: number | null;
  Course: Course;
  Stream: Stream;
  Student: Tblstudent;
  StudentSemesterMarks: StudentSemesterMark[];
};

export type PostStudentacademic = {
  Id: number;
  StudentId: number;
  CourseId: number;
  StreamId: number;
  Cgpa: number;
  TenthMarks: number;
  TwelthMarks: number;
  TenthBoard: string;
  TwelthBoard: string;
  TenthPassedOutYear: number;
  TwelthPassedOutYear: number;
  TenthSchoolName: string;
  TwelthSchoolName: string;
  DiplomaCollegeName: string;
  TenthStatus: string;
  TwelfthStatus: string;
  CourseStatus: string;
  Course?: { Id?: number; FullForm?: string };
  Stream?: { Id?: number; Name?: string };
  Student: Tblstudent;
  StudentSemesterMarks: StudentSemesterMark[];
};
