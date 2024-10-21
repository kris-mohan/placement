using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class Jobinterviewpanel
{
    public long Id { get; set; }

    public long? JobPostingId { get; set; }

    public string? PanelName { get; set; }

    public string? Description { get; set; }

    public string? Designation { get; set; }

    public long? JobInterviewRoundId { get; set; }

    public virtual Jobinterviewround? JobInterviewRound { get; set; }

    public virtual Jobposting? JobPosting { get; set; }
}
