using System;
using System.Collections.Generic;

namespace Placements.DataAccess.placement.Models;

public partial class Trainingcourse
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public DateTime? ValidFrom { get; set; }

    public DateTime? ValidTill { get; set; }

    public ulong IsDeleted { get; set; }

    public virtual ICollection<Trainerschedule> Trainerschedules { get; set; } = new List<Trainerschedule>();

    public virtual ICollection<Trainingmodule> Trainingmodules { get; set; } = new List<Trainingmodule>();
}
