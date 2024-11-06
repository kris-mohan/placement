import { Studentacademic } from "./Studentacademic";

export type Stream = {
  Id: number;
  Name: string | undefined;
  Studentacademics: Studentacademic[];
};
