using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class Chat
{
    public long Id { get; set; }

    public long? SenderId { get; set; }

    public long? ReceiverId { get; set; }

    public string? IsDeleted { get; set; }  

    public virtual ICollection<Message> Messages { get; set; } = new List<Message>();

    public virtual Login? Receiver { get; set; }

    public virtual Login? Sender { get; set; }
}
