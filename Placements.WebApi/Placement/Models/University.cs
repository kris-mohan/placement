using System;
using System.Collections.Generic;

namespace Placements.WebApi.Placement.Models;

public partial class University
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<Campusregistration> Campusregistrations { get; set; } = new List<Campusregistration>();
}
