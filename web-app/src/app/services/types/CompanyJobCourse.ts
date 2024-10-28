import { Course } from "./Course";
import { Jobposting } from "./Jobposting";

export type CompanyJobCourse = {
  Id: number;
  JobPostingId?: number;
  CourseId?: number;
  Course?: Course;
  JobPosting?: Jobposting;
};
