using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class Groupmember
{
    public long Id { get; set; }

    public long? GroupId { get; set; }

    public long? UserId { get; set; }

    public DateTime? JoinedDate { get; set; }

    public string? Role { get; set; }

    public virtual Group? Group { get; set; }

    public virtual Login? User { get; set; }
}
