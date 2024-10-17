import { Tblstudent } from "./Tblstudent";

export type Batch = {
  Id: number;
  Name?: string;
  Tblstudents: Tblstudent[];
};
