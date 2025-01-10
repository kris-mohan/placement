using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class Email
{
    public long Id { get; set; }

    public string? To { get; set; }

    public string? Cc { get; set; }

    public string? Bcc { get; set; }

    public string? Subject { get; set; }

    public bool? IsSent { get; set; }

    public string? Body { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? SentAt { get; set; }

    public bool? HasAttachment { get; set; }

    public long? DocumentId { get; set; }

    public virtual Document? Document { get; set; }
}
