export type Companyregistration = {
    Id: number;
    CompanyName?: string;
    Email?: string;
    ContactPerson?: string;
    Location?: string;
    PhoneNumber?: string;
    IsActive: boolean;
    IsDeleted: boolean;
    UserType?: boolean;
    Password?: string;
    DateOfRegistration: Date;
}