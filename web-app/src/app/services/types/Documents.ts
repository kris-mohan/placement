import { DateTime } from "luxon";

export type Documents = {
  Id: number;
  FileName: string;
  FilePath: string;
  FileType: string;
  ParentType: string;
  ParentId: number;
  IsDeleted: boolean;
  CreatedDate: DateTime;
};
