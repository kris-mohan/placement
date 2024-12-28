using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class Group
{
    public long Id { get; set; }

    public string? GroupName { get; set; }

    public DateTime? CreatedDate { get; set; }

    public long? CreatedBy { get; set; }

    public bool? IsActive { get; set; }

    public string? GroupDescription { get; set; }

    public virtual Login? CreatedByNavigation { get; set; }

    public virtual ICollection<Groupmember> Groupmembers { get; set; } = new List<Groupmember>();

    public virtual ICollection<Message> Messages { get; set; } = new List<Message>();
}
