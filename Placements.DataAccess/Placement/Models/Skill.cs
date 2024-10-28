using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class Skill
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<JobpostingSkill> JobpostingSkills { get; set; } = new List<JobpostingSkill>();

    public virtual ICollection<StudentSkill> StudentSkills { get; set; } = new List<StudentSkill>();
}
