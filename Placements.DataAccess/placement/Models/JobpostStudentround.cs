using System;
using System.Collections.Generic;

namespace Placements.DataAccess.placement.Models;

public partial class JobpostStudentround
{
    public long Id { get; set; }

    public long? StudentId { get; set; }

    public long? JobPostingRoundId { get; set; }

    public string? Feedback { get; set; }

    public ulong? HasPassed { get; set; }

    public int? Score { get; set; }

    public DateTime? RoundDate { get; set; }

    public string? Col { get; set; }

    public virtual Jobinterviewround? JobPostingRound { get; set; }

    public virtual Tblstudent? Student { get; set; }
}
