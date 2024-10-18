import { Trainerschedule } from "./Trainerschedule";
import { Trainingmodule } from "./Trainingmodule";

export type Trainingcourse = {
    Id: number;
    Name?: string;
    Description?: string;
    ValidFrom?: Date;
    ValidTill?: Date;
    IsDeleted: boolean;
    Trainerschedules?: Trainerschedule[];
    Trainingmodules?: Trainingmodule[];
};
