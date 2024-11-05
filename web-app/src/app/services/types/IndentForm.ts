import { IndentFormDynamicField } from './IndentFormDynamicField';

export interface IndentForm {
  Id: number;
  CompanyName: string;
  ContactPersonName: string;
  ContactPersonDesignation: string;
  PhoneNumber: string;
  Email: string;
  IndentFormDynamicFields: IndentFormDynamicField[];
  RequiredItem: string | number;
  Quatity: string | number;
  studentsCleared: number;
  studentsRejected: number;
  roundName: string;
}
