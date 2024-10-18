import { IndentFormDynamicField } from "./IndentFormDynamicField";

export type IndentForm = {
    Id: number;
    CompanyName?: string;
    ContactPersonName?: string;
    ContactPersonDesignation?: string;
    Email?: string;
    PhoneNumber?: string;
    CreatedAt?: Date;
    IndentFormDynamicFields: IndentFormDynamicField[];
}