

export type GroupMembers = {
  Id: number;
  GroupId: number;
  UserId: number;
  JoinedDate: string;
  Role: string;
  Group: "";
  User: Tblstudent;
};

export type Tblstudent = {
  Id: number;
  CompanyId: number | null;
  UserName: string;
  Password: string;
  DateOfRegistration: string | null;
  CampusId: number | null;
  RoleId: number;
  IsDeleted: number;
  IsActive: number;
  StudentId: number;
  Student: {
    Id: number;
    OrgId: number;
    FirstName: string;
    LastName: string;
    BatchId: number;
    AadharCardNumber: string;
    PermanentAddress: string;
    CurrentAddress: string;
    Email: string;
    PhoneNumber: string;
    FatherName: string;
    FatherPhoneNumber: string;
    DateOfBirth: string;
    RollNo: string;
    BloodGroup: string | null;
    MiddleName: string | null;
    Pannumber: string | null;
    MotherName: string | null;
    MotherPhoneNumber: string | null;
    Gender: string | null;
  };
};
