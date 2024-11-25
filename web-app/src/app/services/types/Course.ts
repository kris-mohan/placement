import { CompanyJobCourse } from "./CompanyJobCourse";
import { Studentacademic } from "./Studentacademic";

export type Course = {
  Id: number;
  Name: string;
  FullForm?: string;
  Studentacademics: Studentacademic[];
  CompanyJobCourses: CompanyJobCourse[];
};
