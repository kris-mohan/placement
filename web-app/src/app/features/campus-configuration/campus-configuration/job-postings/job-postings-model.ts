export type Jobposting = {
  Id: number;
  OrgId: number;
  CompanyId: number;
  JobRole: string;
  JobDescription: string;
  ValidFrom: Date;
  ValidTill: Date;
  Positions: number;
  QuantityFilled: number;
  IsClosed: number;
  Isdeleted: boolean;
};
