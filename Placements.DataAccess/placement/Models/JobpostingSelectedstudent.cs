using System;
using System.Collections.Generic;

namespace Placements.DataAccess.placement.Models;

public partial class JobpostingSelectedstudent
{
    public long Id { get; set; }

    public long? JobPostingId { get; set; }

    public long? StudentId { get; set; }

    public ulong? HasAcceptedOffer { get; set; }

    public virtual Jobposting? JobPosting { get; set; }

    public virtual Tblstudent? Student { get; set; }
}
