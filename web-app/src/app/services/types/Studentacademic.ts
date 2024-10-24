import { Course } from "./Course";
import { Stream } from "./Stream";
import { Tblstudent } from "./Tblstudent";

export type Studentacademic = {
    Id: number;
    StudentId?: number;
    CourseId?: number;
    StreamId?: number;
    Cgpa?: number;
    Course?: Course;
    Stream?: Stream;
    Student?: Tblstudent;
};
