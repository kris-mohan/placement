using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class Stream
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<Studentacademic> Studentacademics { get; set; } = new List<Studentacademic>();
}
