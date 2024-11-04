using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class SkillType
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<Skill> Skills { get; set; } = new List<Skill>();
}
