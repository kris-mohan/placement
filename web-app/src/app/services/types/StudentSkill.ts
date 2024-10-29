import { Skill } from "./Skill";
import { Tblstudent } from "./Tblstudent";

export type StudentSkill = {
  Id: number;
  StudentId?: number;
  SkillId?: number;
  Skill?: Skill;
  Student?: Tblstudent;
};
