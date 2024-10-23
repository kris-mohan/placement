using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class SkillType
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<StudentSkill> StudentSkills { get; set; } = new List<StudentSkill>();
}
