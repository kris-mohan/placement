using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class JobpostStudentround
{
    public long Id { get; set; }

    public long? StudentId { get; set; }

    public long? JobPostingRoundId { get; set; }

    public string? Feedback { get; set; }

    public ulong? HasPassed { get; set; }

    public int? Score { get; set; }

    public long? EventId { get; set; }

    public virtual Calendarevent? Event { get; set; }

    public virtual Jobinterviewround? JobPostingRound { get; set; }

    public virtual Tblstudent? Student { get; set; }
}
