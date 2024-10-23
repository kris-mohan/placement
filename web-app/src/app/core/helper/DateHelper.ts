import { format } from "date-fns/format";

export const GetDateInYYYYMMDD = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};
