using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class StudentSkill
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public int? SkillTypeId { get; set; }

    public long? StudentId { get; set; }

    public virtual SkillType? SkillType { get; set; }

    public virtual Tblstudent? Student { get; set; }
}
