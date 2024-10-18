import { Trainer } from "./Trainer";
import { Trainingcourse } from "./Trainingcourse";

export type Trainerschedule = {
    Id: number;
    CompanyId?: number;
    SchoolId?: number;
    CourseId?: number;
    StartDate?: Date;
    EndDate?: Date;
    TrainerId?: number;
    ScheduleType?: string;
    StudentId?: number;
    IsDeleted: boolean;
    Course: Trainingcourse[];
    Trainer: Trainer[];
};
