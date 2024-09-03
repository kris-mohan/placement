export type Companytechonology = {
  Id: number;
  CompanyId: number;
  TechnologyId: number;
};

export type CompanyTechnologies = {
  Id: number;
  Companytechonologies: Companytechonology[];
};

export type CompanyTechnologiesUI = {
  Id: number;
  CompanyName: string;
  TechnologyNames: [];
  Technologies: string;
};
