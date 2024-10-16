using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class Technology
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public ulong IsDeleted { get; set; }

    public virtual ICollection<Companytechonology> Companytechonologies { get; set; } = new List<Companytechonology>();

    public virtual ICollection<Jobposting> Jobpostings { get; set; } = new List<Jobposting>();
}
