using System;
using System.Collections.Generic;

namespace Placements.WebApi.Placement.Models;

public partial class SkillType
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<Skill> Skills { get; set; } = new List<Skill>();
}
