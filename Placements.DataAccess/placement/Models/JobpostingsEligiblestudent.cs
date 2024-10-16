using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class JobpostingsEligiblestudent
{
    public long Id { get; set; }

    public long? StudentId { get; set; }

    public long? JobPostingId { get; set; }

    public virtual Jobposting? JobPosting { get; set; }

    public virtual Tblstudent? Student { get; set; }
}
