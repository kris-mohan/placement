using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class Companytechonology
{
    public long Id { get; set; }

    public long? CompanyId { get; set; }

    public long? TechnologyId { get; set; }

    public ulong IsDeleted { get; set; }

    public virtual Companydatum? Company { get; set; }

    public virtual Technology? Technology { get; set; }
}
