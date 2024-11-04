import { format } from "date-fns";

export const GetDateInYYYYMMDD = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};
