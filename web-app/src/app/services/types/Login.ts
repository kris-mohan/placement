import { Campusregistration } from "./Campusregistration";
import { Companydatum } from "./Companydatum";
import { Role } from "./Role";
import { Tblstudent } from "./Tblstudent";
import { Userrole } from "./Userrole";

export type Login = {
    Id: number;
    CompanyId?: number;
    UserName?: string;
    Password?: string;
    DateOfRegistration?: Date;
    CampusId?: number;
    RoleId?: number;
    IsDeleted: boolean;
    UserType?: number;
    IsActive: boolean;
    StudentId?: number;
    Campus?: Campusregistration[];
    Company?: Companydatum[];
    Role?: Role[];
    RoleNavigation?: Userrole[];
    Student?: Tblstudent[];
};
