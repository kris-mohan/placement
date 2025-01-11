using System;
using System.Collections.Generic;

namespace Placements.WebApi.Placement.Models;

public partial class CompanyJobStream
{
    public long Id { get; set; }

    public long? StreamId { get; set; }

    public long? JobPostingId { get; set; }

    public virtual Jobposting? JobPosting { get; set; }

    public virtual Stream? Stream { get; set; }
}
