using System;
using System.Collections.Generic;

namespace Placements.WebApi.Placement.Models;

public partial class CampusCompany
{
    public int Id { get; set; }

    public long? CampusId { get; set; }

    public long? CompanyId { get; set; }

    public virtual Campusregistration? Campus { get; set; }

    public virtual Companydatum? Company { get; set; }
}
