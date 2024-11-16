using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class Calendarevent
{
    public long Id { get; set; }

    public DateTime? EventStartDateTime { get; set; }

    public DateTime? EventEndDateTime { get; set; }

    public string? EventType { get; set; }

    public string? EventDescription { get; set; }

    public long? OrgId { get; set; }

    public long? CompanyId { get; set; }

    public ulong IsDeleted { get; set; }

    public virtual Companydatum? Company { get; set; }

    public virtual ICollection<Jobinterviewround> Jobinterviewrounds { get; set; } = new List<Jobinterviewround>();

    public virtual Campusregistration? Org { get; set; }
}
