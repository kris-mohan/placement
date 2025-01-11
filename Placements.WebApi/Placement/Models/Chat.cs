using System;
using System.Collections.Generic;

namespace Placements.WebApi.Placement.Models;

public partial class Chat
{
    public long Id { get; set; }

    public long? SenderId { get; set; }

    public long? ReceiverId { get; set; }

    public string? IsDeleted { get; set; }

    public virtual Login? Receiver { get; set; }

    public virtual Login? Sender { get; set; }
}
