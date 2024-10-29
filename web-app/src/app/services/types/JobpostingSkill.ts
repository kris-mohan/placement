import { Jobposting } from "./Jobposting";
import { Skill } from "./Skill";

export type JobpostingSkill = {
  Id: number;
  SkillId?: number;
  JobPostingId?: number;
  JobPosting?: Jobposting;
  Skill?: Skill;
};
