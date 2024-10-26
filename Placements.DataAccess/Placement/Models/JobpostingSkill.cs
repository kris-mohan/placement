using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class JobpostingSkill
{
    public long Id { get; set; }

    public long? SkillId { get; set; }

    public long? JobPostingId { get; set; }

    public virtual Jobposting? JobPosting { get; set; }

    public virtual Skill? Skill { get; set; }
}
