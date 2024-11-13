import { Course } from './Course';
import { Stream } from './Stream';
import { StudentSemesterMark } from './StudentSemesterMark';
import { Tblstudent } from './Tblstudent';

export type Studentacademic = {
  length: number;
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
  Course: Course;
  Stream: Stream;
  Batch: Stream;
  Student: Tblstudent;
  StudentSemesterMarks: StudentSemesterMark[];
};

export type PostStudentacademic = {
  length: number;
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
  Course?: { Id?: number; FullForm?: string };
  Stream?: { Id?: number; Name?: string };
  Student: Tblstudent;
  StudentSemesterMarks: StudentSemesterMark[];
};
