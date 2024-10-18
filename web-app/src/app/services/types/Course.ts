import { Studentacademic } from "./Studentacademic";

export type Course= {
    Id: number;
    name?: string;
    FullForm?: string;
    Studentacademics: Studentacademic[];
}