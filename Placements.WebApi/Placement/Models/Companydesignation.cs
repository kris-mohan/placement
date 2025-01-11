using System;
using System.Collections.Generic;

namespace Placements.WebApi.Placement.Models;

public partial class Companydesignation
{
    public long Id { get; set; }

    public long? CompanyId { get; set; }

    public string? Name { get; set; }

    public virtual Companydatum? Company { get; set; }
}
