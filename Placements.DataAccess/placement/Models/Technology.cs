using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class Technology
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public ulong IsDeleted { get; set; }

    public virtual ICollection<Companytechnology> Companytechnologies { get; set; } = new List<Companytechnology>();

    public virtual ICollection<Jobposting> Jobpostings { get; set; } = new List<Jobposting>();

    public virtual ICollection<Jobposting> JobpostingsNavigation { get; set; } = new List<Jobposting>();
}
