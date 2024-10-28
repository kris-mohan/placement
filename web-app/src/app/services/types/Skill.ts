import { JobpostingSkill } from "./JobpostingSkill";
import { SkillType } from "./SkillType";
import { StudentSkill } from "./StudentSkill";

export type Skill = {
  Id: number;
  Name?: string;
  SkillTypeId?: number;
  SkillType?: SkillType;
  JobpostingSkills?: JobpostingSkill[];
  StudentSkills?: StudentSkill[];
};
