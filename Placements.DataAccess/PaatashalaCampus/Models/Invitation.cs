using System;
using System.Collections.Generic;

namespace Placements.DataAccess.PaatashalaCampus.Models;

public partial class Invitation
{
    public long Id { get; set; }

    public long? InvitationTemplateId { get; set; }

    public string? Recipients { get; set; }

    public string? Cc { get; set; }

    public string? Bcc { get; set; }

    public string? From { get; set; }

    public ulong? IsAccepted { get; set; }
}
