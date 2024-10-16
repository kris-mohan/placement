using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class Companyindustry
{
    public long Id { get; set; }

    public long? CompanyId { get; set; }

    public long? IndustryId { get; set; }

    public ulong IsDeleted { get; set; }

    public virtual Companydatum? Company { get; set; }

    public virtual Industry? Industry { get; set; }
}
