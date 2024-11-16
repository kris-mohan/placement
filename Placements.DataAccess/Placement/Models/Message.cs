using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class Message
{
    public long Id { get; set; }

    public long? SenderId { get; set; }

    public long? GroupId { get; set; }

    public long? ReceiverId { get; set; }

    public string? MessageText { get; set; }

    public DateTime? CreatedDate { get; set; }

    public bool? IsRead { get; set; }

    public string? MessageType { get; set; }

    public bool? IsDeleted { get; set; }

    public virtual ICollection<Messagestatus> Messagestatuses { get; set; } = new List<Messagestatus>();
}
