import { Collegejobposting } from "./Collegejobposting";
import { Collegejobpostingschedule } from "./Collegejobpostingschedule";
import { Login } from "./Login";
import { Tblstudent } from "./Tblstudent";

export type Campusregistration = {
    Id: number;
    CollegeName?: string;
    CollegeEmail?: string;
    Password?: string;
    PlacementOfficerName?: string;
    Email?: string;
    ContactNumber?: number;
    Address?: string;
    State?: string;
    Country?: string;
    ZipCode?: string;
    DateOfRegistration?: Date;
    IsDeleted: boolean;
    IsActive: boolean;
    UserType?: number;
    Collegejobpostings?: Collegejobposting[];
    Collegejobpostingschedules?: Collegejobpostingschedule[];
    Logins?: Login[];
    Tblstudents?: Tblstudent[];
};
