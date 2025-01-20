import { DateTime } from "luxon";
import { TrainingFeedbackQuestions } from "./TrainingFeedbackQuestions";
import { Tblstudent } from "./Tblstudent";
import { Trainerschedule } from "src/app/features/training-configuration/training-configuration/schedules/schedules-module";

export type TrainingFeedbackResponse = {
    Id: number;
    TrainingId: number;
    StudentId: number;
    FeedBackQueId: number;
    Response: string;
    Rating: number;
    CreatedDate: DateTime;
    CreatedBy: number;
    ModifiedDate: DateTime;
    ModifiedBy: number;
    IsDeleted: boolean;
    FeedBackQue: TrainingFeedbackQuestions;
    Student: Tblstudent;
    Training: Trainerschedule
};
