import { format } from "date-fns";

export const GetDateInYYYYMMDD = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};

export const GetDateForLabel = (date: Date): string => {
  return format(date, "yyyy-MMM-dd");
};

export const GetDate = (date: Date): string => {
  return format(date, "dd-MM-yyyy");
};

export const GetDateDDMMYYYY = (date:Date):string =>{
    return format(date, "yyyy-MMM-dd");
}