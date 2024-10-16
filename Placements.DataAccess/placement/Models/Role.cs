using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class Role
{
    public long Id { get; set; }

    public string? RoleName { get; set; }

    public string? Description { get; set; }

    public ulong IsDeleted { get; set; }

    public virtual ICollection<Login> Logins { get; set; } = new List<Login>();
}
