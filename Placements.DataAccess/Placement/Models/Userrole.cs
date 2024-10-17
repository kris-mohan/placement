using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class Userrole
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<Login> Logins { get; set; } = new List<Login>();
}
