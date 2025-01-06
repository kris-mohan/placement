import { DateTime } from "luxon";

export type notification = {
  Id: number;
  Title: string;
  NotificationContent: string;
  ParentType: string;
  ParentId: number;
  IsRead: number;
  CompanyId: number;
  CampusId: null;
  StudentId: number;
};
