using System;
using System.Collections.Generic;

namespace Placements.DataAccess.PaatashalaCampus.Models;

public partial class Calendarevent
{
    public long Id { get; set; }

    public DateTime? EventStartDateTime { get; set; }

    public DateTime? EventEndDateTime { get; set; }

    public string? EventType { get; set; }

    public string? EventDescription { get; set; }

    public long? OrgId { get; set; }

    public long? CompanyId { get; set; }

    public bool Isdeleted { get; set; }
}
