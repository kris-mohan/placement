import { Batch } from './Batch';
import { Course } from './Course';
import { Stream } from './Stream';
import { StudentSemesterMark } from './StudentSemesterMark';
import { Tblstudent } from './Tblstudent';

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
  Course: Course;
  Stream: Stream;
  Batch: Batch;
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
  Course?: { Id?: number; FullForm?: string };
  Stream?: { Id?: number; Name?: string };
  Student: Tblstudent;
  StudentSemesterMarks: StudentSemesterMark[];
};
