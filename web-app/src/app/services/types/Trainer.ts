import { Trainerschedule } from "./Trainerschedule";

export type Trainer = {
    Id: number;
    Name?: string;
    Email?: string;
    PhoneNumber?: string;
    Password?: string;
    IsDeleted: boolean;
    Trainerschedules: Trainerschedule[];
};
