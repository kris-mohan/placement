import { Campusregistration } from "./Campusregistration";

export type University = {
  Id: number;
  Name?: string;
  Campusregistrations: Campusregistration[];
};
