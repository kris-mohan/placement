export type Studentregistration = {
    Id: number;
    Name?: string;
    RollNumber?: string;
    Email?: string;
    PhoneNumber?: string;
    SchoolId?: number;
    Batch?: string;
    Branch?: string;
    IsDeleted: boolean;
    IsActive: boolean;
    UserType?: number;
    Password?: string;
    DateOfRegistration?: Date;
};
