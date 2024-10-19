import { Trainerschedule } from "./Trainerschedule";

export type Trainer = {
  Id: number;
  Name?: string;
  Email?: string;
  PhoneNumber?: string;
  Password?: string;
  IsDeleted: boolean;
  TrainerType?: string;
  CompanyName?: string;
  Trainerschedules: Trainerschedule[];
};
