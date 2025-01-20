using System;
using System.Collections.Generic;

namespace Placements.WebApi.Placement.Models;

public partial class StudentSkill
{
    public long Id { get; set; }

    public long? StudentId { get; set; }

    public long? SkillId { get; set; }

    public virtual Skill? Skill { get; set; }

    public virtual Tblstudent? Student { get; set; }
}
