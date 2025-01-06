using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class CampusCompany
{
    public int Id { get; set; }

    public long? CampusId { get; set; }

    public long? CompanyId { get; set; }

    public virtual Campusregistration? Campus { get; set; }

    public virtual Companydatum? Company { get; set; }

    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();
}
