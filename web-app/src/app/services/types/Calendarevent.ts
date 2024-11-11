import { Jobinterviewround } from "./Jobinterviewround";

export type Calendarevent = {
  Id: number;
  EventStartDateTime: Date;
  EventEndDateTime: Date;
  EventType: string;
  EventDescription: string;
  OrgId: number;
  CompanyId: number;
  IsDeleted: boolean;
  Jobinterviewrounds: Jobinterviewround[];
};

export type PostCalendarevent = Calendarevent | {};

export type PostCalEvent = {
  Id: number;
  EventStartDateTime: Date;
  EventEndDateTime: Date;
  EventType: string;
  EventDescription: string;
  OrgId: number;
  CompanyId: number;
  IsDeleted: boolean;
  Jobinterviewrounds: { eventId?: number };
};
