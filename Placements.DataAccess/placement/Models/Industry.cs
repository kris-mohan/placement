using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class Industry
{
    public long Id { get; set; }

    public string? Type { get; set; }

    public string? Description { get; set; }

    public ulong IsDeleted { get; set; }

    public virtual ICollection<Companyindustry> Companyindustries { get; set; } = new List<Companyindustry>();
}
