using System;
using System.Collections.Generic;

namespace Placements.WebApi.Placement.Models;

public partial class Stream
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<CompanyJobStream> CompanyJobStreams { get; set; } = new List<CompanyJobStream>();

    public virtual ICollection<Studentacademic> Studentacademics { get; set; } = new List<Studentacademic>();
}
