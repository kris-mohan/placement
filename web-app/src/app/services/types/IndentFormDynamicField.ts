import { IndentForm } from "./IndentForm";

export type IndentFormDynamicField = {
    Id: number;
    IndentFormId?: number;
    Name?: string;
    Value?: string;
    IndentForm: IndentForm[];
}