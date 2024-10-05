using System;
using System.Collections.Generic;

namespace Placements.DataAccess.placement.Models;

public partial class Paatashalaregistration
{
    public long Id { get; set; }

    public long? CompanyId { get; set; }

    public long? OrgId { get; set; }

    public virtual Companydatum? Company { get; set; }
}
