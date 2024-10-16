using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class Trainer
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Password { get; set; }

    public ulong IsDeleted { get; set; }

    public virtual ICollection<Trainerschedule> Trainerschedules { get; set; } = new List<Trainerschedule>();
}
