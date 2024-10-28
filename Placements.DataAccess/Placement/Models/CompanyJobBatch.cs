using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class CompanyJobBatch
{
    public long Id { get; set; }

    public long? JobPostingId { get; set; }

    public long? BatchId { get; set; }

    public virtual Batch? Batch { get; set; }

    public virtual Jobposting? JobPosting { get; set; }
}
