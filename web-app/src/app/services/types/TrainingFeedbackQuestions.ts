import { DateTime } from 'luxon';
import { Trainerschedule } from 'src/app/features/training-configuration/training-configuration/schedules/schedules-module';
import { TrainingFeedbackResponse } from './TrainingFeedbackResponse';

export type TrainingFeedbackQuestions = {
  Id: number;
  Question: string;
  ScheduleId: number;
  CreatedDate: DateTime;
  CreatedBy: number;
  ModifiedDate: DateTime;
  ModifiedBy: number;
  IsDeleted: boolean;
  Schedule: Trainerschedule;
  Trainingfeedbackres: TrainingFeedbackResponse[];
};
