using System;
using System.Collections.Generic;

namespace Placements.DataAccess.placement.Models;

public partial class Collegejobposting
{
    public long Id { get; set; }

    public long? JobPostingId { get; set; }

    public long? CollegeId { get; set; }

    public virtual Campusregistration? College { get; set; }

    public virtual Jobposting? JobPosting { get; set; }
}
