using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class Messagestatus
{
    public long Id { get; set; }

    public long? MessageId { get; set; }

    public long? UserId { get; set; }

    public string? Status { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual Message? Message { get; set; }
}
