import { Login } from "./Login";

export type Userrole = {
    Id: number;
    Name?: string;
    Logins: Login[];
};
