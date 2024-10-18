import { Login } from "./Login";

export type Role = {
    Id: number;
    RoleName?: string;
    Description?: string;
    IsDeleted: boolean;
    Logins: Login[];
};
