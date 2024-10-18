import { Trainingcourse } from "./Trainingcourse";

export type Trainingmodule = {
    Id: number;
    Name?: string;
    TrainingCourseId?: number;
    TrainingMode?: string;
    TrainingAssetFolder?: string;
    IsDeleted: boolean;
    TrainingCourse?: Trainingcourse[];
};