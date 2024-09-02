export type Companytechonology = {
  CompanyId: number;
  TechnologyId: number;
};

export type CompanyTechnologies = {
  Id: number;
  Companytechonologies: Companytechonology[];
};

export interface CompanyTechnologiesUI {
  Id: number;
  CompanyName: string;
  TechnologyNames: [];
}
